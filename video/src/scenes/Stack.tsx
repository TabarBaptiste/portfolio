import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Words, useMobile } from "../components";
import { colors, easeOut, fonts, grounds, progress, readTime } from "../theme";

const g = grounds.paper;
const TILE = 180;
const GAP = 24;

const rows = [
    ["typescript", "javascript", "php", "react", "nextjs", "angular"],
    ["vue", "nestjs", "symfony", "nodejs", "postgresql", "mysql"],
    ["prisma", "docker", "github", "tailwind", "stripe", "sentry"],
];
// En vertical : quatre rangées plus courtes
const mobileRows = [
    ["typescript", "javascript", "php", "react", "nextjs"],
    ["angular", "vue", "nestjs", "symfony", "nodejs"],
    ["postgresql", "mysql", "prisma", "docker"],
    ["github", "tailwind", "stripe", "sentry"],
];
const TITLE = "Compétences";
const SUB = "Du front au déploiement, les outils que je pratique au quotidien.";
export const stackEnd = 4 + readTime(TITLE, SUB);
const labels: Record<string, string> = { nextjs: "next.js", nodejs: "node.js", vue: "vue.js" };

// Rangées de logos qui défilent en sens contraires, à des vitesses différentes
export const Stack: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const m = useMobile();
    const L = m
        ? { x: 80, titleTop: 200, subTop: 400, sub: 44, rowsTop: 640, rows: mobileRows, tile: 230, icon: 92, label: 22 }
        : { x: 160, titleTop: 90, subTop: 280, sub: 38, rowsTop: 400, rows, tile: TILE, icon: 72, label: 18 };
    return (
        <Scene ground="paper" duration={duration} exit={exit} padded={false}>
            <Chars text={TITLE} delay={4} stagger={2} style={{ position: "absolute", left: L.x, top: L.titleTop, fontFamily: fonts.display, fontSize: 150, lineHeight: 1.1, color: g.ink }} />
            <Words text={SUB} delay={20} stagger={2} style={{ position: "absolute", left: L.x, top: L.subTop, width: m ? 920 : undefined, fontSize: L.sub, color: g.soft }} />

            {L.rows.map((row, r) => {
                const dir = r % 2 === 0 ? -1 : 1;
                const speed = [2.4, 1.8, 2.9, 2.1][r];
                const width = row.length * (L.tile + GAP);
                const enter = progress(frame, 8 + r * 8, 50, easeOut);
                const travel = (frame * speed) % width;
                const x = dir < 0 ? -travel : travel - width;
                return (
                    <div
                        key={r}
                        style={{
                            position: "absolute",
                            top: L.rowsTop + r * (L.tile + GAP),
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
                                    width: L.tile,
                                    height: L.tile,
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
                                <Img src={staticFile(`icon_svg/${icon}.svg`)} style={{ width: L.icon, height: L.icon, objectFit: "contain" }} />
                                <span style={{ fontFamily: fonts.mono, fontSize: L.label, color: g.soft }}>{labels[icon] ?? icon}</span>
                            </div>
                        ))}
                    </div>
                );
            })}
        </Scene>
    );
};
