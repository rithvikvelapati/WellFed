import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#b64b29',
        secondary: '#ec9556',
        third: '#428f8f',
        background: '#f5f5f5',
        backgroundDash: 'rgba(66, 143, 143, 0.1)',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Set Roboto as the default sans-serif font
      },
      fontSize: {
        'fluid-lg': 'clamp(1.25rem, 5vw, 2rem)',
        'fluid-md': 'clamp(1rem, 4vw, 1.5rem)',
        'fluid-sm': 'clamp(0.875rem, 3vw, 1.25rem)',
      },
      spacing: {
        'fluid-px': 'clamp(0.25rem, 2vw, .5rem)',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '1/1': '1 / 1',
      },
      maxWidth: {
        '8xl': '1920px',
      },
      screens: {
        '3xl': '1600px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar-hide'),
  ],
};

export default config;
