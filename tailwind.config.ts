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
    },
  },
  plugins: [],
};

export default config;
