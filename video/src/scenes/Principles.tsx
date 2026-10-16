import React from "react";
import { useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Words, useMobile } from "../components";
import { BAR, easeInOut, fonts, grounds, progress } from "../theme";

const g = grounds.accent;

const principles = [
    { title: "Refondre sans tout casser", lines: ["Refondre sans", "tout casser"], text: "Moderniser du code legacy sans interrompre le service des agents qui l'utilisent." },
    { title: "Du code qui se relit dans six mois", lines: ["Du code qui se relit", "dans six mois"], text: "Simple et bien typé, pour que la personne qui passe après moi s'y retrouve." },
    { title: "Livrer, surveiller, corriger", lines: ["Livrer, surveiller,", "corriger"], text: "CI/CD, production suivie avec Sentry, et les bugs corrigés vite." },
    { title: "Full-stack pour de vrai", lines: ["Full-stack", "pour de vrai"], text: "Base de données, API, interface, déploiement : toute la chaîne." },
];

// Un principe par mesure : la liste défile comme un prompteur, la ligne active en pleine encre,
// la précédente et la suivante estompées. Seule exception : la deuxième ligne n'est pas annoncée
// pendant la première, pour que le regard ne saute pas directement dessus à l'arrivée.
// En vertical, chaque principe tient sur deux lignes.
export const Principles: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const m = useMobile();
    const L = m
        ? { x: 80, headerTop: 200, line: 250, anchor: 660, title: 88, textTop: 1380, textWidth: 920, text: 52 }
        : { x: 160, headerTop: 120, line: 140, anchor: 420, title: 96, textTop: 760, textWidth: 1300, text: 48 };
    const active = principles.slice(1).reduce((a, _, i) => a + progress(frame, (i + 1) * BAR - 12, 30, easeInOut), 0);
    const titleStyle: React.CSSProperties = { fontFamily: fonts.display, fontSize: L.title, lineHeight: 1.1, color: g.ink };

    return (
        <Scene ground="accent" duration={duration} exit={exit} padded={false}>
            <Chars text="Comment je travaille" delay={4} stagger={1} style={{ position: "absolute", left: L.x, top: L.headerTop, fontFamily: fonts.display, fontSize: 64, color: g.soft }} />

            <div style={{ position: "absolute", left: L.x, top: L.anchor - active * L.line }}>
                {principles.map((p, i) => {
                    const d = Math.abs(i - active);
                    const opacity = d <= 1 ? 1 - 0.82 * d : Math.max(0, 0.18 * (2 - d));
                    const delay = i === 1 ? BAR - 12 : 10 + i * 8;
                    return (
                        <div key={p.title} style={{ height: L.line, opacity }}>
                            {(m ? p.lines : [p.title]).map((line, j) => (
                                <Chars key={line} text={line} delay={delay + j * 6} stagger={1} style={titleStyle} />
                            ))}
                        </div>
                    );
                })}
            </div>

            {principles.map((p, i) => {
                const leave = i < principles.length - 1 ? progress(frame, (i + 1) * BAR - 12, 18, easeInOut) : 0;
                return (
                    <div
                        key={p.text}
                        style={{ position: "absolute", left: L.x, top: L.textTop, width: L.textWidth, opacity: 1 - leave, transform: `translateY(${-leave * 40}px)` }}
                    >
                        <Words text={p.text} delay={i * BAR + 26} stagger={2} style={{ fontSize: L.text, lineHeight: 1.35, color: g.ink }} />
                    </div>
                );
            })}
        </Scene>
    );
};
