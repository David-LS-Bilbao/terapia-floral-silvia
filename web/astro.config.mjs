// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  //site: 'https://david-ls-bilbao.github.io',
    site: 'https://terapias-naturales-silvia.github.io',
    base: '/',
  vite: { plugins: [tailwindcss()] },
  integrations: [sitemap()],
});