import React from "react";
import { useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Slot, Words, useMobile } from "../components";
import { BAR, easeInOut, fonts, grounds, progress, readTime } from "../theme";

const g = grounds.night;
const display: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 400, lineHeight: 1 };
const JOB = ["Développeur", "Full-Stack"];
const JOB_AT = BAR + 8;
// Le métier sort une fois lu, puis "Je conçois…" change de fin au rythme de lecture
const CLEAR_AT = JOB_AT + readTime(...JOB);
const PREFIX = "Je conçois";
const SLOT_START = CLEAR_AT + 24;
const SLOT_ITEMS = ["des bases de données", "des API REST", "des interfaces", "des pipelines CI/CD."];
const SLOT_TIMES = SLOT_ITEMS.map((_, i) => SLOT_START + SLOT_ITEMS.slice(0, i).reduce((t, item, j) => t + readTime(j === 0 ? `${PREFIX} ${item}` : item), 0));
export const introEnd = SLOT_TIMES[SLOT_TIMES.length - 1] + readTime(SLOT_ITEMS[SLOT_ITEMS.length - 1]);
// En vertical, chaque mot tient sur deux lignes
const SLOT_ITEMS_MOBILE = ["des bases\nde données", "des API\nREST", "des\ninterfaces", "des pipelines\nCI/CD."];

// Ouverture : le nom, puis le métier qui s'impose, puis toute la chaîne au rythme de la musique
export const Intro: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const m = useMobile();
    // Mesure 2 : le nom remonte et rétrécit pour laisser la place au métier
    const lift = progress(frame, BAR - 6, 36, easeInOut);
    // Le métier sort par le haut
    const clear = progress(frame, CLEAR_AT, 22, easeInOut);

    const L = m
        ? { x: 80, nameTop: 640 - lift * 460, nameSize: 160, nameScale: 0.38, name: ["Baptiste", "TABAR", "LABONNE"], jobTop: 780, jobSize: 150, chainTop: 760, prefix: 68, slot: 130 }
        : { x: 160, nameTop: 300 - lift * 180, nameSize: 176, nameScale: 0.36, name: ["Baptiste", "TABAR LABONNE"], jobTop: 360, jobSize: 210, chainTop: 380, prefix: 64, slot: 150 };

    return (
        <Scene ground="night" duration={duration} exit={exit} padded={false}>
            <div
                style={{
                    position: "absolute",
                    left: L.x,
                    top: L.nameTop,
                    transform: `scale(${1 - lift * (1 - L.nameScale)})`,
                    transformOrigin: "0 0",
                    color: g.ink,
                }}
            >
                {L.name.map((line, i) => (
                    <Chars key={line} text={line} delay={20 + i * 18} stagger={i === 0 ? 3 : 2} style={{ ...display, fontSize: L.nameSize }} />
                ))}
            </div>

            <div
                style={{
                    position: "absolute",
                    left: L.x,
                    top: L.jobTop,
                    color: g.accent,
                    transform: `translateY(${-clear * 160}px)`,
                    opacity: 1 - clear,
                }}
            >
                {JOB.map((word, i) => (
                    <Chars key={word} text={word} delay={JOB_AT + i * 14} stagger={2} style={{ ...display, fontSize: L.jobSize, fontStyle: "italic" }} />
                ))}
            </div>

            {/* "Je conçois…" complété par un nouveau mot, chacun le temps d'être lu */}
            <div style={{ position: "absolute", left: L.x, top: L.chainTop, color: g.ink, width: 1600 }}>
                <Words text={PREFIX} delay={SLOT_START - 12} style={{ fontSize: L.prefix, color: g.soft }} />
                <Slot items={m ? SLOT_ITEMS_MOBILE : SLOT_ITEMS} times={SLOT_TIMES} style={{ ...display, fontSize: L.slot, marginTop: 8 }} />
            </div>
        </Scene>
    );
};
