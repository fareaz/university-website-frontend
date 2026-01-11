const config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/hooks/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light"],
    },
};

export default config;
