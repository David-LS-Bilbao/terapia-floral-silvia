# SEO y Analytics - Configuración

## 📊 Google Analytics 4

### Configuración

1. **Obtener tu ID de medición:**
   - Visita [Google Analytics](https://analytics.google.com/)
   - Crea una cuenta y una propiedad GA4
   - Ve a Admin → Flujos de datos → Selecciona tu sitio web
   - Copia el **ID de medición** (formato: `G-XXXXXXXXXX`)

2. **Configurar en el proyecto:**
   ```bash
   # Crear archivo .env en /web/
   cp .env.example .env
   
   # Editar .env y añadir tu ID
   PUBLIC_GA_MEASUREMENT_ID=G-TU-ID-AQUI
   ```

3. **El componente Analytics** (`src/components/Analytics.astro`):
   - Solo se carga en **producción** (no en desarrollo local)
   - Incluye `anonymize_ip: true` para privacidad
   - Compatible con cookies SameSite y Secure

### Verificar instalación

```bash
# Build de producción
pnpm build

# Preview local del build
pnpm preview

# Abrir DevTools → Network → Buscar "gtag" o "analytics"
```

En producción, verifica:
- [ ] El script de Google Tag se carga
- [ ] Se envía el evento `page_view`
- [ ] Aparece tráfico en Google Analytics (puede tardar 24-48h)

---

## 🔍 SEO Mejorado

### Componente SEO (`src/components/SEO.astro`)

Incluye automáticamente:

#### Meta Tags Básicos
- `<title>` y descripción
- Keywords relevantes
- Canonical URL (evita contenido duplicado)
- Robots (control de indexación)

#### Open Graph (Facebook, LinkedIn)
- `og:title`, `og:description`, `og:image`
- `og:type` (website o article)
- Dimensiones de imagen (1200x630)
- Locale (es_ES)

#### Twitter Cards
- `twitter:card` (summary_large_image)
- Metadatos específicos para Twitter

#### Geolocalización
- `geo.region`: ES-PV (País Vasco)
- `geo.placename`: Valle de Mena, Bizkaia
- Coordenadas GPS para SEO local

#### Schema.org (Datos estructurados)
Tipo: `LocalBusiness`
- Información de contacto (teléfono, email)
- Dirección y coordenadas
- Horarios de apertura
- Rango de precios
- Servicios ofrecidos con precios
- Redes sociales (sameAs)
- Información del fundador

### Uso en páginas

```astro
---
import Base from "../layouts/Base.astro";
---

<Base
  title="Título de la página | Marca"
  description="Descripción concisa y atractiva (150-160 caracteres)"
  keywords="palabra1, palabra2, palabra3"
  image="/ruta/a/imagen-og.jpg"
  type="website"
>
  <!-- Contenido -->
</Base>
```

### Páginas optimizadas

- ✅ **hero-b.astro** (Home): SEO para landing principal
- ✅ **contacto.astro**: Keywords de contacto local
- ✅ **flores/index.astro**: Catálogo de flores de Bach
- ✅ **mindfulness.astro**: Servicio de mindfulness
- 🔜 **tarifas.astro**: Precios y servicios
- 🔜 **bioneuroemocion.astro**: Servicio específico
- 🔜 **servicios.astro**: Página de servicios general

---

## 🎯 Buenas Prácticas SEO

### Títulos de página
- **Longitud**: 50-60 caracteres
- **Formato**: `Título principal | Nombre marca`
- **Incluir**: Palabra clave principal al inicio

### Descripciones
- **Longitud**: 150-160 caracteres
- **Call-to-action**: Incluir acción (contacta, descubre, aprende)
- **Únicos**: Cada página debe tener descripción diferente

### Keywords
- **Cantidad**: 5-10 palabras clave relevantes
- **Específicas**: Palabras long-tail (frases de 2-3 palabras)
- **Locales**: Incluir ubicación (Bizkaia, Valle de Mena)

### Imágenes Open Graph
- **Dimensiones**: 1200x630 px
- **Formato**: JPG o PNG
- **Peso**: < 1MB
- **Contenido**: Logo + texto descriptivo

---

## 📈 Monitoreo y Herramientas

### Google Search Console
1. Verificar propiedad del sitio
2. Enviar sitemap.xml: `https://tu-sitio.com/sitemap-index.xml`
3. Monitorear:
   - Rendimiento de búsqueda
   - Cobertura de indexación
   - Experiencia de página (Core Web Vitals)

### Pruebas de SEO

```bash
# Validar Schema.org
https://validator.schema.org/

# Test de Rich Results
https://search.google.com/test/rich-results

# Open Graph Debugger
https://developers.facebook.com/tools/debug/

# Twitter Card Validator
https://cards-dev.twitter.com/validator
```

### Lighthouse (Performance & SEO)

```bash
# Build y análisis
pnpm build
pnpm preview

# Abrir Chrome DevTools → Lighthouse
# Ejecutar análisis en categorías: Performance, SEO, Accessibility
```

Objetivos:
- **Performance**: > 90
- **SEO**: > 95
- **Accessibility**: > 90
- **Best Practices**: > 90

---

## 🔐 Privacidad y GDPR

### Componente Analytics
- ✅ IP anónimas (`anonymize_ip: true`)
- ✅ Cookies seguras (`SameSite=None;Secure`)
- ✅ Solo en producción (respeta entorno local)

### Consentimiento de cookies
El sitio incluye `CookieConsent.astro` que:
- Informa sobre uso de cookies
- Permite aceptar/rechazar
- Se guarda preferencia en localStorage

**Nota**: Para cumplimiento total GDPR, considera:
- Política de cookies actualizada
- Opt-in antes de cargar Analytics
- Integración con gestor de consentimiento (e.g., Cookiebot)

---

## 🚀 Próximos pasos

### Optimizaciones adicionales
- [ ] Añadir breadcrumbs con Schema.org
- [ ] Implementar Article schema para blog posts
- [ ] Generar páginas AMP (opcional)
- [ ] Añadir hreflang para multiidioma (futuro)

### Contenido
- [ ] Crear blog para contenido SEO
- [ ] Añadir FAQ con schema FAQPage
- [ ] Testimonios con schema Review

### Analytics avanzado
- [ ] Configurar eventos personalizados (clics WhatsApp, formularios)
- [ ] Google Tag Manager para gestión de tags
- [ ] Integrar Microsoft Clarity (mapas de calor)

---

## 📚 Recursos

- [Google Analytics 4 Docs](https://support.google.com/analytics/answer/9304153)
- [Schema.org LocalBusiness](https://schema.org/LocalBusiness)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Guide](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Google Search Central](https://developers.google.com/search)
