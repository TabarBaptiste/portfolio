import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Chars, Scene, Words, useMobile } from "../components";
import { fonts, grounds, readTime } from "../theme";

const g = grounds.paper;
const SUB = "Le besoin de départ, mes choix techniques, le résultat.";
const ZOOM = 40;
// Le zoom ne part qu'une fois le sous-titre lu
export const projectsEnd = 2 + readTime("Projets", SUB) + ZOOM;

// Transition par zoom : le mot "Projets" grossit jusqu'à traverser l'écran
export const ProjectsTitle: React.FC<{ duration: number }> = ({ duration }) => {
    const frame = useCurrentFrame();
    const m = useMobile();
    const L = m
        ? { x: 80, top: 740, size: 260, subTop: 1080, sub: 54, origin: "34% 51%" }
        : { x: 160, top: 200, size: 400, subTop: 700, sub: 48, origin: "36% 46%" };
    const zoom = interpolate(frame, [duration - ZOOM, duration], [1, 9], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.in(Easing.exp),
    });
    const fade = interpolate(frame, [duration - 12, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <Scene ground="paper" duration={duration} padded={false}>
            <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})`, transformOrigin: L.origin, opacity: fade }}>
                <Chars text="Projets" delay={2} stagger={3} style={{ position: "absolute", left: L.x - 10, top: L.top, fontFamily: fonts.display, fontSize: L.size, lineHeight: 1, color: g.ink }} />
                <Words text={SUB} delay={22} stagger={2} style={{ position: "absolute", left: L.x, top: L.subTop, width: m ? 920 : undefined, fontSize: L.sub, color: g.soft }} />
            </div>
        </Scene>
    );
};
