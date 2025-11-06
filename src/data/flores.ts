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
  breve?: string;      // 1–2 líneas para tarjetas/listado
  detalle?: string;    // texto largo para la ficha
}


// Usaremos SVG placeholder. Luego reemplazaré por .webp reales sin tocar el código.
const img = (slug: string) => `flores/${slug}.svg`;

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
  // 1) Miedo
{
  slug: "rock-rose",
  es: "Heliantemo",
  en: "Rock Rose",
  grupo: "Miedo",
  img: "flores/rock-rose.webp.png",
  breve: "Para pánico o terror agudo; aporta calma y valentía en crisis.",
  detalle: `Para estados de pánico o terror extremo (emergencias, sustos intensos, pesadillas que paralizan).
Ayuda a recuperar la calma, la presencia de ánimo y el valor para actuar con claridad ante el peligro.`
},
{
  slug: "mimulus",
  es: "Mímulo",
  en: "Mimulus",
  grupo: "Miedo",
  img: "flores/mimulus.webp.png",
  breve: "Para miedos concretos y cotidianos; fomenta una valentía tranquila.",
  detalle: `Indicado cuando hay miedos específicos (dentista, hablar en público, enfermedad, crítica…),
timidez y sensibilidad elevada. Favorece la confianza para afrontar esas situaciones con serenidad.`
},
{
  slug: "cherry-plum",
  es: "Cerasífera",
  en: "Cherry Plum",
  grupo: "Miedo",
  img: "flores/cherry-plum.webp.png",
  breve: "Para el temor a perder el control; trae serenidad y autocontrol.",
  detalle: `Para tensión mental extrema, impulsos que asustan o miedo a “perder la cabeza”.
Aporta equilibrio, claridad y dominio interior incluso bajo presión.`
},
{
  slug: "aspen",
  es: "Álamo Temblón",
  en: "Aspen",
  grupo: "Miedo",
  img: "flores/aspen.png",
  breve: "Para miedos vagos o inexplicables; aporta seguridad y paz.",
  detalle: `Miedos indefinidos, aprensión sin causa, escalofríos, inquietud nocturna o sensación de “algo va a pasar”.
Facilita una confianza interna serena frente a lo desconocido.`
},
{
  slug: "red-chestnut",
  es: "Castaño Rojo",
  en: "Red Chestnut",
  grupo: "Miedo",
  img: "flores/red-chestnut.png",
  breve: "Para la preocupación excesiva por los demás; favorece confianza y calma.",
  detalle: `Ansiedad constante por el bienestar de seres queridos, tendencia a imaginar lo peor.
Ayuda a cuidar con serenidad, enviando pensamientos de seguridad y respeto por la autonomía del otro.`
},

  // 2) Incertidumbre
{
  slug: "cerato",
  es: "Ceratostigma",
  en: "Cerato",
  grupo: "Incertidumbre",
  img: "flores/cerato.png",
  breve: "Duda de su propio juicio; busca validación constante.",
  detalle: `Para quienes, aun siendo capaces, desconfían de su criterio y preguntan a otros a cada paso. 
Ayuda a escuchar y seguir la intuición, sosteniendo decisiones con seguridad tranquila.`
},
{
  slug: "scleranthus",
  es: "Escleranto",
  en: "Scleranthus",
  grupo: "Incertidumbre",
  img: "flores/scleranthus.png",
  breve: "Indecisión entre opciones; vaivenes de ánimo/energía.",
  detalle: `Para la oscilación interna (sí/no) y cambios de humor o energía que dificultan elegir. 
Favorece equilibrio, concentración y una decisión clara sin dudas intermitentes.`
},
{
  slug: "gentian",
  es: "Genciana",
  en: "Gentian",
  grupo: "Incertidumbre",
  img: "flores/gentian.png",
  breve: "Desánimo tras contratiempos; se pierde la fe enseguida.",
  detalle: `Cuando un tropiezo desmoraliza y aparece el pesimismo. 
Aporta perseverancia, realismo y ánimo para seguir avanzando paso a paso.`
},
{
  slug: "gorse",
  es: "Aulaga",
  en: "Gorse",
  grupo: "Incertidumbre",
  img: "flores/gorse.png",
  breve: "Desesperanza/fatalismo: “ya no hay nada que hacer”.",
  detalle: `Para la resignación y la visión sombría del futuro. 
Reaviva la esperanza y la apertura a nuevas posibilidades: “lo intentaré una vez más”.`
},
{
  slug: "hornbeam",
  es: "Hojarazo",
  en: "Hornbeam",
  grupo: "Incertidumbre",
  img: "flores/hornbeam.png",
  breve: "Cansancio mental al empezar (síndrome del lunes).",
  detalle: `Sensación de falta de fuerzas antes de iniciar tareas que luego sí se pueden hacer. 
Devuelve frescura mental, ganas y agilidad para arrancar sin postergar.`
},
{
  slug: "wild-oat",
  es: "Avena Silvestre",
  en: "Wild Oat",
  grupo: "Incertidumbre",
  img: "flores/wildoat.png",
  breve: "Indecisión vocacional y falta de rumbo; aporta claridad de propósito.",
  detalle: `Para personas capaces con muchos intereses que no encuentran una dirección definida.
Genera insatisfacción, probar sin comprometerse y sensación de no encajar. 
Ayuda a reconocer la propia vocación, enfocar la energía y comprometerse con un camino que dé sentido.`
},

  // 3) Falta de interés en el presente
{
  slug: "clematis",
  es: "Clemátide",
  en: "Clematis",
  grupo: "Falta de interés en el presente",
  img: "flores/clematis.png",
  breve: "Soñar despierto, vivir en el futuro; ayuda a anclarte al presente.",
  detalle: `Para quienes viven más en la fantasía que en el “aquí y ahora”, con distracción, letargo o desinterés por la realidad.
Ayuda a enfocarse, a manifestar los ideales en acciones concretas y a disfrutar del presente.`
},
{
  slug: "honeysuckle",
  es: "Madreselva",
  en: "Honeysuckle",
  grupo: "Falta de interés en el presente",
  img: "flores/honeysuckle.png",
  breve: "Nostalgia y apego al pasado; facilita avanzar y valorar el presente.",
  detalle: `Para quienes viven anclados en los recuerdos o en lo que “pudo haber sido”, con melancolía y resistencia al cambio.
Permite integrar lo vivido sin quedar atrapado en ello y abrirse a crear nuevos recuerdos hoy.`
},
{
  slug: "wild-rose",
  es: "Rosa Silvestre",
  en: "Wild Rose",
  grupo: "Falta de interés en el presente",
  img: img("wild-rose"),
  breve: "Apatía y resignación; devuelve interés y motivación vital.",
  detalle: `Para la indiferencia pasiva y la renuncia silenciosa a mejorar la situación.
Revitaliza la voluntad, la iniciativa y la participación activa en la propia vida.`
},
{
  slug: "olive",
  es: "Olivo",
  en: "Olive",
  grupo: "Falta de interés en el presente",
  img: "flores/olive.png",
  breve: "Agotamiento total cuerpo-mente; restaura la energía vital.",
  detalle: `Tras largos esfuerzos o convalecencias cuando “no queda gasolina” para nada.
Ayuda a recuperar fuerzas profundas, descanso reparador y disfrute de la vida.`
},
  {
  slug: "white-chestnut",
  es: "Castaño de Indias",
  en: "White Chestnut",
  grupo: "Falta de interés en el presente",
  img: "flores/white-chestnut.png",
  breve: "Pensamientos repetitivos/rumiación; aporta calma y claridad mental.",
  detalle: `Para el parloteo mental incesante y los pensamientos que dan vueltas sin parar, 
dificultando concentrarse o dormir. Ayuda a ordenar la mente, aquietar las ideas intrusivas 
y recuperar paz y enfoque interior.`
},
{
  slug: "mustard",
  es: "Mostaza",
  en: "Mustard",
  grupo: "Falta de interés en el presente",
  img: "flores/mostaza.png",
  breve: "Tristeza profunda que aparece sin causa; devuelve serenidad y alegría.",
  detalle: `Para la melancolía súbita, como una “nube negra” que llega sin motivo aparente 
y apaga la ilusión. Facilita atravesar el episodio con calma, devolviendo luz interior 
y estabilidad emocional que no depende de las circunstancias.`
},
{
  slug: "chestnut-bud",
  es: "Brote de Castaño",
  en: "Chestnut Bud",
  grupo: "Falta de interés en el presente",
  img: "flores/Brote de Castaño (Chestnut Bud).png",
  breve: "Cuesta aprender de la experiencia; ayuda a integrar lecciones.",
  detalle: `Para quien repite los mismos errores por falta de observación o reflexión. 
Favorece la atención consciente, el aprendizaje a partir de lo vivido (propio y ajeno) 
y la transformación de la experiencia en sabiduría práctica.`
}
,

  // 4) Soledad
{
  slug: "water-violet",
  es: "Violeta de Agua",
  en: "Water Violet",
  grupo: "Soledad",
  img: "flores/Violeta de Agua (Water Violet).png",
  breve: "Reservado y autosuficiente; ayuda a abrirse y conectar con humildad.",
  detalle: `Para quienes prefieren estar solos y pueden volverse distantes o altivos.
Facilita mantener la calma y dignidad, a la vez que fomenta la cercanía, la empatía
y la capacidad de pedir/aceptar ayuda cuando hace falta.`, // :contentReference[oaicite:0]{index=0}
},
{
  slug: "impatiens",
  es: "Impaciencia",
  en: "Impatiens",
  grupo: "Soledad",
  img: "flores/impaciencia.png",
  breve: "Prisa e irritabilidad ante la lentitud ajena; aporta calma y tolerancia.",
  detalle: `Para rapidez mental/física, tensión nerviosa y poca paciencia con ritmos lentos.
Transforma la irritabilidad en amabilidad y el apremio interno en un fluir sereno,
permitiendo trabajar eficiente pero sin agresividad.`, // :contentReference[oaicite:1]{index=1}
},
{
  slug: "heather",
  es: "Brezo",
  en: "Heather",
  grupo: "Soledad",
  img: "flores/Brezo (Heather).png",
  breve: "Necesidad constante de hablar de sí; favorece escucha y empatía.",
  detalle: `Para el egocentrismo conversacional y el temor a la soledad que impulsa
a buscar atención continua. Desarrolla la capacidad de escuchar y compartir en equilibrio,
conectando genuinamente con los demás.`, // :contentReference[oaicite:2]{index=2}
}
,

  // 5) Hipersensibilidad
  { slug: "agrimony", es: "Agrimonia", en: "Agrimony", grupo: "Hipersensibilidad", img: img("agrimony") },
  { slug: "centaury", es: "Centaura", en: "Centaury", grupo: "Hipersensibilidad", img: img("centaury") },
  { slug: "walnut", es: "Nogal", en: "Walnut", grupo: "Hipersensibilidad", img: img("walnut") },
  { slug: "holly", es: "Acebo", en: "Holly", grupo: "Hipersensibilidad", img: img("holly") },

  // 6) Desaliento o desesperación
  { slug: "larch", es: "Alerce", en: "Larch", grupo: "Desaliento o desesperación", img: img("larch") },
  { slug: "pine", es: "Pino", en: "Pine", grupo: "Desaliento o desesperación", img: img("pine") },
  { slug: "elm", es: "Olmo", en: "Elm", grupo: "Desaliento o desesperación", img: img("elm") },
  { slug: "sweet-chestnut", es: "Castaño Dulce", en: "Sweet Chestnut", grupo: "Desaliento o desesperación", img: img("sweet-chestnut") },
  { slug: "star-of-bethlehem", es: "Estrella de Belén", en: "Star of Bethlehem", grupo: "Desaliento o desesperación", img: img("star-of-bethlehem") },
  { slug: "willow", es: "Sauce", en: "Willow", grupo: "Desaliento o desesperación", img: img("willow") },
  { slug: "oak", es: "Roble", en: "Oak", grupo: "Desaliento o desesperación", img: img("oak") },
  { slug: "crab-apple", es: "Manzano Silvestre", en: "Crab Apple", grupo: "Desaliento o desesperación", img: img("crab-apple") },

  // 7) Preocupación excesiva por los demás
  { slug: "chicory", es: "Achicoria", en: "Chicory", grupo: "Preocupación excesiva por los demás", img: img("chicory") },
  { slug: "vervain", es: "Verbena", en: "Vervain", grupo: "Preocupación excesiva por los demás", img: img("vervain") },
  { slug: "vine", es: "Vid", en: "Vine", grupo: "Preocupación excesiva por los demás", img: img("vine") },
  { slug: "beech", es: "Haya", en: "Beech", grupo: "Preocupación excesiva por los demás", img: img("beech") },
  { slug: "rock-water", es: "Agua de Roca", en: "Rock Water", grupo: "Preocupación excesiva por los demás", img: img("rock-water") },
];

// (Opcional) Rescue Remedy, por si lo quieres mostrar aparte
export const rescueRemedy = {
  slug: "rescue-remedy",
  es: "Remedio de Rescate",
  en: "Rescue Remedy",
  mezcla: ["star-of-bethlehem", "rock-rose", "impatiens", "cherry-plum", "clematis"],
};
