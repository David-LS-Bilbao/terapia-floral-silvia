# 🚀 Guía de Despliegue a GitHub Pages

## Comandos para desplegar cambios

Ejecuta estos comandos desde el directorio `/home/david/projects/terapia-floral-silvia/web/`:

### 1️⃣ Compilar el sitio
```bash
cd /home/david/projects/terapia-floral-silvia/web
pnpm build
```

### 2️⃣ Desplegar a GitHub Pages
```bash
cd dist
git add -A
git commit -m "Deploy: $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
git push origin main
```

---

## 📝 Comandos completos en una línea

### Despliegue rápido (todo en uno):
```bash
cd /home/david/projects/terapia-floral-silvia/web && \
pnpm build && \
cd dist && \
git add -A && \
git commit -m "Deploy: $(date -u +'%Y-%m-%dT%H:%M:%SZ')" && \
git push origin main
```

### Despliegue con mensaje personalizado:
```bash
cd /home/david/projects/terapia-floral-silvia/web && \
pnpm build && \
cd dist && \
git add -A && \
git commit -m "Deploy: TU_MENSAJE_AQUI" && \
git push origin main
```

---

## 🔧 Primer despliegue o reinicio completo

Si necesitas reinicializar el repositorio desde cero (solo la primera vez o si hay problemas):

```bash
cd /home/david/projects/terapia-floral-silvia/web && \
pnpm build && \
cd dist && \
rm -rf .git && \
git init && \
git checkout -b main && \
git add -A && \
git commit -m "Deploy: Clean build - static files only" && \
git remote add origin https://github.com/terapias-naturales-silvia/terapias-naturales-silvia.github.io.git && \
git push -f origin main
```

---

## ✅ Verificar el despliegue

Después de desplegar, espera 1-2 minutos y verifica:

```bash
# Verificar que el sitio responde
curl -I https://terapias-naturales-silvia.github.io/

# Verificar archivo específico
curl -I https://terapias-naturales-silvia.github.io/google934188ed3087a580.html
```

O abre en el navegador:
- https://terapias-naturales-silvia.github.io/

---

## ⚠️ Notas importantes

1. **`.nojekyll` es crítico**: Asegúrate de que `/home/david/projects/terapia-floral-silvia/web/dist/.nojekyll` existe. Si no, créalo:
   ```bash
   touch /home/david/projects/terapia-floral-silvia/web/dist/.nojekyll
   ```

2. **El repositorio `dist` es independiente**: Los commits en `dist/` son diferentes a los del proyecto principal. Solo contiene archivos compilados.

3. **Caché de GitHub Pages**: Los cambios pueden tardar 1-2 minutos en verse reflejados debido a la caché CDN.

4. **URL del repositorio remoto**: 
   - Producción: `https://github.com/terapias-naturales-silvia/terapias-naturales-silvia.github.io.git`
   - Desarrollo: `git@github.com:David-LS-Bilbao/terapia-floral-silvia.git` (SSH)

---

## 🎯 Workflow típico

```bash
# 1. Hacer cambios en src/pages/ o src/components/
# 2. Probar localmente
pnpm dev

# 3. Compilar
pnpm build

# 4. Desplegar
cd dist
git add -A
git commit -m "Deploy: descripción de cambios"
git push origin main

# 5. Verificar en producción
# https://terapias-naturales-silvia.github.io/
```
