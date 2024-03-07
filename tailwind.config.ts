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
                "nav-bg": "#2c1b3d",
            },
            
            backdropBlur: {
                xl: '40px',
            },
            
            backgroundColor: ['responsive', 'hover', 'focus', 'active'],

            transitionDuration: {
                '500': '500ms',
            },

            transitionTimingFunction: {
                'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
            },
        }, 
        
        variants: {
            extend: {
                borderColor: ['hover', 'focus'],
                transform: ['hover', 'focus'],
                scale: ['hover', 'focus'],
            },
        },
    },

    plugins: [],
}