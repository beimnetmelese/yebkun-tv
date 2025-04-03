/** @type {import('tailwindcss').Config} */

import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // TV-specific breakpoints
      screens: {
        "tv-sm": "1280px", // 720p
        "tv-md": "1920px", // 1080p
        "tv-lg": "3840px", // 4K
      },
      // TV-specific spacing
      spacing: {
        "tv-1": "clamp(4px, 0.5vw, 8px)",
        "tv-2": "clamp(8px, 1vw, 16px)",
        "tv-3": "clamp(12px, 1.5vw, 24px)",
        "tv-4": "clamp(16px, 2vw, 32px)",
        "tv-5": "clamp(20px, 2.5vw, 40px)",
        "tv-6": "clamp(24px, 3vw, 48px)",
        "tv-8": "clamp(32px, 4vw, 64px)",
        "tv-10": "clamp(40px, 5vw, 80px)",
        "tv-12": "clamp(48px, 6vw, 96px)",
        "tv-16": "clamp(64px, 8vw, 128px)",
      },
      // TV-specific font sizes
      fontSize: {
        "tv-xs": "clamp(12px, 1vw, 18px)",
        "tv-sm": "clamp(16px, 1.5vw, 24px)",
        "tv-base": "clamp(20px, 2vw, 32px)",
        "tv-lg": "clamp(24px, 2.5vw, 40px)",
        "tv-xl": "clamp(28px, 3vw, 48px)",
        "tv-2xl": "clamp(32px, 3.5vw, 56px)",
        "tv-3xl": "clamp(36px, 4vw, 64px)",
        "tv-4xl": "clamp(48px, 5vw, 80px)",
      },
      // TV-specific border radius
      borderRadius: {
        "tv-sm": "clamp(4px, 0.5vw, 8px)",
        "tv-md": "clamp(8px, 1vw, 16px)",
        "tv-lg": "clamp(12px, 1.5vw, 24px)",
      },
    },
  },
  plugins: [],
};

export default config;
