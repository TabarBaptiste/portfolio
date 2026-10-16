# Vidéo de présentation

Vidéo motion design de 68 s (1920×1080, 60 i/s) générée avec [Remotion](https://www.remotion.dev/) : chaque scène est un composant React rendu image par image. Elle reprend la charte « Warm Ledger » du site et réutilise directement `../public` (polices, captures, icônes).

Tout est calé sur une bande-son à 120 BPM (une mesure = 2 s = 120 images) : les mots arrivent sur les temps, les changements de chapitre tombent sur les mesures.

Rendu final : `out/presentation.mp4`

## Commandes

```bash
cd video
npm install
npm run studio   # prévisualisation interactive dans le navigateur
npm run music    # régénère audio/music.mp3 (Python 3 + numpy, ffmpeg)
npm run render   # génère out/presentation.mp4
```

## Modifier le contenu

- `src/timeline.json` : ordre des scènes, durée en mesures, couleur de fond, type de transition. La musique (`audio/generate.py`) lit le même fichier, donc relancer `npm run music` après un changement de durée.
- `src/scenes/*.tsx` : contenu et animation de chaque scène.
- `src/components.tsx` : briques d'animation (texte lettre par lettre, mots qui défilent, machine à écrire, volets de transition).
- `src/theme.ts` : couleurs, polices, tempo, courbes d'animation.

## Bande-son

`audio/music.mp3` est entièrement synthétisée par `audio/generate.py` (aucun sample, aucun droit à gérer). Pour utiliser une vraie musique libre de droits, remplacer ce fichier par un morceau à 120 BPM, ou changer `bpm` dans `src/timeline.json` pour suivre le tempo du morceau.
