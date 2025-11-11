#!/bin/bash
cd /home/david/projects/terapia-floral-silvia/web

echo "Eliminando pnpm-lock.yaml..."
rm -f pnpm-lock.yaml

echo "Ejecutando pnpm install para regenerar lockfile..."
pnpm install

echo "Ejecutando build para verificar..."
pnpm build

echo "¡Completado!"