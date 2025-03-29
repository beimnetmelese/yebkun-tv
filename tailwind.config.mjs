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
        zinc: {
          800: "#27272a",
          900: "#18181b",
        },
      },
    },
  },
  plugins: [],
};

export default config;
