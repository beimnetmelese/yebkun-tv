/** @type {import('tailwindcss').Config} */
const config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: {
          50: "#1a1a1a", // Lightest black
          100: "#141414",
          200: "#0f0f0f",
          300: "#0a0a0a",
          400: "#050505",
          500: "#000000", // True black
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000", // Darkest black
        },
        zinc: {
          800: "#27272a",
          900: "#18181b",
        },
        black: "#000000",
        white: "#ffffff",
        gray: "#BAC4C8",
        blue: "#0078d4",
      },
      fontFamily: {
        genos: ["Genos", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
