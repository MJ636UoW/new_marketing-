/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#040406',
        'obsidian-surface': '#0a0c14',
        'obsidian-card': '#0e111a',
        'electric-cyan': '#00f0ff',
        'sharp-lime': '#ccff00',
        'soft-white': '#f0f4f8',
        'cool-gray': '#64748b',
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'monospace'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
