export type Grupo =
  | "Miedo"
  | "Incertidumbre"
  | "Falta de interés en el presente"
  | "Soledad"
  | "Hipersensibilidad"
  | "Desaliento o desesperación"
  | "Preocupación excesiva por los demás";

export interface Flor {
  slug: string;
  es: string;
  en: string;
  grupo: Grupo;
  img?: string;
  breve?: string;
}

const img = (slug: string) => `/flores/${slug}.jpg`;

export const gruposOrden: Grupo[] = [
  "Miedo",
  "Incertidumbre",
  "Falta de interés en el presente",
  "Soledad",
  "Hipersensibilidad",
  "Desaliento o desesperación",
  "Preocupación excesiva por los demás",
];

export const flores: Flor[] = [
  { slug: "rock-rose", es: "Heliantemo", en: "Rock Rose", grupo: "Miedo", img: img("rock-rose") },
  { slug: "mimulus", es: "Mímulo", en: "Mimulus", grupo: "Miedo", img: img("mimulus") },
  { slug: "cherry-plum", es: "Cerasífera", en: "Cherry Plum", grupo: "Miedo", img: img("cherry-plum") },
  { slug: "aspen", es: "Álamo Temblón", en: "Aspen", grupo: "Miedo", img: img("aspen") },
  { slug: "red-chestnut", es: "Castaño Rojo", en: "Red Chestnut", grupo: "Miedo", img: img("red-chestnut") },
  { slug: "cerato", es: "Ceratostigma", en: "Cerato", grupo: "Incertidumbre", img: img("cerato") },
  { slug: "scleranthus", es: "Escleranto", en: "Scleranthus", grupo: "Incertidumbre", img: img("scleranthus") },
  { slug: "gentian", es: "Genciana", en: "Gentian", grupo: "Incertidumbre", img: img("gentian") },
  { slug: "gorse", es: "Aulaga", en: "Gorse", grupo: "Incertidumbre", img: img("gorse") },
  { slug: "hornbeam", es: "Hojarazo", en: "Hornbeam", grupo: "Incertidumbre", img: img("hornbeam") },
  { slug: "wild-oat", es: "Avena Silvestre", en: "Wild Oat", grupo: "Incertidumbre", img: img("wild-oat") },
  { slug: "clematis", es: "Clemátide", en: "Clematis", grupo: "Falta de interés en el presente", img: img("clematis") },
  { slug: "honeysuckle", es: "Madreselva", en: "Honeysuckle", grupo: "Falta de interés en el presente", img: img("honeysuckle") },
  { slug: "wild-rose", es: "Rosa Silvestre", en: "Wild Rose", grupo: "Falta de interés en el presente", img: img("wild-rose") },
  { slug: "olive", es: "Olivo", en: "Olive", grupo: "Falta de interés en el presente", img: img("olive") },
  { slug: "white-chestnut", es: "Castaño de Indias", en: "White Chestnut", grupo: "Falta de interés en el presente", img: img("white-chestnut") },
  { slug: "mustard", es: "Mostaza", en: "Mustard", grupo: "Falta de interés en el presente", img: img("mustard") },
  { slug: "chestnut-bud", es: "Brote de Castaño", en: "Chestnut Bud", grupo: "Falta de interés en el presente", img: img("chestnut-bud") },
  { slug: "water-violet", es: "Violeta de Agua", en: "Water Violet", grupo: "Soledad", img: img("water-violet") },
  { slug: "impatiens", es: "Impaciencia", en: "Impatiens", grupo: "Soledad", img: img("impatiens") },
  { slug: "heather", es: "Brezo", en: "Heather", grupo: "Soledad", img: img("heather") },
  { slug: "agrimony", es: "Agrimonia", en: "Agrimony", grupo: "Hipersensibilidad", img: img("agrimony") },
  { slug: "centaury", es: "Centaura", en: "Centaury", grupo: "Hipersensibilidad", img: img("centaury") },
  { slug: "walnut", es: "Nogal", en: "Walnut", grupo: "Hipersensibilidad", img: img("walnut") },
  { slug: "holly", es: "Acebo", en: "Holly", grupo: "Hipersensibilidad", img: img("holly") },
  { slug: "larch", es: "Alerce", en: "Larch", grupo: "Desaliento o desesperación", img: img("larch") },
  { slug: "pine", es: "Pino", en: "Pine", grupo: "Desaliento o desesperación", img: img("pine") },
  { slug: "elm", es: "Olmo", en: "Elm", grupo: "Desaliento o desesperación", img: img("elm") },
  { slug: "sweet-chestnut", es: "Castaño Dulce", en: "Sweet Chestnut", grupo: "Desaliento o desesperación", img: img("sweet-chestnut") },
  { slug: "star-of-bethlehem", es: "Estrella de Belén", en: "Star of Bethlehem", grupo: "Desaliento o desesperación", img: img("star-of-bethlehem") },
  { slug: "willow", es: "Sauce", en: "Willow", grupo: "Desaliento o desesperación", img: img("willow") },
  { slug: "oak", es: "Roble", en: "Oak", grupo: "Desaliento o desesperación", img: img("oak") },
  { slug: "crab-apple", es: "Manzano Silvestre", en: "Crab Apple", grupo: "Desaliento o desesperación", img: img("crab-apple") },
  { slug: "chicory", es: "Achicoria", en: "Chicory", grupo: "Preocupación excesiva por los demás", img: img("chicory") },
  { slug: "vervain", es: "Verbena", en: "Vervain", grupo: "Preocupación excesiva por los demás", img: img("vervain") },
  { slug: "vine", es: "Vid", en: "Vine", grupo: "Preocupación excesiva por los demás", img: img("vine") },
  { slug: "beech", es: "Haya", en: "Beech", grupo: "Preocupación excesiva por los demás", img: img("beech") },
  { slug: "rock-water", es: "Agua de Roca", en: "Rock Water", grupo: "Preocupación excesiva por los demás", img: img("rock-water") },
];

export const rescueRemedy = {
  slug: "rescue-remedy",
  es: "Remedio de Rescate",
  en: "Rescue Remedy",
  mezcla: ["star-of-bethlehem", "rock-rose", "impatiens", "cherry-plum", "clematis"],
};
