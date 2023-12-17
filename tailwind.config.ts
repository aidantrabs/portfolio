/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    
    theme: {
        extend: {
            colors: {
                "accent-element": "#B8B3E9",
                "primary-head": "#B8B3E9",
                "primary-par": "#ECE4B7",
            },
        },
    },

    plugins: [],
}

