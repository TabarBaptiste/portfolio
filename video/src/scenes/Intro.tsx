import React from "react";
import { useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Slot, Typewriter, Words } from "../components";
import { BAR, BEAT, colors, easeInOut, fonts, grounds, pop, progress } from "../theme";

const g = grounds.night;
const display: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 400, lineHeight: 1 };

// Ouverture : le nom, puis le métier qui s'impose, puis toute la chaîne au rythme de la musique
export const Intro: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    // Mesure 2 : le nom remonte et rétrécit pour laisser la place au métier
    const lift = progress(frame, BAR - 6, 36, easeInOut);
    // Fin de mesure 3 : le métier sort par le haut
    const clear = progress(frame, 2 * BAR - 18, 22, easeInOut);
    const dot = pop(frame, 8, 12);

    return (
        <Scene ground="night" duration={duration} exit={exit} padded={false}>
            <div
                style={{
                    position: "absolute",
                    left: 160,
                    top: 880,
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    opacity: 1 - lift,
                }}
            >
                <span
                    style={{
                        width: 20,
                        height: 20,
                        borderRadius: 999,
                        backgroundColor: colors.success,
                        transform: `scale(${dot})`,
                    }}
                />
                <Typewriter text="disponible immédiatement" delay={14} speed={1.4} style={{ fontSize: 30, color: g.soft }} />
            </div>

            <div
                style={{
                    position: "absolute",
                    left: 160,
                    top: 300 - lift * 180,
                    transform: `scale(${1 - lift * 0.64})`,
                    transformOrigin: "0 0",
                    color: g.ink,
                }}
            >
                <Chars text="Baptiste" delay={20} stagger={3} style={{ ...display, fontSize: 176 }} />
                <Chars text="TABAR LABONNE" delay={40} stagger={2} style={{ ...display, fontSize: 176 }} />
            </div>

            <div
                style={{
                    position: "absolute",
                    left: 160,
                    top: 360,
                    color: g.accent,
                    transform: `translateY(${-clear * 160}px)`,
                    opacity: 1 - clear,
                }}
            >
                <Chars text="Développeur" delay={BAR + 8} stagger={2} style={{ ...display, fontSize: 210, fontStyle: "italic" }} />
                <Chars text="Full-Stack" delay={BAR + 22} stagger={2} style={{ ...display, fontSize: 210, fontStyle: "italic" }} />
            </div>

            {/* Mesures 3 et 4 : un mot par temps et demi, de la base de données à la production */}
            <div style={{ position: "absolute", left: 160, top: 380, color: g.ink, width: 1600 }}>
                <Words text="Je conçois des applications robustes," delay={2 * BAR + 4} style={{ fontSize: 52, color: g.soft }} />
                <Slot
                    items={["Base de données", "API", "Interface", "Mise en production."]}
                    times={[2 * BAR + 16, 2 * BAR + 16 + 1.5 * BEAT, 2 * BAR + 16 + 3 * BEAT, 2 * BAR + 16 + 4.5 * BEAT]}
                    style={{ ...display, fontSize: 180, marginTop: 24 }}
                />
            </div>
        </Scene>
    );
};
