// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://silvia-adame-terapiasnaturales.vercel.app',
  base: '/',
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap()],
});