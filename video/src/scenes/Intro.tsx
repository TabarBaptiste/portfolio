import React from "react";
import { useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Slot, Words } from "../components";
import { BAR, BEAT, easeInOut, fonts, grounds, progress } from "../theme";

const g = grounds.night;
const display: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 400, lineHeight: 1 };
const SLOT_START = 2 * BAR + 16;

// Ouverture : le nom, puis le métier qui s'impose, puis toute la chaîne au rythme de la musique
export const Intro: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    // Mesure 2 : le nom remonte et rétrécit pour laisser la place au métier
    const lift = progress(frame, BAR - 6, 36, easeInOut);
    // Fin de mesure 2 : le métier sort par le haut
    const clear = progress(frame, 2 * BAR - 18, 22, easeInOut);

    return (
        <Scene ground="night" duration={duration} exit={exit} padded={false}>
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

            {/* Mesures 3 et 4 : "Je conçois…" complété par un nouveau mot tous les temps et demi */}
            <div style={{ position: "absolute", left: 160, top: 380, color: g.ink, width: 1600 }}>
                <Words text="Je conçois" delay={2 * BAR + 4} style={{ fontSize: 64, color: g.soft }} />
                <Slot
                    items={["des bases de données", "des API REST", "des interfaces", "des pipelines CI/CD."]}
                    times={[SLOT_START, SLOT_START + 1.5 * BEAT, SLOT_START + 3 * BEAT, SLOT_START + 4.5 * BEAT]}
                    style={{ ...display, fontSize: 150, marginTop: 8 }}
                />
            </div>
        </Scene>
    );
};
