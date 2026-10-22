import React from "react";
import { useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, useMobile } from "../components";
import { fonts, grounds, pop, readTime } from "../theme";

const g = grounds.accent;
const others = [
    { title: "Furious Ducks : Thé Tip Top", text: "Lead dev, jeu-concours à 500 000 codes", tech: "NestJS, Next.js, Redis, K6" },
    { title: "Furious Ducks : Workflow CI/CD", text: "Pipelines Docker sur trois environnements", tech: "Jenkins, GitLab, SonarQube" },
    { title: "Beroli", text: "Appli mobile d'interventions terrain", tech: "Flutter, Firebase" },
    { title: "RjWeb", text: "Plateforme communautaire d'un quartier de Laval", tech: "PHP, MySQL" },
];
const HEADER = "Et aussi";
// Un projet n'arrive qu'une fois le précédent lu
const readOf = (i: number) => readTime(...(i === 0 ? [HEADER] : []), others[i].title, others[i].text, others[i].tech);
const STARTS = others.map((_, i) => 4 + others.slice(0, i).reduce((t, _p, j) => t + readOf(j), 0));
export const othersEnd = STARTS[STARTS.length - 1] + readOf(others.length - 1);

// Chaque projet glisse depuis un côté différent
export const Others: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const m = useMobile();
    // En vertical : un projet par bloc, technologies sous la description
    const L = m
        ? { x: 80, headerTop: 200, top: 340, step: 340, title: 54, text: 36, tech: 30 }
        : { x: 160, headerTop: 110, top: 250, step: 190, title: 64, text: 30, tech: 24 };
    return (
        <Scene ground="accent" duration={duration} exit={exit} padded={false}>
            <Chars text={HEADER} delay={2} stagger={2} style={{ position: "absolute", left: L.x, top: L.headerTop, fontFamily: fonts.display, fontSize: 64, color: g.soft }} />
            {others.map((p, i) => {
                const s = pop(frame, STARTS[i], 20);
                const side = i % 2 === 0 ? -1 : 1;
                return (
                    <div
                        key={p.title}
                        style={{
                            position: "absolute",
                            left: L.x,
                            right: L.x,
                            top: L.top + i * L.step,
                            display: "flex",
                            flexDirection: m ? "column" : "row",
                            justifyContent: "space-between",
                            alignItems: m ? "flex-start" : "flex-end",
                            transform: `translateX(${(1 - s) * side * 700}px)`,
                            opacity: Math.min(1, s * 1.6),
                        }}
                    >
                        <div>
                            <p style={{ margin: 0, fontSize: L.title, fontWeight: 600, color: g.ink, lineHeight: 1.15 }}>{p.title}</p>
                            <p style={{ margin: "6px 0 0", fontSize: L.text, lineHeight: 1.35, color: g.soft }}>{p.text}</p>
                        </div>
                        <p style={{ margin: m ? "14px 0 0" : 0, fontFamily: fonts.mono, fontSize: L.tech, color: g.soft, paddingBottom: 6 }}>{p.tech}</p>
                    </div>
                );
            })}
        </Scene>
    );
};
