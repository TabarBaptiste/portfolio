# Vidéo de présentation

Vidéo de ~56 s (1920×1080, 30 i/s) générée avec [Remotion](https://www.remotion.dev/) : chaque scène est un composant React rendu image par image. Elle reprend la charte « Warm Ledger » du site et réutilise directement `../public` (polices, captures, icônes).

Rendu final : `out/presentation.mp4`

## Commandes

```bash
cd video
npm install
npm run studio   # prévisualisation interactive dans le navigateur
npm run render   # génère out/presentation.mp4
```

## Modifier le contenu

- `src/Presentation.tsx` : ordre et durée des scènes (en images, 30 = 1 s), textes des projets avec captures.
- `src/scenes.tsx` : contenu et mise en page de chaque scène.
- `src/theme.ts` : couleurs, polices, courbe d'animation.
