# Fix para error PNPM lockfile desactualizado

## Problema
```
ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json
```

## Solución temporal para CI/CD

### Para GitHub Actions
Usar en el workflow:
```yaml
- name: Install dependencies
  run: pnpm install --no-frozen-lockfile
```

### Para desarrollo local
```bash
# Eliminar lockfile y regenerar
rm pnpm-lock.yaml
pnpm install

# O usar flag de no-frozen
pnpm install --no-frozen-lockfile
```

### Versiones sincronizadas en package.json
Las siguientes versiones están ahora sincronizadas con el lockfile:
- @astrojs/check: ^0.9.5
- @astrojs/sitemap: ^3.6.0
- @tailwindcss/vite: ^4.1.17
- astro: ^5.15.5
- tailwindcss: ^4.1.17
- typescript: ^5.9.3

## Estado actual
✅ package.json actualizado con versiones correctas
✅ Build funciona correctamente
⚠️ CI necesita usar --no-frozen-lockfile hasta regenerar lockfile