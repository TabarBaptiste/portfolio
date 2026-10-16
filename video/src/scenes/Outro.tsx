import React from "react";
import { useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Typewriter, Words } from "../components";
import { BAR, BEAT, easeInOut, fonts, grounds, progress } from "../theme";

const g = grounds.accent;
const display: React.CSSProperties = { fontFamily: fonts.display, fontSize: 160, lineHeight: 1.05, color: g.ink };
const contacts = [
    ["email", "tabarbaptiste@gmail.com"],
    ["linkedin", "in/baptiste-tabar-labonne"],
    ["github", "TabarBaptiste"],
];

// La question, les contacts tapés au temps, puis la signature finale
export const Outro: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const q = progress(frame, 2 * BAR - 30, 24, easeInOut);
    const c = progress(frame, 3 * BAR - 20, 24, easeInOut);
    const contactStart = 2 * BAR - 4;

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

            <div style={{ position: "absolute", left: 160, top: 300, transform: `translateY(${-c * 200}px)`, opacity: frame < contactStart ? 0 : 1 - c }}>
                {contacts.map(([label, value], i) => (
                    <div key={label} style={{ display: "flex", alignItems: "baseline", height: 150 }}>
                        <Typewriter text={label} delay={contactStart + i * BEAT} speed={1} cursorUntil={0} style={{ width: 300, fontSize: 32, color: g.soft }} />
                        <Typewriter text={value} delay={contactStart + i * BEAT + 8} speed={0.7} cursorUntil={contactStart + (i + 1) * BEAT + 8} style={{ fontSize: 64, color: g.ink }} />
                    </div>
                ))}
            </div>

            <div style={{ position: "absolute", left: 160, top: 360 }}>
                <Chars text="Baptiste TABAR LABONNE" delay={3 * BAR} stagger={2} style={{ ...display, fontSize: 120 }} />
                <Typewriter text="portfolio-tabarlabonne.netlify.app" delay={3 * BAR + BEAT} speed={0.8} style={{ fontSize: 44, color: g.soft, marginTop: 36 }} />
            </div>
        </Scene>
    );
};
