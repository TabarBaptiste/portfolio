import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BEAT, Ground, colors, easeInOut, fonts, grounds, pop, progress } from "./theme";

export type Dir = "up" | "down" | "left" | "right" | "iris" | "zoom";

// Fond plein du chapitre + léger travelling avant (rien n'est jamais figé)
// + recul de la scène pendant que le volet suivant la recouvre
export const Scene: React.FC<{
    ground: Ground;
    duration: number;
    exit?: Dir;
    padded?: boolean;
    children: React.ReactNode;
}> = ({ ground, duration, exit, padded = true, children }) => {
    const frame = useCurrentFrame();
    const g = grounds[ground];
    const push = interpolate(frame, [0, duration], [1, 1.035]);
    const out = exit ? progress(frame, duration - 24, 24, easeInOut) : 0;
    const shift = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] } as Record<string, number[]>;
    const [dx, dy] = exit && shift[exit] ? shift[exit] : [0, 0];
    return (
        <AbsoluteFill style={{ backgroundColor: g.bg, overflow: "hidden" }}>
            <AbsoluteFill
                style={{
                    transform: `translate(${dx * out * 160}px, ${dy * out * 160}px) scale(${push * (1 - out * 0.04)})`,
                    padding: padded ? "120px 160px" : 0,
                    fontFamily: fonts.sans,
                    color: g.ink,
                }}
            >
                {children}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

// Volet de transition à deux couches : une bande de couleur, puis le fond du chapitre suivant.
// Il se termine exactement sur la coupe, la scène suivante prend alors le relais sur le même fond.
export const WIPE = 26;

export const Wipe: React.FC<{ dir: Dir; to: Ground }> = ({ dir, to }) => {
    const frame = useCurrentFrame();
    const lead = to === "accent" ? colors.ink900 : colors.accent600;
    const layer = (color: string, delay: number) => {
        const p = progress(frame, delay, WIPE - 8, easeInOut);
        let style: React.CSSProperties = {};
        if (dir === "iris") {
            style = { clipPath: `circle(${p * 75}% at 50% 55%)` };
        } else {
            const t = (1 - p) * 100;
            const tr = { up: `translateY(${t}%)`, down: `translateY(${-t}%)`, left: `translateX(${t}%)`, right: `translateX(${-t}%)` }[
                dir as "up" | "down" | "left" | "right"
            ];
            style = { transform: tr };
        }
        return <AbsoluteFill style={{ backgroundColor: color, ...style }} />;
    };
    return (
        <AbsoluteFill>
            {layer(lead, 0)}
            {layer(grounds[to].bg, 8)}
        </AbsoluteFill>
    );
};

// Texte révélé lettre par lettre : chaque caractère monte depuis sous sa ligne de base, avec un ressort
export const Chars: React.FC<{
    text: string;
    delay?: number;
    stagger?: number;
    style?: React.CSSProperties;
}> = ({ text, delay = 0, stagger = 2, style }) => {
    const frame = useCurrentFrame();
    // Le masque déborde un peu autour du texte : accents, capitales et jambages ne sont jamais rognés
    return (
        <div style={{ whiteSpace: "nowrap", ...style }}>
            <div style={{ overflow: "hidden", padding: "0.18em 0.06em 0.2em", margin: "-0.18em -0.06em -0.2em" }}>
                {Array.from(text).map((ch, i) => {
                    const s = pop(frame, delay + i * stagger, 18);
                    return (
                        <span
                            key={i}
                            style={{
                                display: "inline-block",
                                // Décalé de toute sa hauteur + une marge : invisible tant qu'il n'est pas entré
                                transform: `translateY(calc(${(1 - s) * 100}% + ${(1 - s) * 0.45}em)) rotate(${(1 - s) * 8}deg)`,
                                transformOrigin: "0% 100%",
                            }}
                        >
                            {ch === " " ? "\u00A0" : ch}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

// Phrase révélée mot par mot (chaque mot dans son propre masque, le texte peut passer à la ligne)
export const Words: React.FC<{
    text: string;
    delay?: number;
    stagger?: number;
    style?: React.CSSProperties;
}> = ({ text, delay = 0, stagger = 3, style }) => {
    const frame = useCurrentFrame();
    return (
        <p style={{ margin: 0, ...style }}>
            {text.split(" ").map((word, i) => {
                const p = progress(frame, delay + i * stagger, 22);
                return (
                    <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", padding: "0.12em 0", margin: "-0.12em 0" }}>
                        <span style={{ display: "inline-block", transform: `translateY(calc(${(1 - p) * 100}% + ${(1 - p) * 0.4}em))` }}>{word}</span>
                        {" "}
                    </span>
                );
            })}
        </p>
    );
};

// Texte tapé en monospace, avec un curseur qui clignote au temps
export const Typewriter: React.FC<{
    text: string;
    delay?: number;
    speed?: number;
    cursorUntil?: number;
    style?: React.CSSProperties;
}> = ({ text, delay = 0, speed = 1.5, cursorUntil = Infinity, style }) => {
    const frame = useCurrentFrame();
    const count = Math.max(0, Math.floor((frame - delay) / speed));
    const typing = count < text.length;
    const cursorOn = frame >= delay && frame < cursorUntil && (typing || Math.floor(frame / (BEAT / 2)) % 2 === 0);
    return (
        <p style={{ fontFamily: fonts.mono, margin: 0, whiteSpace: "pre", ...style }}>
            {text.slice(0, count)}
            <span style={{ opacity: cursorOn ? 1 : 0 }}>▌</span>
        </p>
    );
};

// Mot qui change à chaque temps, comme un compteur mécanique
export const Slot: React.FC<{
    items: string[];
    times: number[];
    style?: React.CSSProperties;
}> = ({ items, times, style }) => {
    const frame = useCurrentFrame();
    return (
        <div style={{ position: "relative", overflow: "hidden", padding: "0.15em 0 0.18em", ...style }}>
            <span style={{ visibility: "hidden" }}>{items.reduce((a, b) => (a.length > b.length ? a : b))}</span>
            {items.map((item, i) => {
                const enter = progress(frame, times[i], 16, easeInOut);
                const leave = i < items.length - 1 ? progress(frame, times[i + 1], 16, easeInOut) : 0;
                return (
                    <span
                        key={item}
                        style={{
                            position: "absolute",
                            left: 0,
                            top: "0.15em",
                            whiteSpace: "nowrap",
                            transform: `translateY(${(1 - enter) * 1.5 - leave * 1.5}em)`,
                        }}
                    >
                        {item}
                    </span>
                );
            })}
        </div>
    );
};

// Étiquette technique qui apparaît avec un petit rebond
export const Chip: React.FC<{ label: string; delay: number; ground: Ground }> = ({ label, delay, ground }) => {
    const s = pop(useCurrentFrame(), delay, 13);
    const filled = { paper: colors.ink100, night: colors.nightBorder, accent: colors.accent800 }[ground];
    return (
        <span
            style={{
                display: "inline-block",
                fontFamily: fonts.mono,
                fontSize: 24,
                padding: "10px 18px",
                borderRadius: 8,
                backgroundColor: filled,
                color: grounds[ground].ink,
                transform: `scale(${0.4 + s * 0.6})`,
                opacity: Math.min(1, s * 2),
                marginRight: 12,
                marginBottom: 12,
            }}
        >
            {label}
        </span>
    );
};
