# 🌸 Terapia Floral Silvia Adame

> Sitio web oficial de **Silvia Adame** - Especialista en Terapia Floral de Bach, Mindfulness y Bioneuroemoción®

[![Deploy to GitHub Pages](https://github.com/David-LS-Bilbao/terapia-floral-silvia/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/David-LS-Bilbao/terapia-floral-silvia/actions)
[![Astro](https://img.shields.io/badge/Built%20with-Astro-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

## 🌟 Acerca del Proyecto

Sitio web profesional para **Silvia Adame**, terapeuta especializada en:
- 🌼 **Terapia Floral de Bach** - 38 esencias florales para el equilibrio emocional
- 🧘‍♀️ **Mindfulness** - Técnicas de atención plena y gestión emocional
- 🧠 **Bioneuroemoción®** - Comprensión del origen emocional de los síntomas

### ✨ Características

- **Responsive Design** - Optimizado para todos los dispositivos
- **Rendimiento Optimizado** - Construido con Astro para carga ultra-rápida
- **Accesibilidad** - Cumple estándares WCAG para accesibilidad web
- **SEO Optimizado** - Meta tags, schema markup y sitemap incluidos
- **Catálogo Completo** - Información detallada de las 38 Flores de Bach
- **Integración Multimedia** - Videos explicativos y animaciones suaves
- **Formulario de Contacto** - Enlaces directos a WhatsApp y redes sociales

## 🚀 Demo en Vivo

🔗 **[https://david-ls-bilbao.github.io/terapia-floral-silvia/](https://david-ls-bilbao.github.io/terapia-floral-silvia/)**

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
│   │   │   ├── Logo.astro
│   │   │   ├── Nav.astro
│   │   │   ├── SocialLinks.astro
│   │   │   └── WhoAmI.astro
│   │   ├── data/
│   │   │   └── flores.ts        # Datos de las 38 Flores de Bach
│   │   ├── layouts/
│   │   │   └── Base.astro       # Layout principal
│   │   ├── pages/               # Páginas del sitio
│   │   │   ├── flores/          # Catálogo de flores
│   │   │   ├── legal/           # Páginas legales
│   │   │   ├── bioneuroemocion.astro
│   │   │   ├── contacto.astro
│   │   │   ├── hero-b.astro     # Página principal
│   │   │   ├── index.astro      # Redirección
│   │   │   ├── mindfulness.astro
│   │   │   ├── que-es.astro
│   │   │   └── servicios.astro
│   │   └── styles/
│   │       └── global.css       # Estilos globales y animaciones
│   ├── tests/                   # Tests automatizados
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
| `pnpm test` | Ejecuta tests unitarios con Vitest |
| `pnpm test:e2e` | Ejecuta tests end-to-end con Playwright |

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
- **Navegación intuitiva** con breadcrumbs
- **Animaciones suaves** de scroll reveal
- **Carga progresiva** de imágenes
- **Formularios accesibles**
- **Enlaces externos** seguros (`rel="noopener"`)

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
