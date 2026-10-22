import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Words, useMobile } from "../components";
import { colors, fonts, grounds, pop, readTime } from "../theme";

const g = grounds.night;

const steps = [
    { period: "2021 - 2023", title: "BTS SIO, option SLAM", place: "Lycée Léonard de Vinci" },
    { period: "2022 - 2023", title: "Stages développeur web", place: "Crédit Agricole, RJ Web" },
    { period: "2023 - 2024", title: "Licence Pro Applications Web", place: "Université d'Évry" },
    { period: "2023 - 2026", title: "Alternance Full-Stack", place: "Département du Val-de-Marne" },
    { period: "2024 - 2026", title: "Mastère Architecte Web", place: "Digital School of Paris" },
];

const TITLE = "Parcours";
const SUB = "Du BTS au Mastère, avec trois ans d'alternance.";
const TODAY_TEXT = ["Aujourd’hui", "disponible pour un CDI ou un CDD"];

// La frise se lit d'un seul mouvement : une tête de lecture la parcourt, du sous-titre jusqu'à « Aujourd'hui »,
// sur le temps de lecture de toutes les étapes. Chaque étape s'allume quand la tête l'atteint, la caméra suit sans s'arrêter.
const START = 4 + readTime(TITLE, SUB);
const TODAY_AT = START + readTime(...steps.flatMap((s) => [s.period, s.title, s.place]));
export const journeyEnd = TODAY_AT + readTime(...TODAY_TEXT);

// Avancée de la tête : 0 sur la première étape, 1 sur « Aujourd'hui », avec un léger ralenti à l'arrivée
const headAt = (frame: number) =>
    interpolate(frame, [START, TODAY_AT], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.3, 0, 0.6, 1) });
const litAt = (f: number) => {
    for (let frame = START; frame < TODAY_AT; frame++) if (headAt(frame) >= f) return frame;
    return TODAY_AT;
};
const AT = steps.map((_, i) => litAt(i / steps.length));

// La frise est décrite le long d'un axe : horizontal en 16:9, vertical en 9:16.
// `start`/`step` placent les étapes sur l'axe, `camOffset` est la position écran de la tête une fois que la caméra la suit.
const geometry = {
    desktop: { start: 260, step: 560, lineFrom: 160, line: 600, camOffset: 1000, reach: 1760 },
    mobile: { start: 720, step: 330, lineFrom: 640, line: 120, camOffset: 1150, reach: 1900 },
};
type Geometry = typeof geometry.desktop;
const todayOf = (geo: Geometry) => geo.start + steps.length * geo.step;

// La caméra prend la tête en douceur quand celle-ci atteint sa position écran, puis la suit
const SOFT = 200;
const cameraAt = (frame: number, geo: Geometry) => {
    const x = geo.start + headAt(frame) * (todayOf(geo) - geo.start) - geo.camOffset;
    return x <= -SOFT ? 0 : x >= SOFT ? x : (x + SOFT) ** 2 / (4 * SOFT);
};

export const Journey: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const m = useMobile();
    const geo = m ? geometry.mobile : geometry.desktop;
    const TODAY = todayOf(geo);
    const cam = cameraAt(frame, geo);
    const lineEnd = Math.min(cam + geo.reach, interpolate(frame, [6, 40], [0, geo.reach], { extrapolateRight: "clamp" }) + cam);
    const today = pop(frame, TODAY_AT, 12);

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
            <Chars text={TITLE} delay={4} stagger={2} style={{ position: "absolute", left: m ? 80 : 160, top: m ? 180 : 100, fontFamily: fonts.display, fontSize: m ? 130 : 110, lineHeight: 1.1, color: g.ink }} />
            <Words text={SUB} delay={16} stagger={2} style={{ position: "absolute", left: m ? 80 : 160, top: m ? 340 : 240, width: m ? 920 : undefined, fontSize: m ? 42 : 36, color: g.soft }} />

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
                        const t = AT[i];
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
                        <Words text={TODAY_TEXT[0]} delay={TODAY_AT + 6} style={{ fontFamily: fonts.display, fontSize: text.today, color: g.ink }} />
                        <Words text={TODAY_TEXT[1]} delay={TODAY_AT + 16} style={{ fontFamily: fonts.mono, fontSize: text.available, color: colors.success, marginTop: 8 }} />
                    </div>
                </div>
            </div>
        </Scene>
    );
};
