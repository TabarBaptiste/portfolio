import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, fonts, progress } from "./theme";

// Fond papier + sortie de scène (fondu + léger glissement vers le haut)
export const Scene: React.FC<{ duration: number; children: React.ReactNode }> = ({
    duration,
    children,
}) => {
    const frame = useCurrentFrame();
    const out = interpolate(frame, [duration - 14, duration], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    return (
        <AbsoluteFill style={{ backgroundColor: colors.paper }}>
            <AbsoluteFill
                style={{
                    opacity: 1 - out,
                    transform: `translateY(${-16 * out}px)`,
                    padding: "120px 160px",
                    fontFamily: fonts.sans,
                    color: colors.ink800,
                }}
            >
                {children}
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

// Apparition façon `.reveal` du site : translateY 24px → 0, opacité 0 → 1
export const FadeUp: React.FC<{
    delay?: number;
    duration?: number;
    distance?: number;
    style?: React.CSSProperties;
    children: React.ReactNode;
}> = ({ delay = 0, duration = 20, distance = 24, style, children }) => {
    const p = progress(useCurrentFrame(), delay, duration);
    return (
        <div style={{ opacity: p, transform: `translateY(${(1 - p) * distance}px)`, ...style }}>
            {children}
        </div>
    );
};

// Ligne de titre révélée par un masque (le texte monte depuis sous sa ligne de base)
export const MaskLine: React.FC<{
    delay?: number;
    duration?: number;
    style?: React.CSSProperties;
    children: React.ReactNode;
}> = ({ delay = 0, duration = 26, style, children }) => {
    const p = progress(useCurrentFrame(), delay, duration);
    return (
        <div style={{ overflow: "hidden", paddingBottom: "0.12em", ...style }}>
            <div style={{ transform: `translateY(${(1 - p) * 110}%)` }}>{children}</div>
        </div>
    );
};

// Titre de section (Cooper) toujours suivi d'un sous-titre (Space Grotesk), comme sur le site
export const SectionTitle: React.FC<{ title: string; subtitle: string; delay?: number }> = ({
    title,
    subtitle,
    delay = 0,
}) => (
    <div style={{ marginBottom: 64 }}>
        <MaskLine delay={delay}>
            <h2
                style={{
                    fontFamily: fonts.display,
                    fontWeight: 400,
                    fontSize: 88,
                    lineHeight: 1.08,
                    margin: 0,
                    color: colors.ink900,
                }}
            >
                {title}
            </h2>
        </MaskLine>
        <FadeUp delay={delay + 10}>
            <p style={{ fontSize: 30, color: colors.ink500, margin: "16px 0 0" }}>
                {subtitle}
            </p>
        </FadeUp>
    </div>
);

// Liste de technologies en monospace, comme le `.tech-label` du site
export const TechLabel: React.FC<{ items: string[]; style?: React.CSSProperties }> = ({
    items,
    style,
}) => (
    <p
        style={{
            fontFamily: fonts.mono,
            fontSize: 22,
            color: colors.ink500,
            margin: 0,
            lineHeight: 1.6,
            ...style,
        }}
    >
        {items.join("  ·  ")}
    </p>
);

// Filet horizontal qui se dessine de gauche à droite
export const Rule: React.FC<{ delay?: number; width?: number | string; style?: React.CSSProperties }> = ({
    delay = 0,
    width = "100%",
    style,
}) => {
    const p = progress(useCurrentFrame(), delay, 30);
    return (
        <div style={{ width, height: 1, ...style }}>
            <div
                style={{
                    height: 1,
                    backgroundColor: colors.ink200,
                    transform: `scaleX(${p})`,
                    transformOrigin: "left",
                }}
            />
        </div>
    );
};
