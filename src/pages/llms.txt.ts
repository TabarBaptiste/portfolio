import type { APIRoute } from "astro";
import { projects } from "../data/projects";

// Résumé du site au format llms.txt (https://llmstxt.org) pour les moteurs de réponse IA
const siteUrl = "https://portfolio-tabarlabonne.netlify.app";

export const GET: APIRoute = () => {
  const projectLines = projects
    .map((p) => `- [${p.title}](${siteUrl}/projects/${p.slug}/): ${p.seoDescription}`)
    .join("\n");

  const body = `# Baptiste TABAR LABONNE - Développeur Full-Stack

> Portfolio de Baptiste TABAR LABONNE, développeur Full-Stack diplômé du Mastère Architecte Web (Digital School of Paris). Spécialisé en Next.js, NestJS et TypeScript, avec trois ans d'alternance au Conseil départemental du Val-de-Marne.

## Pages

- [Accueil](${siteUrl}/): présentation, projets, parcours, compétences et contact
- [Travaux au Conseil départemental du Val-de-Marne](${siteUrl}/cdvm/): cinq chantiers d'outillage du cycle de vie applicatif

## Projets

${projectLines}

## Liens

- [GitHub](https://github.com/TabarBaptiste)
- [LinkedIn](https://www.linkedin.com/in/baptiste-tabar-labonne/)
- [CV (PDF)](${siteUrl}/Curriculum_Vitae_TABAR_LABONNE_Baptiste.pdf)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
