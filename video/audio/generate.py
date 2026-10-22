"""Génère la bande-son de la vidéo (audio/music.mp3), calée sur src/timeline.json.

Tout est synthétisé avec numpy (aucun sample externe, donc aucun droit à gérer) :
grosse caisse, clap, charleston, basse, nappes, arpège, plus des effets placés
sur les transitions (whoosh, impacts, montée) et sur le texte tapé (clics).

    python3 audio/generate.py
"""

import json
import subprocess
import wave
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SR = 44100
RNG = np.random.default_rng(7)

timeline = json.loads((ROOT / "src" / "timeline.json").read_text())
BEAT = 60 / timeline["bpm"]
BAR = 4 * BEAT
FPS = timeline["fps"]
WIPE_FRAMES = 26  # doit correspondre à WIPE dans src/components.tsx

starts, t = {}, 0
for scene in timeline["scenes"]:
    starts[scene["id"]] = t
    t += scene["bars"]
TOTAL_BARS = t
LENGTH = TOTAL_BARS * BAR
N = int(LENGTH * SR)


def bar(n):
    return n * BAR


def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def place(track, sample, at, gain=1.0, pan=0.0):
    """Ajoute un échantillon mono (ou stéréo) dans la piste stéréo à l'instant `at` (s)."""
    i = int(at * SR)
    if i >= N:
        return
    if sample.ndim == 1:
        left, right = np.sqrt(0.5 * (1 - pan)), np.sqrt(0.5 * (1 + pan))
        sample = np.stack([sample * left, sample * right], axis=1) * np.sqrt(2)
    end = min(N, i + len(sample))
    track[i:end] += sample[: end - i] * gain


def spectral(x, response):
    """Filtre à phase nulle dans le domaine fréquentiel : `response(freqs)` donne le gain."""
    X = np.fft.rfft(x, axis=0)
    f = np.fft.rfftfreq(x.shape[0], 1 / SR)
    h = response(f)
    return np.fft.irfft(X * (h[:, None] if x.ndim == 2 else h), n=x.shape[0], axis=0)


def lowpass(x, fc, order=2):
    return spectral(x, lambda f: 1 / np.sqrt(1 + (f / fc) ** (2 * order)))


def highpass(x, fc, order=2):
    return spectral(x, lambda f: 1 / np.sqrt(1 + (fc / np.maximum(f, 1e-3)) ** (2 * order)))


def bandpass(x, lo, hi):
    return highpass(lowpass(x, hi), lo)


def env(n, attack, release_rate):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(attack, 1e-4)) * np.exp(-t * release_rate)


def noise(seconds):
    return RNG.standard_normal(int(seconds * SR))


# ---------- Instruments ----------

def kick():
    t = np.arange(int(0.45 * SR)) / SR
    freq = 46 + 120 * np.exp(-t * 32)
    body = np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-t * 7.5)
    click = highpass(noise(0.45), 2500) * np.exp(-t * 400) * 0.25
    return np.tanh(1.6 * (body + click))


def clap():
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    burst = sum(np.exp(-np.maximum(t - d, 0) * 220) * (t >= d) for d in (0, 0.011, 0.022))
    tail = np.exp(-t * 16) * 0.5
    return bandpass(noise(0.35), 900, 3200) * (burst + tail)


def hat(open_=False):
    length = 0.18 if open_ else 0.07
    return highpass(noise(length), 7000) * env(int(length * SR), 0.001, 14 if open_ else 60)


def tick():
    return bandpass(noise(0.02), 1800, 6000) * env(int(0.02 * SR), 0.0005, 300)


def saw(freq, seconds, harmonics=10):
    t = np.arange(int(seconds * SR)) / SR
    phase = RNG.uniform(0, 2 * np.pi)
    out = np.zeros_like(t)
    for k in range(1, harmonics + 1):
        if freq * k > 9000:
            break
        out += np.sin(2 * np.pi * freq * k * t + phase * k) / k
    return out


def pad_chord(notes, seconds):
    n = int(seconds * SR)
    left, right = np.zeros(n), np.zeros(n)
    for m in notes:
        f = midi(m)
        left += saw(f * 2 ** (-9 / 1200), seconds) + saw(f, seconds) * 0.7
        right += saw(f * 2 ** (9 / 1200), seconds) + saw(f, seconds) * 0.7
    shape = np.minimum(1, np.arange(n) / (0.35 * SR)) * np.minimum(1, (n - np.arange(n)) / (0.5 * SR))
    return np.stack([left * shape, right * shape], axis=1)


def pluck(freq):
    n = int(0.6 * SR)
    t = np.arange(n) / SR
    tone = np.sin(2 * np.pi * freq * t) + 0.35 * np.sin(4 * np.pi * freq * t) + 0.12 * np.sin(6 * np.pi * freq * t)
    return tone * env(n, 0.002, 9)


def bass_note(freq, seconds):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    tone = np.sin(2 * np.pi * freq * t) + 0.3 * np.sin(4 * np.pi * freq * t)
    gate = np.minimum(1, t / 0.004) * np.minimum(1, (seconds - t) / 0.02)
    return np.tanh(1.4 * tone) * gate * (0.75 + 0.25 * np.exp(-t * 8))


def impact():
    n = int(2.2 * SR)
    t = np.arange(n) / SR
    boom = np.sin(2 * np.pi * np.cumsum(32 + 40 * np.exp(-t * 6)) / SR) * np.exp(-t * 2.2)
    crash = lowpass(noise(2.2), 5000) * np.exp(-t * 5) * 0.35
    return np.tanh(1.5 * (boom + crash))


def sweep(seconds, f_from, f_to, shape):
    """Bruit filtré dont la bande se déplace (whoosh, montée), par blocs fenêtrés."""
    n = int(seconds * SR)
    out = np.zeros(n + 2048)
    hop, size = 512, 2048
    window = np.hanning(size)
    src = noise(seconds + 0.1)
    for i in range(0, n, hop):
        x = i / n
        fc = f_from * (f_to / f_from) ** x
        block = src[i : i + size]
        if len(block) < size:
            break
        filtered = bandpass(block * window, fc * 0.6, fc * 1.6)
        out[i : i + size] += filtered * shape(x)
    return out[:n]


def reverb(x, seconds=1.8, mix=0.25):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    ir = lowpass(noise(seconds), 4000) * np.exp(-t * 3.2)
    ir /= np.sqrt(np.sum(ir**2))
    size = 1 << int(np.ceil(np.log2(x.shape[0] + n)))
    wet = np.stack(
        [np.fft.irfft(np.fft.rfft(x[:, c], size) * np.fft.rfft(ir, size), size)[: x.shape[0]] for c in range(2)], axis=1
    )
    return x * (1 - mix) + wet * mix


def delay(x, seconds, feedback=0.35, repeats=3):
    out = x.copy()
    shift = int(seconds * SR)
    for k in range(1, repeats + 1):
        echo = np.zeros_like(x)
        echo[shift * k :] = x[: -shift * k]
        if k % 2:
            echo = echo[:, ::-1]  # ping-pong
        out += lowpass(echo, 3500) * feedback**k
    return out


def normalize(x, peak=1.0):
    m = np.max(np.abs(x))
    return x / m * peak if m > 0 else x


# ---------- Arrangement ----------

chords = [[57, 60, 64, 67], [53, 57, 60, 64], [60, 64, 67, 71], [55, 59, 62, 64]]  # Am7, Fmaj7, Cmaj7, G6
roots = [33, 29, 36, 31]

drop = {starts["aly"] - 1}  # la montée avant le zoom sur les projets (dernière mesure de "Projets")
outro = next(s for s in timeline["scenes"] if s["id"] == "outro")
signature = starts["outro"] + outro["signature"]  # l'écran final (nom et liens), même mesure que src/scenes/Outro.tsx
groove_until = starts["outro"] + outro["bars"] - 1  # la dernière mesure ne garde que la nappe
groove_from = 1  # la grosse caisse entre quand le métier s'affiche


def chord_at(b):
    return b % 4


tracks = {name: np.zeros((N, 2)) for name in ["kick", "clap", "hats", "bass", "pad", "pluck", "fx", "ticks"]}
kick_times = []

for b in range(TOTAL_BARS):
    c = chord_at(b)
    place(tracks["pad"], pad_chord(chords[c], BAR + 0.5), bar(b))
    groove = groove_from <= b < groove_until and b not in drop
    for beat in range(4):
        at = bar(b) + beat * BEAT
        if groove:
            place(tracks["kick"], kick(), at)
            kick_times.append(at)
            if b >= 2:
                place(tracks["hats"], hat(open_=beat % 2 == 1), at + BEAT / 2, gain=0.8, pan=0.25)
                place(tracks["hats"], hat(), at + BEAT / 4, gain=0.35, pan=-0.3)
            if b >= starts["stats"] and beat in (1, 3):
                place(tracks["clap"], clap(), at, pan=0.05)
            if b >= starts["stats"]:
                for half in (0, 1):
                    place(tracks["bass"], bass_note(midi(roots[c] + (12 if half and beat == 3 else 0)), BEAT / 2 - 0.02), at + half * BEAT / 2, gain=0.6 if half == 0 else 1.0)
        if starts["principles"] <= b < groove_until and b not in drop:
            notes = chords[c] + [chords[c][1] + 12]
            for eighth in range(2):
                m = notes[(beat * 2 + eighth + b) % len(notes)] + 12
                place(tracks["pluck"], pluck(midi(m)), at + eighth * BEAT / 2, gain=0.7 + 0.3 * (eighth == 0), pan=0.3 * np.sin(b + beat))

# Impacts : le métier, le retour après le zoom, la signature finale
for b in (groove_from, starts["aly"], signature):
    place(tracks["fx"], impact(), bar(b), gain=1.0)

# Montée sur la dernière mesure de "Projets", coupée net à l'impact
rise = sweep(BAR, 250, 7000, lambda x: x**2)
place(tracks["fx"], rise, bar(starts["aly"] - 1), gain=0.9)

# Whoosh sur chaque volet de transition (il culmine sur la coupe)
for scene in timeline["scenes"]:
    enter = scene.get("enter")
    if not enter or enter == "zoom":
        continue
    cut = bar(starts[scene["id"]])
    length = WIPE_FRAMES / FPS + 0.35
    w = sweep(length, 500, 4500, lambda x: np.sin(np.pi * min(1, x * 1.25)) ** 2)
    pan = {"left": 0.5, "right": -0.5}.get(enter, 0.0)
    place(tracks["fx"], w, cut - WIPE_FRAMES / FPS - 0.05, gain=0.9, pan=pan)

# Clics de machine à écrire sur les liens de l'écran final (mêmes instants que src/scenes/Outro.tsx)
links = ["tabarbaptiste@gmail.com", "in/baptiste-tabar-labonne", "TabarBaptiste", "portfolio-tabarlabonne.netlify.app"]
for i, value in enumerate(links):
    for k in range(len(value)):
        at = bar(signature) + BEAT + i * BEAT + (8 + k * 0.7) / FPS
        place(tracks["ticks"], tick(), at, gain=RNG.uniform(0.5, 0.9), pan=RNG.uniform(-0.2, 0.2))

# Sidechain : nappes, basse et arpège s'effacent à chaque coup de grosse caisse
t = np.arange(N) / SR
duck = np.ones(N)
release = 1 - 0.6 * np.exp(-np.arange(int(0.6 * SR)) / SR / 0.11)
for k in kick_times:
    i = int(k * SR)
    end = min(N, i + len(release))
    duck[i:end] = np.minimum(duck[i:end], release[: end - i])

pad = lowpass(tracks["pad"], 2200) * duck[:, None]
pluck_t = delay(lowpass(tracks["pluck"], 4500), 3 * BEAT / 4) * duck[:, None]
bass = lowpass(tracks["bass"], 900) * duck[:, None]

mix = (
    normalize(tracks["kick"]) * 0.95
    + normalize(tracks["clap"]) * 0.22
    + normalize(tracks["hats"]) * 0.16
    + normalize(bass) * 0.42
    + normalize(reverb(pad, mix=0.35)) * 0.30
    + normalize(reverb(pluck_t, mix=0.3)) * 0.16
    + normalize(reverb(tracks["fx"], mix=0.3)) * 0.55
    + normalize(tracks["ticks"]) * 0.10
)

# Fondu de sortie et limiteur doux
fade = np.clip((LENGTH - t) / 3, 0, 1)
mix *= fade[:, None]
mix = np.tanh(normalize(mix, 1.15)) / np.tanh(1.15) * 0.89

wav = ROOT / "audio" / "music.wav"
pcm = (np.clip(mix, -1, 1) * 32767).astype("<i2")

with wave.open(str(wav), "wb") as f:
    f.setnchannels(2)
    f.setsampwidth(2)
    f.setframerate(SR)
    f.writeframes(pcm.tobytes())

subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(wav), "-b:a", "192k", str(ROOT / "audio" / "music.mp3")], check=True)
wav.unlink()
print(f"audio/music.mp3 : {LENGTH:.1f} s, {TOTAL_BARS} mesures à {timeline['bpm']} BPM")
