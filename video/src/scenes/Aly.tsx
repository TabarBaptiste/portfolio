import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Chars, Chip, Dir, Scene, Typewriter, Words } from "../components";
import { BEAT, fonts, grounds, pop } from "../theme";

const g = grounds.paper;
const shots = ["hero", "soins", "massage_tonique", "reserver"];
const tech = ["NestJS", "Next.js", "Prisma", "Stripe Connect", "Vercel"];
// Bord gauche de la zone d'images en fondu doux plutôt qu'en coupure nette
const EDGE = "linear-gradient(to right, transparent 0, #000 90px)";

// Les captures arrivent du fond en enfilade 3D, puis la caméra glisse le long de la rangée.
// Elles sont espacées de plus que leur largeur : sans intersection, l'ordre de profondeur ne s'inverse jamais.
export const Aly: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const cam = interpolate(frame, [0, duration], [40, -2700], { easing: Easing.bezier(0.33, 0, 0.4, 1) });

    return (
        <Scene ground="paper" duration={duration} exit={exit} padded={false}>
            <div style={{ position: "absolute", left: 160, top: 220, width: 720 }}>
                <Typewriter text="alydousheure.fr" delay={10} speed={1} style={{ fontSize: 26, color: g.accent }} />
                <Chars text="Aly dous’heure" delay={6} stagger={2} style={{ fontFamily: fonts.display, fontSize: 116, lineHeight: 1.1, marginTop: 20 }} />
                <Words
                    text="Réservation en ligne pour une masseuse indépendante : créneaux en temps réel, paiement sécurisé, tableau de bord pour la professionnelle."
                    delay={22}
                    stagger={2}
                    style={{ fontSize: 34, lineHeight: 1.45, color: g.ink, marginTop: 28 }}
                />
                <div style={{ marginTop: 40 }}>
                    {tech.map((t, i) => (
                        <Chip key={t} label={t} delay={2 * BEAT + i * (BEAT / 2)} ground="paper" />
                    ))}
                </div>
            </div>

            <div style={{ position: "absolute", left: 900, top: 0, width: 1020, height: 1080, overflow: "hidden", perspective: 1400, perspectiveOrigin: "0% 45%", maskImage: EDGE, WebkitMaskImage: EDGE }}>
                <div style={{ position: "absolute", left: 0, top: 240, transformStyle: "preserve-3d", transform: `rotateY(18deg) translateX(${cam}px)` }}>
                    {shots.map((shot, i) => {
                        const s = pop(frame, 4 + i * 7, 20);
                        return (
                            <div
                                key={shot}
                                style={{
                                    position: "absolute",
                                    left: i * 980,
                                    top: 0,
                                    width: 900,
                                    height: 560,
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
