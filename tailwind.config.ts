import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2.5rem',
    },
    fontFamily: {
      heading: ['DM Mono', 'monospace'],
      body: ['Barlow Condensed', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
} satisfies Config;
