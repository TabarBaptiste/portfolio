import React from "react";
import { useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Words } from "../components";
import { BAR, easeInOut, fonts, grounds, progress } from "../theme";

const g = grounds.accent;
const LINE = 140;
const ANCHOR = 420;

const principles = [
    { title: "Refondre sans tout casser", text: "Moderniser du code legacy sans interrompre le service des agents qui l'utilisent." },
    { title: "Du code qui se relit dans six mois", text: "Simple et bien typé, pour que la personne qui passe après moi s'y retrouve." },
    { title: "Livrer, surveiller, corriger", text: "CI/CD, production suivie avec Sentry, et les bugs corrigés vite." },
    { title: "Full-stack pour de vrai", text: "Base de données, API, interface, déploiement : toute la chaîne." },
];

// Un principe par mesure : la liste défile comme un prompteur, la ligne active passe en pleine encre
export const Principles: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const active = principles.slice(1).reduce((a, _, i) => a + progress(frame, (i + 1) * BAR - 12, 30, easeInOut), 0);

    return (
        <Scene ground="accent" duration={duration} exit={exit} padded={false}>
            <Chars text="Comment je travaille" delay={4} stagger={1} style={{ position: "absolute", left: 160, top: 120, fontFamily: fonts.display, fontSize: 64, color: g.soft }} />

            <div style={{ position: "absolute", left: 160, top: ANCHOR - active * LINE }}>
                {principles.map((p, i) => {
                    const d = Math.abs(i - active);
                    const opacity = d <= 1 ? 1 - 0.75 * d : Math.max(0, 0.25 * (2 - d));
                    return (
                        <div key={p.title} style={{ height: LINE, opacity }}>
                            <Chars text={p.title} delay={10 + i * 8} stagger={1} style={{ fontFamily: fonts.display, fontSize: 96, lineHeight: 1.1, color: g.ink }} />
                        </div>
                    );
                })}
            </div>

            {principles.map((p, i) => {
                const leave = i < principles.length - 1 ? progress(frame, (i + 1) * BAR - 12, 18, easeInOut) : 0;
                return (
                    <div
                        key={p.text}
                        style={{ position: "absolute", left: 160, top: 760, width: 1300, opacity: 1 - leave, transform: `translateY(${-leave * 40}px)` }}
                    >
                        <Words text={p.text} delay={i * BAR + 26} stagger={2} style={{ fontSize: 48, lineHeight: 1.35, color: g.ink }} />
                    </div>
                );
            })}
        </Scene>
    );
};
