/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'swiss-black': '#000000',
                'swiss-white': '#ffffff',
                'swiss-gray': '#f5f5f5',
                'swiss-gray-dark': '#333333',
                'swiss-red': '#ff0000',
                'swiss-accent': '#0000ff',
            },
            fontFamily: {
                sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
                mono: ['Courier', 'monospace'],
            },
            animation: {
                glitch: 'glitch 5s infinite',
                'grid-move': 'gridMove 20s linear infinite',
                blink: 'blink 1s infinite',
                glow: 'glow 2s ease-in-out infinite',
            },
            keyframes: {
                glitch: {
                    '0%, 90%, 100%': { transform: 'translate(0)' },
                    '91%, 93%': { transform: 'translate(-2px, 2px)' },
                    '92%, 94%': { transform: 'translate(2px, -2px)' },
                },
                gridMove: {
                    '0%': { transform: 'translate(0, 0)' },
                    '100%': { transform: 'translate(50px, 50px)' },
                },
                blink: {
                    '0%, 50%': { opacity: '1' },
                    '51%, 100%': { opacity: '0' },
                },
                glow: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
            },
            boxShadow: {
                'cyber-blue': '0 0 20px rgba(139, 92, 246, 0.5)',
                'cyber-pink': '0 0 20px rgba(167, 139, 250, 0.5)',
                'cyber-blue-lg': '0 0 30px rgba(139, 92, 246, 0.8)',
            },
        },
    },
    plugins: [],
};
