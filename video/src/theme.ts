import { Easing, interpolate, spring } from "remotion";
import timeline from "./timeline.json";

// Tokens repris de la charte "Warm Ledger" (.claude/DESIGN.md / tailwind.config.mjs)
export const colors = {
    paper: "#FAF8F3",
    card: "#FFFFFF",
    ink50: "#F6F4EE",
    ink100: "#ECE9E1",
    ink200: "#DAD6CB",
    ink300: "#B5B0A3",
    ink400: "#8B8679",
    ink500: "#55514A",
    ink700: "#35322B",
    ink800: "#23211B",
    ink900: "#1A1813",
    accent50: "#EDF2FB",
    accent100: "#D3DFF5",
    accent200: "#A9C0EA",
    accent300: "#90ADE2",
    accent600: "#254D92",
    accent800: "#142B54",
    night: "#131312",
    nightCard: "#1C1C1A",
    nightBorder: "#2C2B28",
    success: "#22C55E",
};

export const fonts = {
    display: "'Cooper BT', Georgia, serif",
    sans: "'Space Grotesk', system-ui, sans-serif",
    mono: "'OCR-B', ui-monospace, monospace",
};

// Chaque chapitre a son propre fond plein ; l'encre suit le fond
export type Ground = "paper" | "night" | "accent";

export const grounds: Record<Ground, { bg: string; ink: string; soft: string; accent: string }> = {
    paper: { bg: colors.paper, ink: colors.ink900, soft: colors.ink500, accent: colors.accent600 },
    night: { bg: colors.night, ink: colors.ink50, soft: colors.ink300, accent: colors.accent300 },
    accent: { bg: colors.accent600, ink: colors.paper, soft: colors.accent100, accent: colors.paper },
};

// Rythme : tout est calé sur la musique (120 BPM, 60 i/s → 30 images par temps)
export const FPS = timeline.fps;
export const BEAT = (60 / timeline.bpm) * FPS;
export const BAR = BEAT * 4;

// Vitesse de lecture : un texte reste à l'écran le temps de le trouver (0,5 s) puis de le lire
// (20 caractères par seconde), arrondi au temps supérieur pour rester sur la musique.
// Le bloc suivant n'apparaît qu'une fois ce temps écoulé, compté depuis l'apparition du bloc.
const READ_CPS = 20;
const READ_FIND = 0.5;
export const readTime = (...texts: string[]) => {
    const chars = texts.reduce((n, t) => n + t.length, 0);
    return Math.ceil(((READ_FIND + chars / READ_CPS) * FPS) / BEAT) * BEAT;
};

export const easeOut =Easing.bezier(0.22, 1, 0.36, 1);
export const easeInOut = Easing.bezier(0.76, 0, 0.24, 1);

// Progression 0 → 1 démarrant à `delay` et durant `duration` images
export const progress = (frame: number, delay: number, duration = 30, easing = easeOut) =>
    interpolate(frame, [delay, delay + duration], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing,
    });

// Ressort avec un léger dépassement : donne du poids aux entrées
export const pop = (frame: number, delay: number, damping = 16) =>
    spring({ frame: frame - delay, fps: FPS, config: { damping, stiffness: 170, mass: 0.9 } });
