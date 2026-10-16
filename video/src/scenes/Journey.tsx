import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Words } from "../components";
import { colors, fonts, grounds, pop } from "../theme";

const g = grounds.night;
const STEP = 560;
const LINE_Y = 600;

const steps = [
    { period: "2021 - 2023", title: "BTS SIO, option SLAM", place: "Lycée Léonard de Vinci, Melun" },
    { period: "2022", title: "Stage développeur web", place: "Crédit Agricole" },
    { period: "2023", title: "Stage développeur web", place: "RJ Web" },
    { period: "2023 - 2024", title: "Licence Pro Applications Web", place: "Université d'Évry, Paris-Saclay" },
    { period: "2023 - 2026", title: "Alternance Full-Stack", place: "Conseil Départemental du Val-de-Marne" },
    { period: "2024 - 2026", title: "Mastère Architecte Web", place: "Digital School of Paris" },
];
const TODAY_X = 260 + steps.length * STEP;

// Travelling horizontal le long d'une frise : chaque étape apparaît quand la caméra l'atteint
const cameraAt = (frame: number) =>
    interpolate(frame, [30, 430], [0, TODAY_X - 1000], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.45, 0, 0.4, 1),
    });

// Première image où la position monde `x` passe sous l'abscisse écran `edge`
const reachedAt = (x: number, edge: number) => {
    for (let f = 0; f < 600; f++) if (x - cameraAt(f) < edge) return f;
    return 600;
};

export const Journey: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const cam = cameraAt(frame);
    const lineEnd = Math.min(cam + 1760, interpolate(frame, [6, 40], [0, 1760], { extrapolateRight: "clamp" }) + cam);
    const today = pop(frame, reachedAt(TODAY_X, 1500), 12);

    return (
        <Scene ground="night" duration={duration} exit={exit} padded={false}>
            <Chars text="Parcours" delay={4} stagger={2} style={{ position: "absolute", left: 160, top: 100, fontFamily: fonts.display, fontSize: 110, lineHeight: 1.1, color: g.ink }} />
            <Words text="Du BTS au Mastère, avec trois ans d'alternance." delay={16} stagger={2} style={{ position: "absolute", left: 160, top: 240, fontSize: 36, color: g.soft }} />

            <div style={{ position: "absolute", left: 0, top: 0, transform: `translateX(${-cam}px)` }}>
                <div style={{ position: "absolute", left: 160, top: LINE_Y - 2, height: 4, width: Math.max(0, lineEnd - 160), backgroundColor: colors.accent300, borderRadius: 2 }} />

                {steps.map((s, i) => {
                    const x = 260 + i * STEP;
                    const t = reachedAt(x, 1500);
                    const dot = pop(frame, t, 12);
                    const above = i % 2 === 0;
                    return (
                        <React.Fragment key={s.title + s.period}>
                            <div
                                style={{
                                    position: "absolute",
                                    left: x - 14,
                                    top: LINE_Y - 14,
                                    width: 28,
                                    height: 28,
                                    borderRadius: 999,
                                    backgroundColor: g.bg,
                                    border: `4px solid ${colors.accent300}`,
                                    transform: `scale(${dot})`,
                                }}
                            />
                            <div style={{ position: "absolute", left: x - 14, top: above ? LINE_Y - 230 : LINE_Y + 50, width: 500 }}>
                                <Words text={s.period} delay={t + 4} style={{ fontFamily: fonts.mono, fontSize: 28, color: colors.accent300 }} />
                                <Words text={s.title} delay={t + 8} stagger={2} style={{ fontSize: 40, fontWeight: 600, color: g.ink, marginTop: 10, whiteSpace: "nowrap" }} />
                                <Words text={s.place} delay={t + 14} stagger={2} style={{ fontSize: 28, color: g.soft, marginTop: 6 }} />
                            </div>
                        </React.Fragment>
                    );
                })}

                {/* Aujourd'hui : la seule pastille verte, parce qu'elle dit quelque chose de vrai */}
                <div
                    style={{
                        position: "absolute",
                        left: TODAY_X - 22,
                        top: LINE_Y - 22,
                        width: 44,
                        height: 44,
                        borderRadius: 999,
                        backgroundColor: colors.success,
                        transform: `scale(${today})`,
                    }}
                />
                <div style={{ position: "absolute", left: TODAY_X - 22, top: LINE_Y + 60, width: 820 }}>
                    <Words text="Aujourd’hui" delay={reachedAt(TODAY_X, 1500) + 6} style={{ fontFamily: fonts.display, fontSize: 80, color: g.ink }} />
                    <Words text="disponible pour un CDI ou un CDD" delay={reachedAt(TODAY_X, 1500) + 16} style={{ fontFamily: fonts.mono, fontSize: 30, color: colors.success, marginTop: 8 }} />
                </div>
            </div>
        </Scene>
    );
};
