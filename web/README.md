# 🌸 Terapia Floral Silvia Adame

> Sitio web oficial de **Silvia Adame** - Especialista en Terapia Floral de Bach, Mindfulness y Bioneuroemoción®

[![Deploy to GitHub Pages](https://github.com/terapias-naturales-silvia/terapias-naturales-silvia.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/terapias-naturales-silvia/terapias-naturales-silvia.github.io/actions/workflows/deploy.yml)
[![Tests](https://img.shields.io/badge/Tests-Vitest%20%2B%20Playwright-success?logo=checkmarx&logoColor=white)](https://github.com/terapias-naturales-silvia/terapias-naturales-silvia.github.io/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-222222?logo=github&logoColor=white)](https://terapias-naturales-silvia.github.io/)
[![Astro](https://img.shields.io/badge/Built%20with-Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

## 🌟 Acerca del Proyecto

Sitio web profesional para **Silvia Adame**, terapeuta especializada en:
- 🌼 **Terapia Floral de Bach** - 38 esencias florales para el equilibrio emocional
- 🧘‍♀️ **Mindfulness y Gestión Emocional** - Técnicas de atención plena y reducción del estrés
- 🧠 **Bioneuroemoción®** - Comprensión del origen emocional de los síntomas

### ✨ Características

- **Responsive Design** - Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Rendimiento Optimizado** - Construido con Astro para carga ultra-rápida
- **Accesibilidad** - Cumple estándares WCAG para accesibilidad web
- **SEO Optimizado** - Meta tags, schema markup y sitemap incluidos
- **Catálogo Completo** - Información detallada de las 38 Flores de Bach
- **Página de Tarifas** - Precios transparentes de sesiones y bonos
- **Integración WhatsApp** - Contacto directo para reservar citas
- **Menú Móvil Mejorado** - Navegación fluida en dispositivos móviles

## 🚀 Demo en Vivo

🔗 **[https://terapias-naturales-silvia.github.io/](https://terapias-naturales-silvia.github.io/)**

## �️ Tecnologías Utilizadas

- **[Astro 5.15.5](https://astro.build)** - Framework web moderno y rápido
- **[Tailwind CSS 4.1.17](https://tailwindcss.com)** - Framework CSS utility-first
- **[TypeScript](https://www.typescriptlang.org)** - Tipado estático para JavaScript
- **[Vite](https://vitejs.dev)** - Build tool rápido y moderno
- **[Vitest](https://vitest.dev)** - Framework de testing
- **[Playwright](https://playwright.dev)** - Testing end-to-end

## 📁 Estructura del Proyecto

```text
terapia-floral-silvia/
├── web/                          # Proyecto principal
│   ├── public/                   # Archivos estáticos
│   │   ├── brand/               # Logos y elementos de marca
│   │   ├── flores/              # Imágenes de las flores de Bach
│   │   ├── home/                # Imágenes del hero/inicio
│   │   └── media/               # Videos y multimedia
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── ContactInline.astro
│   │   │   ├── CookieConsent.astro
│   │   │   ├── Logo.astro
│   │   │   ├── Nav.astro
│   │   │   ├── SocialLinks.astro
│   │   │   └── WhoAmI.astro
│   │   ├── data/
│   │   │   └── flores.ts        # Datos de las 38 Flores de Bach
│   │   ├── layouts/
│   │   │   └── Base.astro       # Layout principal
│   │   ├── lib/                 # 🆕 Funciones helper utilities
│   │   │   ├── url.ts           # Utilidades de URL y paths
│   │   │   ├── utils.ts         # Utilidades generales
│   │   │   └── README.md        # Documentación de utilidades
│   │   ├── pages/               # Páginas del sitio
│   │   │   ├── flores/          # Catálogo de flores
│   │   │   ├── legal/           # Páginas legales
│   │   │   ├── bioneuroemocion.astro
│   │   │   ├── contacto.astro
│   │   │   ├── hero-b.astro     # Página principal (landing)
│   │   │   ├── index.astro      # Redirección
│   │   │   ├── mindfulness-gestion-emocional.astro
│   │   │   ├── mindfulness.astro
│   │   │   ├── que-es.astro
│   │   │   ├── servicios.astro
│   │   │   └── tarifas.astro    # Precios y servicios
│   │   └── styles/
│   │       └── global.css       # Estilos globales y animaciones
│   ├── tests/                   # Tests automatizados
│   │   ├── lib/                 # 🆕 Tests de utilidades
│   │   │   ├── url.spec.ts      # Tests para url.ts (13 tests)
│   │   │   └── utils.spec.ts    # Tests para utils.ts (25 tests)
│   │   ├── e2e.spec.ts          # Tests end-to-end
│   │   ├── smoke.spec.ts        # Tests de humo
│   │   └── url.spec.ts          # Tests básicos de URL
│   └── tools/                   # Herramientas de desarrollo
└── README.md
```

## 🧞 Comandos de Desarrollo

Todos los comandos se ejecutan desde el directorio `/web/`:

| Comando | Acción |
| :------ | :----- |
| `pnpm install` | Instala las dependencias |
| `pnpm dev` | Inicia el servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Construye el sitio para producción en `./dist/` |
| `pnpm preview` | Vista previa del build local |
| `pnpm test` | Ejecuta tests unitarios con Vitest (43 tests) |
| `pnpm test:e2e` | Ejecuta tests end-to-end con Playwright |
| `pnpm test tests/lib/` | Ejecuta solo tests de utilidades helper |

## 🧪 Testing

El proyecto incluye testing automatizado completo:

### Tests Unitarios (Vitest)
- **43 tests en total** - Todos pasando ✅
- `tests/lib/url.spec.ts` - 13 tests para utilidades de URL
- `tests/lib/utils.spec.ts` - 25 tests para utilidades generales
- `tests/smoke.spec.ts` - 3 tests de verificación básica
- `tests/url.spec.ts` - 2 tests de normalización de URLs

### Tests End-to-End (Playwright)
- **60 tests E2E en total** - Cobertura completa ✅
- `tests/e2e-home.spec.ts` - 10 tests para página principal (hero-b)
- `tests/e2e-contact.spec.ts` - 22 tests para página de contacto
- `tests/e2e-sitemap-robots.spec.ts` - 13 tests para SEO (sitemap.xml, robots.txt)
- `tests/e2e-404.spec.ts` - 15 tests para página 404 personalizada

**Ver documentación completa:** [`tests/E2E_TESTS_README.md`](tests/E2E_TESTS_README.md)

### Cobertura
- ✅ Funciones helper (URL building, slug normalization, email validation)
- ✅ Edge cases (empty strings, special characters, múltiples slashes)
- ✅ Boundary conditions (exact length, single character)
- ✅ Real-world scenarios (flower names, email formats)
- ✅ Navegación y flujos de usuario (home → contacto → tarifas)
- ✅ Enlaces externos (WhatsApp, mailto, redes sociales)
- ✅ SEO (sitemap, robots.txt, meta tags, schema markup)
- ✅ Responsive design (móvil, tablet, desktop)
- ✅ Error handling (página 404 personalizada)

## 🚀 Deploy Automático

El sitio se despliega automáticamente en **GitHub Pages** mediante GitHub Actions cuando se hace push a la rama `master`.

### Configuración de Deploy

- **Plataforma**: GitHub Pages
- **Trigger**: Push to `master`
- **Build**: `pnpm build`
- **Base URL**: `/terapia-floral-silvia/`

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: `#3B755F` (Verde sage)
- **Secundario**: `#9FB8AD` (Verde claro)
- **Acento**: `#C77DFF` (Lavanda)
- **Neutro**: `#0B1220` (Azul oscuro)

### Tipografías
- **Títulos**: Fraunces (Serif moderna)
- **Texto**: Inter (Sans-serif limpia)

### Características UX
- **Navegación intuitiva** con menú responsive
- **Menú móvil mejorado** con overlay y animaciones suaves
- **Hero landing optimizado** con imagen de fondo y texto legible
- **Animaciones suaves** de scroll reveal
- **Carga progresiva** de imágenes
- **Botones de acción claros** (WhatsApp, contacto, tarifas)
- **Enlaces externos** seguros (`rel="noopener"`)

## 💰 Servicios y Tarifas

- **Sesión Individual**: 58€ (Flores de Bach, Mindfulness o Combinada)
- **Bono 4 Sesiones**: 195€ (48,75€/sesión)
- **Esencias Florales**: 12€ (envío incluido)
- **Primera consulta gratuita**: 15 minutos por teléfono/WhatsApp

## 📱 Redes Sociales

- **Facebook**: [silvia.adame.129](https://www.facebook.com/silvia.adame.129)
- **Instagram**: [@silviyou8](https://www.instagram.com/silviyou8/)
- **TikTok**: [@silviaad219](https://www.tiktok.com/@silviaad219)

## 📧 Contacto Profesional

- **WhatsApp**: +34 687 235 652
- **Email**: biomiflor@hotmail.com
- **Ubicación**: Valle de Mena, Bizkaia (Presencial y Online)

## 👨‍💻 Desarrollado por

**David López-Sotelo**
- **Email**: [lopezsotelo77@gmail.com](mailto:lopezsotelo77@gmail.com)
- **GitHub**: [@David-LS-Bilbao](https://github.com/David-LS-Bilbao)

---

## 📄 Licencia

© 2025 Terapia Floral Silvia Adame. Todos los derechos reservados.

> **Nota**: Este sitio web está diseñado específicamente para servicios de terapia natural y bienestar emocional. El contenido es informativo y no sustituye el consejo médico profesional.
