import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Chars, Scene, Words } from "../components";
import { fonts, grounds } from "../theme";

const g = grounds.paper;

// Transition par zoom : le mot "Projets" grossit jusqu'à traverser l'écran
export const ProjectsTitle: React.FC<{ duration: number }> = ({ duration }) => {
    const frame = useCurrentFrame();
    const zoom = interpolate(frame, [duration - 40, duration], [1, 9], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.in(Easing.exp),
    });
    const fade = interpolate(frame, [duration - 12, duration], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
        <Scene ground="paper" duration={duration} padded={false}>
            <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})`, transformOrigin: "36% 46%", opacity: fade }}>
                <Chars text="Projets" delay={2} stagger={3} style={{ position: "absolute", left: 150, top: 200, fontFamily: fonts.display, fontSize: 400, lineHeight: 1, color: g.ink }} />
                <Words text="Le besoin de départ, mes choix techniques, le résultat." delay={22} stagger={2} style={{ position: "absolute", left: 160, top: 700, fontSize: 48, color: g.soft }} />
            </div>
        </Scene>
    );
};
