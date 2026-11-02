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
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#1d82b2',
          600: '#0f6690',
          700: '#0d5475',
          800: '#094863', // Main authentic brand color
          900: '#062e40', // Deep industrial navy
          950: '#031720',
        },
        steel: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        'brand-red': {
          DEFAULT: '#D93636',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          500: '#ef4444',
          600: '#D93636',
          700: '#b91c1c',
          800: '#991b1b',
        }
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['var(--font-manrope)', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-dm-sans)', 'DM Sans', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(#cbd5e1 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
};
export default config;
