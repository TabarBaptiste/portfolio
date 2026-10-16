import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Words } from "../components";
import { colors, easeOut, fonts, grounds, progress } from "../theme";

const g = grounds.paper;
const TILE = 180;
const GAP = 24;

const rows = [
    ["typescript", "javascript", "php", "react", "nextjs", "angular"],
    ["vue", "nestjs", "symfony", "nodejs", "postgresql", "mysql"],
    ["prisma", "docker", "github", "tailwind", "stripe", "sentry"],
];
const labels: Record<string, string> = { nextjs: "next.js", nodejs: "node.js", vue: "vue.js" };

// Trois rangées de logos qui défilent en sens contraires, à des vitesses différentes
export const Stack: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    return (
        <Scene ground="paper" duration={duration} exit={exit} padded={false}>
            <Chars text="Compétences" delay={4} stagger={2} style={{ position: "absolute", left: 160, top: 90, fontFamily: fonts.display, fontSize: 150, lineHeight: 1.1, color: g.ink }} />
            <Words text="Du front au déploiement, les outils que je pratique au quotidien." delay={20} stagger={2} style={{ position: "absolute", left: 160, top: 280, fontSize: 38, color: g.soft }} />

            {rows.map((row, r) => {
                const dir = r % 2 === 0 ? -1 : 1;
                const speed = [2.4, 1.8, 2.9][r];
                const width = row.length * (TILE + GAP);
                const enter = progress(frame, 8 + r * 8, 50, easeOut);
                const travel = (frame * speed) % width;
                const x = dir < 0 ? -travel : travel - width;
                return (
                    <div
                        key={r}
                        style={{
                            position: "absolute",
                            top: 400 + r * (TILE + GAP),
                            left: 0,
                            display: "flex",
                            gap: GAP,
                            transform: `translateX(${x + (1 - enter) * -dir * 1400}px)`,
                        }}
                    >
                        {[...row, ...row, ...row, ...row].map((icon, i) => (
                            <div
                                key={i}
                                style={{
                                    width: TILE,
                                    height: TILE,
                                    flex: "none",
                                    borderRadius: 16,
                                    backgroundColor: colors.card,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 18,
                                }}
                            >
                                <Img src={staticFile(`icon_svg/${icon}.svg`)} style={{ width: 72, height: 72, objectFit: "contain" }} />
                                <span style={{ fontFamily: fonts.mono, fontSize: 18, color: g.soft }}>{labels[icon] ?? icon}</span>
                            </div>
                        ))}
                    </div>
                );
            })}
        </Scene>
    );
};
