#!/usr/bin/env node
// Script para verificar archivos multimedia requeridos
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, 'public');

// Archivos críticos que deben existir
const requiredFiles = [
  // Videos y posters
  'media/Mindfulness_Resumen-poster.jpg',
  'media/Mindfulness_Resumen.webm',
  'media/Mindfulness_Resumen-optimized.mp4',
  'media/Mindfulness_Terapias-poster.jpg',
  'media/Mindfulness_Terapias.webm',
  'media/Mindfulness_Terapias-optimized.mp4',
  'media/Terapia_Floral_de_Bach-poster.jpg',
  'media/Terapia_Floral_de_Bach.webm',
  'media/Terapia_Floral_de_Bach-optimized.mp4',
  
  // Imágenes principales
  'home/servicio-mindfulness.webp',
  'brand/logo-lotus.png',
  'brand/logo3d-64.webp',
  'silvia.png',
  
  // Iconos
  'icon-192.png',
  'maskable-512.png',
  'og-image-1200x630.png',
];

console.log('🔍 Verificando archivos multimedia...\n');

let missing = [];
let found = [];

for (const file of requiredFiles) {
  const fullPath = join(publicDir, file);
  if (existsSync(fullPath)) {
    found.push(file);
    console.log(`✅ ${file}`);
  } else {
    missing.push(file);
    console.log(`❌ FALTA: ${file}`);
  }
}

console.log(`\n📊 Resumen:`);
console.log(`✅ Encontrados: ${found.length}`);
console.log(`❌ Faltantes: ${missing.length}`);

if (missing.length > 0) {
  console.log(`\n🚨 Archivos faltantes:`);
  missing.forEach(file => console.log(`   - ${file}`));
  process.exit(1);
} else {
  console.log(`\n🎉 ¡Todos los archivos multimedia están presentes!`);
}