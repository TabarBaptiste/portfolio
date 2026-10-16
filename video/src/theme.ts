import { Easing, interpolate } from "remotion";

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
    accent600: "#254D92",
    success: "#22C55E",
};

export const fonts = {
    display: "'Cooper BT', Georgia, serif",
    sans: "'Space Grotesk', system-ui, sans-serif",
    mono: "'OCR-B', ui-monospace, monospace",
};

export const FPS = 30;

// Même courbe que les transitions du site (ease-out prononcé)
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

// Progression 0 → 1 démarrant à `delay` et durant `duration` frames
export const progress = (frame: number, delay: number, duration = 24) =>
    interpolate(frame, [delay, delay + duration], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: easeOut,
    });
