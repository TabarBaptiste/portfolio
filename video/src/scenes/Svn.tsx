import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Chars, Chip, Dir, Scene, Typewriter, Words, useMobile } from "../components";
import { BAR, BEAT, fonts, grounds, pop, readTime } from "../theme";

const g = grounds.paper;
const tech = ["PHP", "Bash", "Linux", "Ext JS"];
const LABEL = "en production · val-de-marne";
const TITLE = "Interface de gestion SVN";
const DESC = "Dépôts, branches, tags et sauvegardes gérés depuis le navigateur, sans ligne de commande.";
// Les technologies arrivent une fois la description lue
const CHIPS_AT = 4 + readTime(LABEL, TITLE, DESC);
export const svnEnd = CHIPS_AT + readTime(...tech);

const Card: React.FC<{ src: string; style: React.CSSProperties; imgStyle?: React.CSSProperties }> = ({ src, style, imgStyle }) => (
    <div style={{ position: "absolute", borderRadius: 12, overflow: "hidden", backgroundColor: "#fff", ...style }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left", ...imgStyle }} />
    </div>
);

// Capture principale parcourue en panoramique, puis deux fiches pivotent par-dessus
export const Svn: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const main = pop(frame, 6, 22);
    const pan = interpolate(frame, [0, duration], [0, -18]);
    const flipA = pop(frame, BAR, 17);
    const flipB = pop(frame, BAR + BEAT, 17);
    const settle = interpolate(flipA, [0, 1], [0, 1]);
    const m = useMobile();
    // En vertical : titre sur deux lignes, capture principale pleine largeur, fiches empilées dessous
    const L = m
        ? {
              header: { left: 80, top: 220, width: 920 }, label: 34, title: 104, titleLines: ["Interface de", "gestion SVN"], desc: 42, descWidth: 920,
              main: { left: 80, top: 860, width: 920, height: 483 },
              a: { left: 300, top: 1250, width: 700, height: 394 },
              b: { left: 80, top: 1450, width: 700, height: 394 },
              chips: { left: 80, top: 750 },
          }
        : {
              header: { left: 160, top: 110, width: 1600 }, label: 26, title: 110, titleLines: ["Interface de gestion SVN"], desc: 34, descWidth: 1000,
              main: { left: 160, top: 430, width: 1040, height: 546 },
              a: { left: 1150, top: 380, width: 640, height: 360 },
              b: { left: 1080, top: 620, width: 640, height: 360 },
              chips: { left: 160, top: 1000 },
          };

    return (
        <Scene ground="paper" duration={duration} exit={exit} padded={false}>
            <div style={{ position: "absolute", ...L.header }}>
                <Typewriter text={LABEL} delay={8} speed={1} style={{ fontSize: L.label, color: g.accent }} />
                {L.titleLines.map((line, i) => (
                    <Chars key={line} text={line} delay={4 + i * 10} stagger={1} style={{ fontFamily: fonts.display, fontSize: L.title, lineHeight: 1.1, marginTop: i === 0 ? 16 : 0, color: g.ink }} />
                ))}
                <Words
                    text={DESC}
                    delay={20}
                    stagger={2}
                    style={{ fontSize: L.desc, lineHeight: 1.45, color: g.ink, marginTop: 16, width: L.descWidth }}
                />
            </div>

            <div style={{ perspective: 1800, position: "absolute", inset: 0 }}>
                <Card
                    src="projects/interface-svn/accueil.png"
                    style={{
                        ...L.main,
                        border: `1px solid ${g.soft}22`,
                        transform: `translateY(${(1 - main) * 200}px) rotateY(${settle * 10}deg) scale(${1 - settle * 0.04})`,
                        transformOrigin: "0% 50%",
                        opacity: Math.min(1, main * 2),
                    }}
                    imgStyle={{ transform: `scale(1.18) translateX(${pan}%)`, transformOrigin: "0 0" }}
                />
                <Card
                    src="projects/interface-svn/lecture-droits.png"
                    style={{
                        ...L.a,
                        boxShadow: "0 30px 70px rgba(26, 24, 19, 0.22)",
                        transform: `rotateY(${(1 - flipA) * 90}deg) translateZ(40px)`,
                        transformOrigin: "100% 50%",
                        opacity: flipA > 0.02 ? 1 : 0,
                    }}
                />
                <Card
                    src="projects/interface-svn/permissions-production.png"
                    style={{
                        ...L.b,
                        boxShadow: "0 30px 70px rgba(26, 24, 19, 0.22)",
                        transform: `rotateY(${(1 - flipB) * 90}deg) translateZ(80px)`,
                        transformOrigin: "100% 50%",
                        opacity: flipB > 0.02 ? 1 : 0,
                    }}
                />
            </div>

            <div style={{ position: "absolute", ...L.chips }}>
                {tech.map((t, i) => (
                    <Chip key={t} label={t} delay={CHIPS_AT + i * (BEAT / 2)} ground="paper" />
                ))}
            </div>
        </Scene>
    );
};
