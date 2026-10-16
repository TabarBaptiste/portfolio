import React from "react";
import { AbsoluteFill, Series, interpolate, useCurrentFrame } from "remotion";
import "./fonts";
import {
    DaoShowcase,
    Intro,
    Journey,
    OtherProjects,
    Outro,
    Principles,
    ProjectShowcase,
    ProjectsTitle,
    Stack,
    Stats,
} from "./scenes";
import { colors, fonts } from "./theme";

type Step = { label: string; duration: number; render: (duration: number) => React.ReactNode };

const steps: Step[] = [
    { label: "", duration: 150, render: (d) => <Intro duration={d} /> },
    { label: "à propos", duration: 120, render: (d) => <Stats duration={d} /> },
    { label: "à propos", duration: 180, render: (d) => <Principles duration={d} /> },
    { label: "projets", duration: 75, render: (d) => <ProjectsTitle duration={d} /> },
    {
        label: "projets",
        duration: 165,
        render: (d) => (
            <ProjectShowcase
                duration={d}
                title="Aly dous'heure"
                context="En production  ·  alydousheure.fr"
                description="Plateforme de réservation pour une masseuse indépendante : créneaux en temps réel, paiement en ligne, tableau de bord pour la professionnelle."
                tech={["NestJS", "Next.js", "Prisma", "Stripe"]}
                main="projects/alydousheure/hero.png"
                secondary="projects/alydousheure/reserver.png"
            />
        ),
    },
    { label: "projets", duration: 165, render: (d) => <DaoShowcase duration={d} /> },
    {
        label: "projets",
        duration: 165,
        render: (d) => (
            <ProjectShowcase
                duration={d}
                title="Interface de gestion SVN"
                context="En production  ·  Val-de-Marne"
                description="Dépôts, branches, tags et sauvegardes gérés depuis le navigateur, sans ligne de commande. Un wrapper root sécurisé n'autorise qu'une liste fermée d'actions."
                tech={["PHP", "Bash", "Linux", "Ext JS"]}
                main="projects/interface-svn/accueil.png"
                secondary="projects/interface-svn/permissions-production.png"
            />
        ),
    },
    { label: "projets", duration: 165, render: (d) => <OtherProjects duration={d} /> },
    { label: "compétences", duration: 150, render: (d) => <Stack duration={d} /> },
    { label: "parcours", duration: 180, render: (d) => <Journey duration={d} /> },
    { label: "contact", duration: 180, render: (d) => <Outro duration={d} /> },
];

export const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);

// Bandeau discret en haut : nom à gauche, section courante à droite
const Chrome: React.FC = () => {
    const frame = useCurrentFrame();
    const introEnd = steps[0].duration;
    let start = 0;
    let label = "";
    for (const step of steps) {
        if (frame < start + step.duration) {
            label = step.label;
            break;
        }
        start += step.duration;
    }
    const opacity = interpolate(frame, [introEnd - 10, introEnd + 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const style: React.CSSProperties = { fontFamily: fonts.mono, fontSize: 20, color: colors.ink400 };
    return (
        <AbsoluteFill style={{ opacity, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: 56, left: 160, right: 160, display: "flex", justifyContent: "space-between" }}>
                <span style={style}>baptiste tabar labonne</span>
                <span style={style}>{label}</span>
            </div>
        </AbsoluteFill>
    );
};

export const Presentation: React.FC = () => (
    <AbsoluteFill style={{ backgroundColor: colors.paper }}>
        <Series>
            {steps.map((step, i) => (
                <Series.Sequence key={i} durationInFrames={step.duration}>
                    {step.render(step.duration)}
                </Series.Sequence>
            ))}
        </Series>
        <Chrome />
    </AbsoluteFill>
);
