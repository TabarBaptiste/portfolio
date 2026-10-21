# Vidéo de présentation

Vidéo motion design de 2 min 50 (60 i/s) générée avec [Remotion](https://www.remotion.dev/) : chaque scène est un composant React rendu image par image. Elle reprend la charte « Warm Ledger » du site et réutilise directement `../public` (polices, captures, icônes).

Deux formats sont produits à partir des mêmes scènes, du même texte et de la même musique :

- `Presentation` : 1920×1080 (16:9), pour le site, LinkedIn, YouTube ;
- `PresentationMobile` : 1080×1920 (9:16), pour les Reels, TikTok, Stories et LinkedIn sur mobile. Chaque scène recompose sa mise en page en vertical (`useMobile()` dans `src/components.tsx`).

Tout est calé sur une bande-son à 120 BPM (une mesure = 2 s = 120 images) : les mots arrivent sur les temps, les changements de chapitre tombent sur les mesures.

Le rythme suit aussi la vitesse de lecture (`readTime` dans `src/theme.ts` : 0,5 s pour trouver le texte, puis 20 caractères par seconde, arrondi au temps) : un bloc de texte n'apparaît qu'une fois le précédent lu, et une scène ne se termine qu'une fois son dernier texte lu. Si un texte est rallongé, le rendu s'arrête en indiquant combien de mesures donner à la scène dans `src/timeline.json`.

Rendus finaux : `out/presentation.mp4` et `out/presentation-mobile.mp4`

## Commandes

```bash
cd video
npm install
npm run studio   # prévisualisation interactive dans le navigateur
npm run music    # régénère audio/music.mp3 (Python 3 + numpy, ffmpeg)
npm run render         # génère out/presentation.mp4 (16:9)
npm run render:mobile  # génère out/presentation-mobile.mp4 (9:16)
```

## Modifier le contenu

- `src/timeline.json` : ordre des scènes, durée en mesures, couleur de fond, type de transition, et mesure de la signature finale (`signature`). La musique (`audio/generate.py`) lit le même fichier, donc relancer `npm run music` après un changement de durée.
- `src/scenes/*.tsx` : contenu et animation de chaque scène ; les positions et tailles des deux formats sont définies en tête de chaque scène.
- `src/components.tsx` : briques d'animation (texte lettre par lettre, mots qui défilent, machine à écrire, volets de transition).
- `src/theme.ts` : couleurs, polices, tempo, courbes d'animation.

## Bande-son

`audio/music.mp3` est entièrement synthétisée par `audio/generate.py` (aucun sample, aucun droit à gérer). Pour utiliser une vraie musique libre de droits, remplacer ce fichier par un morceau à 120 BPM, ou changer `bpm` dans `src/timeline.json` pour suivre le tempo du morceau.
