/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#e6f0ff',
                    100: '#b3d1ff',
                    200: '#80b3ff',
                    300: '#4d94ff',
                    400: '#1a75ff',
                    500: '#0066e6',
                    600: '#0052b3',
                    700: '#003d80',
                    800: '#00294d',
                    900: '#00141a',
                },
                dark: {
                    50: '#f2f3f5',
                    100: '#e6e8eb',
                    200: '#bfc3c9',
                    300: '#999ea7',
                    400: '#4d5463',
                    500: '#212529',
                    600: '#1e2125',
                    700: '#191c1f',
                    800: '#141619',
                    900: '#0a0e13',
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
            },
        },
    },
    plugins: [],
};
