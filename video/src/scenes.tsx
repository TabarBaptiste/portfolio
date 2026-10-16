import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { FadeUp, MaskLine, Rule, Scene, SectionTitle, TechLabel } from "./components";
import { colors, fonts, progress } from "./theme";

const display = (size: number): React.CSSProperties => ({
    fontFamily: fonts.display,
    fontWeight: 400,
    fontSize: size,
    lineHeight: 1.08,
    margin: 0,
    color: colors.ink900,
});

// 1. Ouverture : reprend le hero du site
export const Intro: React.FC<{ duration: number }> = ({ duration }) => (
    <Scene duration={duration}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
            <FadeUp delay={4}>
                <p style={{ fontFamily: fonts.mono, fontSize: 26, color: colors.ink500, margin: "0 0 48px" }}>
                    <span style={{ color: colors.success }}>●</span> Disponible immédiatement
                </p>
            </FadeUp>
            <MaskLine delay={12}>
                <h1 style={{ ...display(116), whiteSpace: "nowrap" }}>Baptiste TABAR LABONNE</h1>
            </MaskLine>
            <MaskLine delay={24}>
                <h1 style={{ ...display(116), fontStyle: "italic", color: colors.accent600 }}>
                    Développeur Full-Stack
                </h1>
            </MaskLine>
            <FadeUp delay={48}>
                <p style={{ fontSize: 36, color: colors.ink500, margin: "48px 0 0", maxWidth: 1150, lineHeight: 1.5 }}>
                    Je conçois des applications robustes, du premier schéma de base de données jusqu'à la mise
                    en production.
                </p>
            </FadeUp>
        </div>
    </Scene>
);

// 2. Preuves chiffrées (le <dl> du hero)
const stats = [
    { value: "3", label: "années d'alternance", count: 3 },
    { value: "5", label: "projets en production", count: 5 },
    { value: "TS · PHP", label: "stack principale" },
    { value: "BAC+5", label: "niveau d'études" },
];

export const Stats: React.FC<{ duration: number }> = ({ duration }) => {
    const frame = useCurrentFrame();
    return (
        <Scene duration={duration}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                <FadeUp delay={0}>
                    <p style={{ fontSize: 44, color: colors.ink700, margin: 0, maxWidth: 1300, lineHeight: 1.4 }}>
                        Trois ans d'alternance au Conseil Départemental du Val-de-Marne. Diplômé Architecte Web
                        à la Digital School of Paris.
                    </p>
                </FadeUp>
                <Rule delay={16} style={{ margin: "72px 0 56px" }} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 48 }}>
                    {stats.map((stat, i) => {
                        const delay = 24 + i * 8;
                        const p = progress(frame, delay, 30);
                        // Chiffres qui comptent, textes qui s'impriment caractère par caractère
                        const shown = stat.count
                            ? String(Math.round(interpolate(p, [0, 1], [0, stat.count])))
                            : stat.value.slice(0, Math.ceil(p * stat.value.length));
                        return (
                            <FadeUp key={stat.label} delay={delay}>
                                <p style={{ fontFamily: fonts.mono, fontSize: 64, color: colors.ink900, margin: 0, whiteSpace: "nowrap" }}>
                                    {shown || " "}
                                </p>
                                <p style={{ fontSize: 28, color: colors.ink500, margin: "12px 0 0" }}>{stat.label}</p>
                            </FadeUp>
                        );
                    })}
                </div>
            </div>
        </Scene>
    );
};

// 3. Comment je travaille
const principles = [
    { title: "Refondre sans tout casser", text: "Moderniser du code legacy sans interrompre le service." },
    { title: "Du code qui se relit dans six mois", text: "Simple et bien typé plutôt qu'impressionnant." },
    { title: "Livrer, surveiller, corriger", text: "CI/CD, suivi de la production avec Sentry, correctifs rapides." },
    { title: "Full-stack pour de vrai", text: "Base de données, API, interface et déploiement." },
];

export const Principles: React.FC<{ duration: number }> = ({ duration }) => (
    <Scene duration={duration}>
        <SectionTitle
            title="Comment je travaille"
            subtitle="Trois ans sur des applications métier en production m'ont appris quelques règles."
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 96, rowGap: 64 }}>
            {principles.map((p, i) => (
                <FadeUp key={p.title} delay={30 + i * 14}>
                    <h3 style={{ fontSize: 40, fontWeight: 600, color: colors.ink900, margin: "0 0 12px", whiteSpace: "nowrap" }}>{p.title}</h3>
                    <p style={{ fontSize: 30, color: colors.ink500, margin: 0, lineHeight: 1.5 }}>{p.text}</p>
                </FadeUp>
            ))}
        </div>
    </Scene>
);

// 4. Transition vers les projets
export const ProjectsTitle: React.FC<{ duration: number }> = ({ duration }) => (
    <Scene duration={duration}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
            <MaskLine delay={0}>
                <h2 style={display(160)}>Projets</h2>
            </MaskLine>
            <FadeUp delay={12}>
                <p style={{ fontSize: 36, color: colors.ink500, margin: "24px 0 0" }}>
                    Le besoin de départ, mes choix techniques, le résultat.
                </p>
            </FadeUp>
        </div>
    </Scene>
);

// 5. Projet avec captures : texte à gauche, captures superposées à droite
export const ProjectShowcase: React.FC<{
    duration: number;
    title: string;
    context: string;
    description: string;
    tech: string[];
    main: string;
    secondary: string;
}> = ({ duration, title, context, description, tech, main, secondary }) => {
    const frame = useCurrentFrame();
    const card = progress(frame, 6, 30);
    const second = progress(frame, 46, 30);
    // Lent zoom sur la capture principale pendant toute la scène
    const zoom = interpolate(frame, [0, duration], [1, 1.06]);

    return (
        <Scene duration={duration}>
            <div style={{ display: "grid", gridTemplateColumns: "600px 1fr", gap: 64, height: "100%", alignItems: "center" }}>
                <div>
                    <FadeUp delay={0}>
                        <p style={{ fontFamily: fonts.mono, fontSize: 22, color: colors.accent600, margin: "0 0 24px" }}>
                            {context}
                        </p>
                    </FadeUp>
                    <MaskLine delay={4}>
                        <h2 style={display(76)}>{title}</h2>
                    </MaskLine>
                    <FadeUp delay={16}>
                        <p style={{ fontSize: 30, color: colors.ink500, lineHeight: 1.5, margin: "28px 0 36px" }}>
                            {description}
                        </p>
                    </FadeUp>
                    <FadeUp delay={26}>
                        <TechLabel items={tech} style={{ fontSize: 20 }} />
                    </FadeUp>
                </div>

                <div style={{ position: "relative", height: 760 }}>
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "100%",
                            height: 580,
                            borderRadius: 16,
                            border: `1px solid ${colors.ink200}`,
                            backgroundColor: colors.card,
                            overflow: "hidden",
                            opacity: card,
                            transform: `translateY(${(1 - card) * 40}px)`,
                        }}
                    >
                        <Img
                            src={staticFile(main)}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "top center",
                                transform: `scale(${zoom})`,
                                transformOrigin: "50% 30%",
                            }}
                        />
                    </div>
                    {/* Seconde capture en surimpression : seule surface avec ombre, comme les overlays du site */}
                    <div
                        style={{
                            position: "absolute",
                            left: 32,
                            bottom: 0,
                            width: 560,
                            height: 340,
                            borderRadius: 16,
                            border: `1px solid ${colors.ink200}`,
                            backgroundColor: colors.card,
                            overflow: "hidden",
                            boxShadow: "0 24px 60px rgba(26, 24, 19, 0.18)",
                            opacity: second,
                            transform: `translateY(${(1 - second) * 60}px)`,
                        }}
                    >
                        <Img
                            src={staticFile(secondary)}
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top left" }}
                        />
                    </div>
                </div>
            </div>
        </Scene>
    );
};

// 6. Extension VSCode : logo en grand, fonctionnalités en liste
const daoFeatures = [
    "Connexion aux serveurs de bases de données",
    "Exploration des tables depuis la sidebar",
    "Génération des DAO PHP en quelques secondes",
    "Mots de passe chiffrés en AES-256-CBC",
    "Erreurs utilisateurs remontées avec Sentry",
];

export const DaoShowcase: React.FC<{ duration: number }> = ({ duration }) => {
    const frame = useCurrentFrame();
    const logo = progress(frame, 4, 34);
    return (
        <Scene duration={duration}>
            <div style={{ display: "grid", gridTemplateColumns: "620px 1fr", gap: 112, height: "100%", alignItems: "center" }}>
                <div
                    style={{
                        height: 720,
                        borderRadius: 16,
                        border: `1px solid ${colors.ink200}`,
                        // Seul dégradé autorisé par la charte : celui du projet phare
                        background: `linear-gradient(160deg, ${colors.accent50}, ${colors.paper})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: logo,
                    }}
                >
                    <Img
                        src={staticFile("projects/logo.png")}
                        style={{ width: 400, mixBlendMode: "multiply", transform: `scale(${0.9 + logo * 0.1}) rotate(${(1 - logo) * -8}deg)` }}
                    />
                </div>
                <div>
                    <FadeUp delay={0}>
                        <p style={{ fontFamily: fonts.mono, fontSize: 22, color: colors.accent600, margin: "0 0 24px" }}>
                            Publiée sur le VSCode Marketplace
                        </p>
                    </FadeUp>
                    <MaskLine delay={6}>
                        <h2 style={display(76)}>PHP DAO Generator</h2>
                    </MaskLine>
                    <FadeUp delay={16}>
                        <p style={{ fontSize: 30, color: colors.ink500, lineHeight: 1.5, margin: "24px 0 40px", maxWidth: 900 }}>
                            Une demande de mon maître d'apprentissage : automatiser une tâche répétitive de toute l'équipe.
                        </p>
                    </FadeUp>
                    {daoFeatures.map((feature, i) => (
                        <FadeUp key={feature} delay={30 + i * 9} distance={16}>
                            <p
                                style={{
                                    fontSize: 30,
                                    color: colors.ink800,
                                    margin: 0,
                                    padding: "14px 0",
                                    borderTop: i === 0 ? `1px solid ${colors.ink200}` : "none",
                                    borderBottom: `1px solid ${colors.ink200}`,
                                }}
                            >
                                {feature}
                            </p>
                        </FadeUp>
                    ))}
                    <FadeUp delay={80}>
                        <TechLabel items={["TypeScript", "GitHub Actions", "Sentry", "Azure"]} style={{ marginTop: 32 }} />
                    </FadeUp>
                </div>
            </div>
        </Scene>
    );
};

// 7. Autres projets, en registre
const others = [
    { title: "Furious Ducks : Thé Tip Top", text: "Lead dev d'un jeu-concours prévu pour 500 000 codes uniques", tech: ["NestJS", "Next.js", "Redis", "K6"] },
    { title: "Furious Ducks : Workflow CI/CD", text: "Pipelines Docker sur trois environnements", tech: ["Jenkins", "GitLab CE", "Harbor", "SonarQube"] },
    { title: "Beroli", text: "Application mobile d'interventions terrain", tech: ["Flutter", "Firebase"] },
    { title: "RjWeb", text: "Plateforme communautaire de quartier", tech: ["PHP", "MySQL"] },
];

export const OtherProjects: React.FC<{ duration: number }> = ({ duration }) => (
    <Scene duration={duration}>
        <SectionTitle title="Et aussi" subtitle="Projets de formation, en équipe, et de stage." />
        <div style={{ maxWidth: 1600 }}>
            {others.map((project, i) => (
                <FadeUp key={project.title} delay={20 + i * 12}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 700px",
                            gap: 48,
                            alignItems: "baseline",
                            padding: "26px 0",
                            borderBottom: i < others.length - 1 ? `1px solid ${colors.ink200}` : "none",
                        }}
                    >
                        <div>
                            <h3 style={{ fontSize: 38, fontWeight: 600, color: colors.ink900, margin: "0 0 6px" }}>{project.title}</h3>
                            <p style={{ fontSize: 26, color: colors.ink500, margin: 0 }}>{project.text}</p>
                        </div>
                        <TechLabel items={project.tech} />
                    </div>
                </FadeUp>
            ))}
        </div>
    </Scene>
);

// 8. Compétences : mur d'icônes (public/icon_svg)
const stack = [
    ["typescript", "TypeScript"], ["javascript", "JavaScript"], ["php", "PHP"], ["react", "React"],
    ["nextjs", "Next.js"], ["angular", "Angular"], ["vue", "Vue.js"], ["nestjs", "NestJS"],
    ["symfony", "Symfony"], ["nodejs", "Node.js"], ["postgresql", "PostgreSQL"], ["mysql", "MySQL"],
    ["prisma", "Prisma"], ["docker", "Docker"], ["github", "GitHub"], ["tailwind", "Tailwind"],
    ["stripe", "Stripe"], ["sentry", "Sentry"],
];

export const Stack: React.FC<{ duration: number }> = ({ duration }) => {
    const frame = useCurrentFrame();
    return (
        <Scene duration={duration}>
            <SectionTitle title="Compétences" subtitle="Du front au déploiement, les outils que je pratique au quotidien." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 20 }}>
                {stack.map(([icon, label], i) => {
                    const p = progress(frame, 22 + i * 3, 22);
                    return (
                        <div
                            key={icon}
                            style={{
                                borderRadius: 16,
                                border: `1px solid ${colors.ink200}`,
                                backgroundColor: colors.card,
                                height: 190,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 20,
                                opacity: p,
                                transform: `translateY(${(1 - p) * 24}px) scale(${0.94 + p * 0.06})`,
                            }}
                        >
                            <Img src={staticFile(`icon_svg/${icon}.svg`)} style={{ width: 72, height: 72, objectFit: "contain" }} />
                            <span style={{ fontFamily: fonts.mono, fontSize: 18, color: colors.ink500 }}>{label.toLowerCase()}</span>
                        </div>
                    );
                })}
            </div>
        </Scene>
    );
};

// 9. Parcours, dans l'ordre chronologique
const timeline = [
    { period: "2021 - 2023", title: "BTS SIO, option SLAM", place: "Lycée Léonard de Vinci, Melun" },
    { period: "2022", title: "Stage développeur web", place: "Crédit Agricole" },
    { period: "2023", title: "Stage développeur web", place: "RJ Web" },
    { period: "2023 - 2024", title: "Licence Pro Applications Web", place: "Université d'Évry, Paris-Saclay" },
    { period: "2023 - 2026", title: "Développeur Full-Stack en alternance", place: "Conseil Départemental du Val-de-Marne" },
    { period: "2024 - 2026", title: "Mastère Architecte Web", place: "Digital School of Paris" },
];

export const Journey: React.FC<{ duration: number }> = ({ duration }) => (
    <Scene duration={duration}>
        <SectionTitle title="Parcours" subtitle="Du BTS au Mastère, avec trois ans d'alternance en collectivité." />
        <div>
            {timeline.map((step, i) => (
                <FadeUp key={step.title + step.period} delay={20 + i * 12}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "260px 1fr",
                            gap: 48,
                            alignItems: "baseline",
                            padding: "16px 0",
                            borderBottom: i < timeline.length - 1 ? `1px solid ${colors.ink200}` : "none",
                        }}
                    >
                        <span style={{ fontFamily: fonts.mono, fontSize: 24, color: colors.ink500 }}>{step.period}</span>
                        <p style={{ fontSize: 30, margin: 0, whiteSpace: "nowrap" }}>
                            <span style={{ fontWeight: 600, color: colors.ink900 }}>{step.title}</span>
                            <span style={{ color: colors.accent600 }}>{"   "}{step.place}</span>
                        </p>
                    </div>
                </FadeUp>
            ))}
        </div>
    </Scene>
);

// 10. Contact
const contacts = [
    ["email", "tabarbaptiste@gmail.com"],
    ["linkedin", "in/baptiste-tabar-labonne"],
    ["github", "TabarBaptiste"],
    ["portfolio", "portfolio-tabarlabonne.netlify.app"],
];

export const Outro: React.FC<{ duration: number }> = ({ duration }) => (
    <Scene duration={duration}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
            <MaskLine delay={0}>
                <h2 style={display(120)}>Un poste, un projet,</h2>
            </MaskLine>
            <MaskLine delay={10}>
                <h2 style={{ ...display(120), fontStyle: "italic", color: colors.accent600 }}>une question ?</h2>
            </MaskLine>
            <FadeUp delay={28}>
                <p style={{ fontSize: 36, color: colors.ink500, margin: "36px 0 64px" }}>
                    Je réponds vite. Disponible dès maintenant, sur site ou en télétravail.
                </p>
            </FadeUp>
            <div style={{ display: "grid", rowGap: 18 }}>
                {contacts.map(([label, value], i) => (
                    <FadeUp key={label} delay={44 + i * 8} distance={16}>
                        <span style={{ fontFamily: fonts.mono, fontSize: 22, color: colors.ink400, display: "inline-block", width: 200 }}>
                            {label}
                        </span>
                        <span style={{ fontFamily: fonts.mono, fontSize: 30, color: colors.ink900 }}>{value}</span>
                    </FadeUp>
                ))}
            </div>
        </div>
    </Scene>
);
