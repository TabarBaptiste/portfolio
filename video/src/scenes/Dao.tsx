import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { Chars, Dir, Scene, Typewriter, Words, useMobile } from "../components";
import { BEAT, colors, fonts, grounds, pop, readTime } from "../theme";

const g = grounds.night;
const features = [
    "Connexion aux bases de données",
    "Exploration des tables",
    "Mots de passe chiffrés (AES-256)",
    "Erreurs suivies avec Sentry",
];
const LABEL = "extension vscode · marketplace";
const TITLE = "PHP DAO Generator";
const DESC = "Générer en quelques secondes les DAO de toute l'équipe.";
// Les fonctionnalités n'arrivent qu'une fois la description lue
const FEATURES_AT = 8 + readTime(LABEL, TITLE, DESC);
export const daoEnd = FEATURES_AT + readTime(...features);

// Le logo tombe en place avec un ressort, puis les fonctionnalités arrivent une par temps
export const Dao: React.FC<{ duration: number; exit?: Dir }> = ({ duration, exit }) => {
    const frame = useCurrentFrame();
    const logo = pop(frame, 4, 13);
    const m = useMobile();
    // En vertical : le logo en haut, le texte en dessous
    const L = m
        ? { card: { left: 80, top: 340, width: 440, height: 440 }, logo: 350, text: { left: 80, top: 870, width: 920 }, label: 34, title: 100, desc: 42, feature: 42 }
        : { card: { left: 160, top: 290, width: 500, height: 500 }, logo: 400, text: { left: 760, top: 250, width: 1060 }, label: 26, title: 104, desc: 34, feature: 36 };

    return (
        <Scene ground="night" duration={duration} exit={exit} padded={false}>
            <div
                style={{
                    position: "absolute",
                    ...L.card,
                    borderRadius: 24,
                    backgroundColor: colors.paper,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: `translateY(${(1 - logo) * 300}px) rotate(${(1 - logo) * -18}deg) scale(${0.7 + logo * 0.3})`,
                    opacity: Math.min(1, logo * 2),
                }}
            >
                <Img src={staticFile("projects/logo.png")} style={{ width: L.logo, mixBlendMode: "multiply" }} />
            </div>

            <div style={{ position: "absolute", ...L.text }}>
                <Typewriter text={LABEL} delay={12} speed={1} style={{ fontSize: L.label, color: g.accent }} />
                <Chars text={TITLE} delay={8} stagger={2} style={{ fontFamily: fonts.display, fontSize: L.title, lineHeight: 1.1, marginTop: 20, color: g.ink }} />
                <Words
                    text={DESC}
                    delay={20}
                    stagger={2}
                    style={{ fontSize: L.desc, lineHeight: 1.45, color: g.soft, marginTop: 24 }}
                />
                <div style={{ marginTop: 40 }}>
                    {features.map((f, i) => (
                        <Words key={f} text={f} delay={FEATURES_AT + i * BEAT} stagger={1} style={{ fontSize: L.feature, lineHeight: 1.7, color: g.ink }} />
                    ))}
                </div>
            </div>
        </Scene>
    );
};
