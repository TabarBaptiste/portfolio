import React from "react";
import { useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Typewriter, Words, useMobile } from "../components";
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
    const m = useMobile();
    // En vertical : nom sur trois lignes, chaque lien sous son libellé
    const L = m
        ? { x: 80, qTop: 600, q: 124, sub: 48, subWidth: 920, nameTop: 440, name: ["Baptiste", "TABAR", "LABONNE"], nameSize: 130, linksGap: 80, row: 150, label: 28, value: 34 }
        : { x: 160, qTop: 170, q: 160, sub: 44, subWidth: undefined, nameTop: 220, name: ["Baptiste TABAR LABONNE"], nameSize: 120, linksGap: 70, row: 100, label: 28, value: 48 };

    return (
        <Scene ground="accent" duration={duration} exit={exit} padded={false}>
            <div style={{ position: "absolute", left: L.x, top: L.qTop, transform: `translateY(${-q * 200}px)`, opacity: 1 - q }}>
                <Chars text="Un poste," delay={4} stagger={2} style={{ ...display, fontSize: L.q }} />
                <Chars text="un projet," delay={BEAT} stagger={2} style={{ ...display, fontSize: L.q }} />
                <Chars text="une question ?" delay={2 * BEAT} stagger={2} style={{ ...display, fontSize: L.q, fontStyle: "italic" }} />
                <Words
                    text="Je réponds vite. Disponible dès maintenant, sur site ou en télétravail."
                    delay={BAR}
                    stagger={2}
                    style={{ fontSize: L.sub, width: L.subWidth, color: g.soft, marginTop: 40 }}
                />
            </div>

            <div style={{ position: "absolute", left: L.x, top: L.nameTop }}>
                {L.name.map((line, j) => (
                    <Chars key={line} text={line} delay={SIGNATURE + j * 8} stagger={2} style={{ ...display, fontSize: L.nameSize }} />
                ))}
                <div style={{ marginTop: L.linksGap }}>
                    {links.map(([label, value], i) => (
                        <div key={label} style={{ display: "flex", flexDirection: m ? "column" : "row", alignItems: m ? "flex-start" : "baseline", gap: m ? 10 : 0, height: L.row }}>
                            <Typewriter text={label} delay={linkDelay(i)} speed={1} cursorUntil={0} style={{ width: 260, fontSize: L.label, color: g.soft }} />
                            <Typewriter
                                text={value}
                                delay={linkDelay(i) + 8}
                                speed={0.7}
                                cursorUntil={i < links.length - 1 ? linkDelay(i + 1) + 8 : Infinity}
                                style={{ fontSize: L.value, color: g.ink }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Scene>
    );
};
