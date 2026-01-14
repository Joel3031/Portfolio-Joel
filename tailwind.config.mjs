/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                midnight: '#0a0a0a',   // Deep, rich black
                charcoal: '#1a1a1a',   // Secondary dark
                gold: '#D4AF37',       // The "Formal" Accent
                'gold-dim': '#8a711f', // Muted gold for borders
                silver: '#e5e7eb',     // Primary text
            },
            fontFamily: {
                // Playfair Display for that "Magazine/Cinematic" feel
                serif: ['"Playfair Display"', 'serif'],
                // Inter for technical readability
                sans: ['"Inter"', 'sans-serif'],
            },
            animation: {
                'slow-pan': 'pan 20s linear infinite',
            }
        },
    },
    plugins: [],
}