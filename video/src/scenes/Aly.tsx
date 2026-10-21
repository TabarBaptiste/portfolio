import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Chars, Chip, Dir, Scene, Typewriter, Words, useMobile } from "../components";
import { BEAT, fonts, grounds, pop, readTime } from "../theme";

const g = grounds.paper;
const shots = ["hero", "soins", "massage_tonique", "reserver"];
const tech = ["NestJS", "Next.js", "Prisma", "Stripe Connect", "Vercel"];
const URL = "alydousheure.fr";
const TITLE = "Aly dous’heure";
const DESC = "Réservation en ligne pour une masseuse indépendante : créneaux en temps réel, paiement sécurisé, tableau de bord pour la professionnelle.";
// Les technologies arrivent une fois la description lue
const CHIPS_AT = 4 + readTime(URL, TITLE, DESC);
export const alyEnd = CHIPS_AT + readTime(...tech);
// Bord gauche de la zone d'images en fondu doux plutôt qu'en coupure nette
const EDGE = "linear-gradient(to right, transparent 0, #000 90px)";

// Les captures arrivent du fond en enfilade 3D, puis la caméra glisse le long de la rangée.
// Elles sont espacées de plus que leur largeur : sans intersection, l'ordre de profondeur ne s'inverse jamais.
export const Aly: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const m = useMobile();
    // En vertical : le texte en haut, l'enfilade de captures en dessous sur toute la largeur
    const L = m
        ? { text: { left: 80, top: 230, width: 920 }, url: 34, title: 120, desc: 42, stage: { left: 0, top: 1020, width: 1080, height: 900 }, railTop: 150, card: [820, 512], gap: 900, cam: [140, -2500], mask: undefined }
        : { text: { left: 160, top: 220, width: 720 }, url: 26, title: 116, desc: 34, stage: { left: 900, top: 0, width: 1020, height: 1080 }, railTop: 240, card: [900, 560], gap: 980, cam: [40, -2700], mask: EDGE };
    const cam = interpolate(frame, [0, duration], L.cam, { easing: Easing.bezier(0.33, 0, 0.4, 1) });

    return (
        <Scene ground="paper" duration={duration} exit={exit} padded={false}>
            <div style={{ position: "absolute", ...L.text }}>
                <Typewriter text={URL} delay={10} speed={1} style={{ fontSize: L.url, color: g.accent }} />
                <Chars text={TITLE} delay={6} stagger={2} style={{ fontFamily: fonts.display, fontSize: L.title, lineHeight: 1.1, marginTop: 20 }} />
                <Words
                    text={DESC}
                    delay={22}
                    stagger={2}
                    style={{ fontSize: L.desc, lineHeight: 1.45, color: g.ink, marginTop: 28 }}
                />
                <div style={{ marginTop: 40 }}>
                    {tech.map((t, i) => (
                        <Chip key={t} label={t} delay={CHIPS_AT + i * (BEAT / 2)} ground="paper" />
                    ))}
                </div>
            </div>

            <div style={{ position: "absolute", ...L.stage, overflow: "hidden", perspective: 1400, perspectiveOrigin: "0% 45%", maskImage: L.mask, WebkitMaskImage: L.mask }}>
                <div style={{ position: "absolute", left: 0, top: L.railTop, transformStyle: "preserve-3d", transform: `rotateY(18deg) translateX(${cam}px)` }}>
                    {shots.map((shot, i) => {
                        const s = pop(frame, 4 + i * 7, 20);
                        return (
                            <div
                                key={shot}
                                style={{
                                    position: "absolute",
                                    left: i * L.gap,
                                    top: 0,
                                    width: L.card[0],
                                    height: L.card[1],
                                    borderRadius: 12,
                                    overflow: "hidden",
                                    backgroundColor: "#fff",
                                    // Ombre uniquement sous la capture (étalement négatif), rien sur les côtés
                                    boxShadow: "0 46px 50px -34px rgba(26, 24, 19, 0.4)",
                                    transform: `translateZ(${(1 - s) * -1400}px)`,
                                    opacity: Math.min(1, s * 1.5),
                                }}
                            >
                                <Img src={staticFile(`projects/alydousheure/${shot}.png`)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Scene>
    );
};
