import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = join(process.cwd(), "public", "flores");
mkdirSync(OUT_DIR, { recursive: true });

const flores = [
  ["rock-rose","Heliantemo"],["mimulus","Mímulo"],["cherry-plum","Cerasífera"],["aspen","Álamo Temblón"],["red-chestnut","Castaño Rojo"],
  ["cerato","Ceratostigma"],["scleranthus","Escleranto"],["gentian","Genciana"],["gorse","Aulaga"],["hornbeam","Hojarazo"],["wild-oat","Avena Silvestre"],
  ["clematis","Clemátide"],["honeysuckle","Madreselva"],["wild-rose","Rosa Silvestre"],["olive","Olivo"],["white-chestnut","Castaño de Indias"],["mustard","Mostaza"],["chestnut-bud","Brote de Castaño"],
  ["water-violet","Violeta de Agua"],["impatiens","Impaciencia"],["heather","Brezo"],
  ["agrimony","Agrimonia"],["centaury","Centaura"],["walnut","Nogal"],["holly","Acebo"],
  ["larch","Alerce"],["pine","Pino"],["elm","Olmo"],["sweet-chestnut","Castaño Dulce"],["star-of-bethlehem","Estrella de Belén"],["willow","Sauce"],["oak","Roble"],["crab-apple","Manzano Silvestre"],
  ["chicory","Achicoria"],["vervain","Verbena"],["vine","Vid"],["beech","Haya"],["rock-water","Agua de Roca"]
];

const svgTemplate = (label) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="960" height="540" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFF7F1"/>
      <stop offset="100%" stop-color="#EAF4EF"/>
    </linearGradient>
  </defs>
  <rect width="960" height="540" fill="url(#g)"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, Segoe UI, Roboto" font-size="48" fill="#334155">
    ${label}
  </text>
</svg>`;

for (const [slug, nombre] of flores) {
  const file = join(OUT_DIR, `${slug}.svg`);
  writeFileSync(file, svgTemplate(nombre), "utf-8");
}
