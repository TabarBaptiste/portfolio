import React from "react";
import { useCurrentFrame } from "remotion";
import { Chars, Dir, Scene } from "../components";
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
    return (
        <Scene ground="accent" duration={duration} exit={exit} padded={false}>
            <Chars text="Et aussi" delay={2} stagger={2} style={{ position: "absolute", left: 160, top: 110, fontFamily: fonts.display, fontSize: 64, color: g.soft }} />
            {others.map((p, i) => {
                const s = pop(frame, 12 + i * BEAT, 20);
                const side = i % 2 === 0 ? -1 : 1;
                return (
                    <div
                        key={p.title}
                        style={{
                            position: "absolute",
                            left: 160,
                            right: 160,
                            top: 250 + i * 190,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            transform: `translateX(${(1 - s) * side * 700}px)`,
                            opacity: Math.min(1, s * 1.6),
                        }}
                    >
                        <div>
                            <p style={{ margin: 0, fontSize: 64, fontWeight: 600, color: g.ink, lineHeight: 1.15 }}>{p.title}</p>
                            <p style={{ margin: "6px 0 0", fontSize: 30, color: g.soft }}>{p.text}</p>
                        </div>
                        <p style={{ margin: 0, fontFamily: fonts.mono, fontSize: 24, color: g.soft, paddingBottom: 6 }}>{p.tech}</p>
                    </div>
                );
            })}
        </Scene>
    );
};
