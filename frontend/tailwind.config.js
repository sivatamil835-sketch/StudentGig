/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0ea5e9',
                    dark: '#0284c7',
                },
                secondary: {
                    DEFAULT: '#10b981',
                    dark: '#059669',
                },
                background: {
                    light: '#f8fafc',
                    dark: '#0f172a',
                }
            }
        },
    },
    plugins: [],
}
