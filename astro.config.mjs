// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    site: 'https://portfolio-tabarlabonne.netlify.app/',
    integrations: [sitemap(), icon()],
    // Astro v7 est passé à un compressage HTML "à la JSX" par défaut, qui supprime les espaces
    // entre éléments inline au lieu de les préserver comme le fait un navigateur. On garde
    // l'ancien comportement pour ne pas casser les espacements existants dans tout le site.
    compressHTML: true,
});
