import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Words, useMobile } from "../components";
import { colors, fonts, grounds, pop } from "../theme";

const g = grounds.night;

const steps = [
    { period: "2021 - 2023", title: "BTS SIO, option SLAM", place: "Lycée Léonard de Vinci, Melun" },
    { period: "2022", title: "Stage développeur web", place: "Crédit Agricole" },
    { period: "2023", title: "Stage développeur web", place: "RJ Web" },
    { period: "2023 - 2024", title: "Licence Pro Applications Web", place: "Université d'Évry, Paris-Saclay" },
    { period: "2023 - 2026", title: "Alternance Full-Stack", place: "Conseil Départemental du Val-de-Marne" },
    { period: "2024 - 2026", title: "Mastère Architecte Web", place: "Digital School of Paris" },
];

// La frise est décrite le long d'un axe : horizontal en 16:9, vertical en 9:16.
// `start`/`step` placent les étapes sur l'axe, `edge` est la position écran où une étape s'allume.
const geometry = {
    desktop: { start: 260, step: 560, lineFrom: 160, line: 600, edge: 1500, camOffset: 1000, reach: 1760 },
    mobile: { start: 720, step: 330, lineFrom: 640, line: 120, edge: 1550, camOffset: 1150, reach: 1900 },
};
type Geometry = typeof geometry.desktop;
const todayOf = (geo: Geometry) => geo.start + steps.length * geo.step;

// Travelling le long de la frise : chaque étape apparaît quand la caméra l'atteint
const cameraAt = (frame: number, geo: Geometry) =>
    interpolate(frame, [30, 430], [0, todayOf(geo) - geo.camOffset], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.45, 0, 0.4, 1),
    });

// Première image où la position `a` sur l'axe passe sous la position écran `edge`
const reachedAt = (a: number, geo: Geometry) => {
    for (let f = 0; f < 600; f++) if (a - cameraAt(f, geo) < geo.edge) return f;
    return 600;
};

export const Journey: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const m = useMobile();
    const geo = m ? geometry.mobile : geometry.desktop;
    const TODAY = todayOf(geo);
    const cam = cameraAt(frame, geo);
    const lineEnd = Math.min(cam + geo.reach, interpolate(frame, [6, 40], [0, geo.reach], { extrapolateRight: "clamp" }) + cam);
    const todayAt = reachedAt(TODAY, geo);
    const today = pop(frame, todayAt, 12);

    // Point de l'axe → coordonnées écran (avant le déplacement de caméra)
    const at = (a: number, size: number): React.CSSProperties =>
        m ? { left: geo.line - size / 2, top: a - size / 2, width: size, height: size } : { left: a - size / 2, top: geo.line - size / 2, width: size, height: size };
    const text = m
        ? { period: 32, title: 46, place: 34, today: 96, available: 34 }
        : { period: 28, title: 40, place: 28, today: 80, available: 30 };
    // En vertical, la frise passe sous le titre en fondu au lieu de le recouvrir
    const fade = m ? "linear-gradient(to bottom, transparent 520px, #000 660px)" : undefined;

    return (
        <Scene ground="night" duration={duration} exit={exit} padded={false}>
            <Chars text="Parcours" delay={4} stagger={2} style={{ position: "absolute", left: m ? 80 : 160, top: m ? 180 : 100, fontFamily: fonts.display, fontSize: m ? 130 : 110, lineHeight: 1.1, color: g.ink }} />
            <Words text="Du BTS au Mastère, avec trois ans d'alternance." delay={16} stagger={2} style={{ position: "absolute", left: m ? 80 : 160, top: m ? 340 : 240, width: m ? 920 : undefined, fontSize: m ? 42 : 36, color: g.soft }} />

            <div style={{ position: "absolute", inset: 0, maskImage: fade, WebkitMaskImage: fade }}>
                <div style={{ position: "absolute", left: 0, top: 0, transform: m ? `translateY(${-cam}px)` : `translateX(${-cam}px)` }}>
                    <div
                        style={{
                            position: "absolute",
                            backgroundColor: colors.accent300,
                            borderRadius: 2,
                            ...(m
                                ? { left: geo.line - 2, top: geo.lineFrom, width: 4, height: Math.max(0, lineEnd - geo.lineFrom) }
                                : { left: geo.lineFrom, top: geo.line - 2, height: 4, width: Math.max(0, lineEnd - geo.lineFrom) }),
                        }}
                    />

                    {steps.map((s, i) => {
                        const a = geo.start + i * geo.step;
                        const t = reachedAt(a, geo);
                        const dot = pop(frame, t, 12);
                        const above = i % 2 === 0;
                        const box: React.CSSProperties = m
                            ? { left: geo.line + 70, top: a - 26, width: 820 }
                            : { left: a - 14, top: above ? geo.line - 230 : geo.line + 50, width: 500 };
                        return (
                            <React.Fragment key={s.title + s.period}>
                                <div
                                    style={{
                                        position: "absolute",
                                        ...at(a, 28),
                                        borderRadius: 999,
                                        backgroundColor: g.bg,
                                        border: `4px solid ${colors.accent300}`,
                                        boxSizing: "border-box",
                                        transform: `scale(${dot})`,
                                    }}
                                />
                                <div style={{ position: "absolute", ...box }}>
                                    <Words text={s.period} delay={t + 4} style={{ fontFamily: fonts.mono, fontSize: text.period, color: colors.accent300 }} />
                                    <Words text={s.title} delay={t + 8} stagger={2} style={{ fontSize: text.title, fontWeight: 600, color: g.ink, marginTop: 10, whiteSpace: "nowrap" }} />
                                    <Words text={s.place} delay={t + 14} stagger={2} style={{ fontSize: text.place, color: g.soft, marginTop: 6 }} />
                                </div>
                            </React.Fragment>
                        );
                    })}

                    {/* Aujourd'hui : la seule pastille verte, parce qu'elle dit quelque chose de vrai */}
                    <div style={{ position: "absolute", ...at(TODAY, 44), borderRadius: 999, backgroundColor: colors.success, transform: `scale(${today})` }} />
                    <div style={{ position: "absolute", ...(m ? { left: geo.line + 70, top: TODAY - 48, width: 840 } : { left: TODAY - 22, top: geo.line + 60, width: 820 }) }}>
                        <Words text="Aujourd’hui" delay={todayAt + 6} style={{ fontFamily: fonts.display, fontSize: text.today, color: g.ink }} />
                        <Words text="disponible pour un CDI ou un CDD" delay={todayAt + 16} style={{ fontFamily: fonts.mono, fontSize: text.available, color: colors.success, marginTop: 8 }} />
                    </div>
                </div>
            </div>
        </Scene>
    );
};
