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
                // Accent unique : vert profond "encre"
                accent: {
                    50: '#E9F4EF',
                    100: '#C9E5D9',
                    200: '#93CBB4',
                    300: '#57A98A',
                    400: '#2E8A68',
                    500: '#146C4E',
                    600: '#0E5840',
                    700: '#0A4533',
                    800: '#073527',
                    900: '#04251B',
                },
                // Surfaces du mode sombre (chaud, pas noir bleuté)
                night: {
                    bg: '#161511',
                    card: '#1F1D17',
                    border: '#2E2B23',
                },
            },
            fontFamily: {
                sans: [
                    'Inter',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'sans-serif',
                ],
                display: ['"Instrument Serif"', 'Georgia', 'serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
            },
            maxWidth: {
                content: '68rem',
            },
        },
    },
    plugins: [],
};
