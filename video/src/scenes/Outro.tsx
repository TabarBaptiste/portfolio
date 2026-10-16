import React from "react";
import { useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Typewriter, Words } from "../components";
import { BAR, BEAT, easeInOut, fonts, grounds, progress } from "../theme";

const g = grounds.accent;
const display: React.CSSProperties = { fontFamily: fonts.display, fontSize: 160, lineHeight: 1.05, color: g.ink };

// Signature finale à la mesure 3 : le nom, puis les liens tapés un par temps
// (audio/generate.py place ses clics de machine à écrire sur ces mêmes instants)
const SIGNATURE = 2 * BAR;
const links = [
    ["email", "tabarbaptiste@gmail.com"],
    ["linkedin", "in/baptiste-tabar-labonne"],
    ["github", "TabarBaptiste"],
    ["portfolio", "portfolio-tabarlabonne.netlify.app"],
];
const linkDelay = (i: number) => SIGNATURE + BEAT + i * BEAT;

// La question, puis un seul écran de fin : le nom et tous les liens
export const Outro: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const q = progress(frame, SIGNATURE - 30, 24, easeInOut);

    return (
        <Scene ground="accent" duration={duration} exit={exit} padded={false}>
            <div style={{ position: "absolute", left: 160, top: 170, transform: `translateY(${-q * 200}px)`, opacity: 1 - q }}>
                <Chars text="Un poste," delay={4} stagger={2} style={display} />
                <Chars text="un projet," delay={BEAT} stagger={2} style={display} />
                <Chars text="une question ?" delay={2 * BEAT} stagger={2} style={{ ...display, fontStyle: "italic" }} />
                <Words
                    text="Je réponds vite. Disponible dès maintenant, sur site ou en télétravail."
                    delay={BAR}
                    stagger={2}
                    style={{ fontSize: 44, color: g.soft, marginTop: 40 }}
                />
            </div>

            <div style={{ position: "absolute", left: 160, top: 220 }}>
                <Chars text="Baptiste TABAR LABONNE" delay={SIGNATURE} stagger={2} style={{ ...display, fontSize: 120 }} />
                <div style={{ marginTop: 70 }}>
                    {links.map(([label, value], i) => (
                        <div key={label} style={{ display: "flex", alignItems: "baseline", height: 100 }}>
                            <Typewriter text={label} delay={linkDelay(i)} speed={1} cursorUntil={0} style={{ width: 260, fontSize: 28, color: g.soft }} />
                            <Typewriter
                                text={value}
                                delay={linkDelay(i) + 8}
                                speed={0.7}
                                cursorUntil={i < links.length - 1 ? linkDelay(i + 1) + 8 : Infinity}
                                style={{ fontSize: 48, color: g.ink }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Scene>
    );
};
