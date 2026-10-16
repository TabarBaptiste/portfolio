import { continueRender, delayRender, staticFile } from "remotion";

// Polices auto-hébergées du site (public/fonts), chargées avant le rendu de chaque image
const faces = [
    { family: "Space Grotesk", file: "fonts/SpaceGrotesk-Variable.woff2", weight: "300 700" },
    { family: "Cooper BT", file: "fonts/Cooper-Regular.woff2", weight: "400" },
    { family: "OCR-B", file: "fonts/OCRBStd.woff2", weight: "400" },
];

const handle = delayRender("Chargement des polices");

Promise.all(
    faces.map(async ({ family, file, weight }) => {
        const face = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, { weight });
        await face.load();
        document.fonts.add(face);
    }),
)
    .then(() => continueRender(handle))
    .catch((err) => {
        console.error(err);
        continueRender(handle);
    });
