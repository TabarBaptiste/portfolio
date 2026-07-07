/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                // Fond "papier" chaleureux (mode clair par défaut)
                paper: {
                    DEFAULT: '#FAF8F3',
                    card: '#FFFFFF',
                },
                // Encre : échelle de gris chauds pour le texte et les bordures
                ink: {
                    50: '#F6F4EE',
                    100: '#ECE9E1',
                    200: '#DAD6CB',
                    300: '#B5B0A3',
                    400: '#8B8679',
                    500: '#6B675D',
                    600: '#4C4941',
                    700: '#35322B',
                    800: '#23211B',
                    900: '#1A1813',
                },
                // Accent unique : bleu encre
                accent: {
                    50: '#EDF2FB',
                    100: '#D3DFF5',
                    200: '#A9C0EA',
                    300: '#7A9CDB',
                    400: '#4F7AC8',
                    500: '#2E62B8',
                    600: '#254D92',
                    700: '#1C3B72',
                    800: '#142B54',
                    900: '#0C1C39',
                },
                // Surfaces du mode sombre (chaud, pas noir bleuté)
                night: {
                    bg: '#161511',
                    card: '#1F1D17',
                    border: '#2E2B23',
                },
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
                display: ['var(--font-display)', 'Georgia', 'serif'],
                mono: ['"OCR-B"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
            },
            maxWidth: {
                content: '68rem',
            },
        },
    },
    plugins: [],
};
