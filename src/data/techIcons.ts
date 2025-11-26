export const techIcons: Record<string, string> = {
    // Languages
    'TypeScript': '/icon_svg/typescript.svg',

    'JavaScript': '/icon_svg/javascript.svg',

    'PHP': '/icon_svg/php.svg',

    'Dart': '/icon_svg/dart.svg',

    // Frameworks & Libraries
    'Angular': '/icon_svg/angular.svg',

    'React': '/icon_svg/react.svg',

    'Vue.js': '/icon_svg/vue.svg',

    'Next.js': '/icon_svg/nextjs.svg',

    'Flutter': '/icon_svg/flutter.svg',

    'Astro': '/icon_svg/astro.svg',

    'Express': '/icon_svg/nodejs.svg',

    'NestJS': '/icon_svg/nestjs.svg',

    'Symfony': '/icon_svg/symfony.svg',

    'Tailwind CSS': '/icon_svg/tailwind.svg',

    'ExtJS': '/icon_svg/extjs.svg',

    // Tools & Services
    'Firebase': '/icon_svg/firebase.svg',

    'Supabase': '/icon_svg/supabase.svg',

    'Sentry': '/icon_svg/sentry.svg',

    'Prisma': '/icon_svg/prisma.svg',

    'PostgreSQL': '/icon_svg/postgresql.svg',

    'MySQL': '/icon_svg/mysql.svg',

    'NeonDB': '/icon_svg/neondb.svg',

    'CI/CD': '/icon_svg/cicd.svg',

    'GitHub Actions': '/icon_svg/github.svg',

    'CircleCI': '/icon_svg/circleci.svg',

    'Docker': '/icon_svg/docker.svg',

    'HTML': '/icon_svg/html.svg',

    'CSS': '/icon_svg/css.svg',

    'HTML5 / CSS3': '/icon_svg/html5-css3.svg',

    'Node.js': '/icon_svg/nodejs.svg',

    'Render': '/icon_svg/render.svg',

    'Netlify': '/icon_svg/netlify.svg',

    'Vercel': '/icon_svg/vercel.svg',

    'Railway': '/icon_svg/railway.svg',

    'Git': '/icon_svg/git.svg',

    'GitHub': '/icon_svg/github.svg',

    'Jira': '/icon_svg/jira.svg',

    'Trello': '/icon_svg/trello.svg',

    'Figma': '/icon_svg/figma.svg',

    'Base de données': '/icon_svg/database.svg',

    'Référencement SEO': '/icon_svg/seo.svg',

    'MCP': '/icon_svg/mcp.svg',

    'SVN': '/icon_svg/svn.svg',

    'WAMP / PhpMyAdmin': '/icon_svg/wamp.svg',

    'Markdown': '/icon_svg/markdown.svg'
};

// Map des technologies aux icônes
export const getTechIcon = (tech: string): string | undefined => {
    return techIcons[tech];
};

// Extraire les technologies d'un texte (détecte les mots entre **)
export const extractTechnologiesFromText = (text: string): string[] => {
    const matches = text.match(/\*\*(.*?)\*\*/g);
    if (!matches) return [];

    return matches
        .map(match => match.replace(/\*\*/g, ''))
        .filter(tech => techIcons[tech]);
};


import { existsSync } from 'fs';
import { join } from 'path';

// Fonction pour vérifier si une icône existe
export const iconExists = (iconPath: string) => {
    if (!iconPath) return false;
    const fullPath = join(process.cwd(), 'public', iconPath.replace(/^\//, ''));
    return existsSync(fullPath);
};