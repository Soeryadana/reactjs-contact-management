/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            boxShadow: {
                'custom': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
        }
    },
    // daisyui: {
    //     themes: ["light"],
    // },
    // // eslint-disable-next-line no-undef
    // plugins: [require("daisyui")],
    // corePlugins: {
    //     '@tailwind': true,
    // }
}