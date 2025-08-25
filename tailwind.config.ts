import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        body: 'var(--font-body)', // Arbutus Slab
        title: 'var(--font-title)', // Poppins
        arapey: 'var(--font-arapey)', // Arapey
      },
      keyframes: {
        giftgrow: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(4)' },
        },
      },
      animation: {
        giftgrow: 'giftgrow 300ms ease-in forwards',
      },
    },
  },
  plugins: [],
};

export default config;
