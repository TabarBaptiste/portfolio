import React from "react";
import { useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, useMobile } from "../components";
import { BEAT, fonts, grounds, pop } from "../theme";

const g = grounds.accent;
const others = [
    { title: "Furious Ducks : Thé Tip Top", text: "Lead dev d'un jeu-concours prévu pour 500 000 codes uniques", tech: "NestJS, Next.js, Redis, K6" },
    { title: "Furious Ducks : Workflow CI/CD", text: "Pipelines Docker industrialisés sur trois environnements", tech: "Jenkins, GitLab, Harbor, SonarQube" },
    { title: "Beroli", text: "Application mobile de gestion des interventions terrain", tech: "Flutter, Firebase" },
    { title: "RjWeb", text: "Plateforme communautaire d'un quartier de Laval", tech: "PHP, MySQL" },
];

// Un projet par temps, chacun glisse depuis un côté différent
export const Others: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const m = useMobile();
    // En vertical : un projet par bloc, technologies sous la description
    const L = m
        ? { x: 80, headerTop: 200, top: 340, step: 340, title: 54, text: 36, tech: 30 }
        : { x: 160, headerTop: 110, top: 250, step: 190, title: 64, text: 30, tech: 24 };
    return (
        <Scene ground="accent" duration={duration} exit={exit} padded={false}>
            <Chars text="Et aussi" delay={2} stagger={2} style={{ position: "absolute", left: L.x, top: L.headerTop, fontFamily: fonts.display, fontSize: 64, color: g.soft }} />
            {others.map((p, i) => {
                const s = pop(frame, 12 + i * BEAT, 20);
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
