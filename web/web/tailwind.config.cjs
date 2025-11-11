/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
  ],
  safelist: [
    "animate-fadeInUp", // 👈 asegura que nunca se elimine
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
