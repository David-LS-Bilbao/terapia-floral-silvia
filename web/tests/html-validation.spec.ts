
import { describe, it, expect, beforeAll } from 'vitest';
import { JSDOM } from 'jsdom';
import { getByRole, getAllByRole, queryAllByRole } from '@testing-library/dom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Utilidad para cargar archivos HTML del directorio dist/
 */
function loadHTMLFromDist(relativePath: string): Document {
  const distPath = path.join(__dirname, '..', 'dist', relativePath);
  
  if (!fs.existsSync(distPath)) {
    throw new Error(`HTML file not found: ${distPath}. Did you run 'npm run build'?`);
  }
  
  const html = fs.readFileSync(distPath, 'utf-8');
  const dom = new JSDOM(html);
  return dom.window.document;
}

/**
 * Obtiene todas las rutas HTML del directorio dist/
 */
function getAllHTMLFiles(dir: string, baseDir?: string): string[] {
  baseDir = baseDir || dir;
  const files: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllHTMLFiles(fullPath, baseDir));
    } else if (item === 'index.html' || item.endsWith('.html')) {
      const relativePath = path.relative(baseDir, fullPath);
      files.push(relativePath);
    }
  }
  
  return files;
}

describe('HTML Validation Tests', () => {
  const distDir = path.join(__dirname, '..', 'dist');
  let htmlFiles: string[] = [];

  beforeAll(() => {
    // Verificar que el directorio dist existe
    if (!fs.existsSync(distDir)) {
      throw new Error(
        'dist/ directory not found. Please run "npm run build" before running these tests.'
      );
    }
    
    // Obtener todos los archivos HTML
    htmlFiles = getAllHTMLFiles(distDir);
    
    if (htmlFiles.length === 0) {
      throw new Error('No HTML files found in dist/ directory.');
    }
  });

  describe('Canonical Links', () => {
    const expectedBaseURL = 'https://david-ls-bilbao.github.io/terapia-floral-silvia';

    it('should have at least one HTML file to test', () => {
      expect(htmlFiles.length).toBeGreaterThan(0);
    });

    it('all HTML files should contain canonical links with correct base URL', () => {
      const filesWithIssues: { file: string; issue: string }[] = [];
      
      htmlFiles.forEach((htmlFile) => {
        const document = loadHTMLFromDist(htmlFile);
        
        // Buscar el elemento link con rel="canonical"
        const canonicalLink = document.querySelector('link[rel="canonical"]');
        
        if (!canonicalLink) {
          filesWithIssues.push({ file: htmlFile, issue: 'Missing <link rel="canonical"> tag' });
          return;
        }
        
        const href = canonicalLink.getAttribute('href');
        
        if (!href) {
          filesWithIssues.push({ file: htmlFile, issue: 'Canonical link has no href attribute' });
          return;
        }
        
        if (!href.startsWith(expectedBaseURL)) {
          filesWithIssues.push({ 
            file: htmlFile, 
            issue: `Canonical href "${href}" does not start with "${expectedBaseURL}"` 
          });
        }
      });
      
      if (filesWithIssues.length > 0) {
        const errorMessage = filesWithIssues
          .map((item) => `\n  ${item.file}: ${item.issue}`)
          .join('');
        
        throw new Error(`Found canonical link issues:${errorMessage}`);
      }
      
      expect(filesWithIssues.length).toBe(0);
    });
  });

  describe('Image Alt Attributes', () => {
    // Probar con archivos específicos que sabemos que tienen imágenes
    const pagesToTest = [
      'hero-b/index.html',
      'servicios/index.html',
      'contacto/index.html',
    ];

    pagesToTest.forEach((htmlFile) => {
      it(`${htmlFile} should have non-empty alt attributes on all images`, () => {
        const htmlPath = path.join(distDir, htmlFile);
        
        // Saltar si el archivo no existe
        if (!fs.existsSync(htmlPath)) {
          console.warn(`Skipping ${htmlFile} - file not found`);
          return;
        }
        
        const document = loadHTMLFromDist(htmlFile);
        
        // Obtener todas las imágenes
        const images = document.querySelectorAll('img');
        
        // Debe haber al menos una imagen para que la prueba sea significativa
        expect(images.length, `${htmlFile} should contain at least one image`).toBeGreaterThan(0);
        
        // Verificar que todas las imágenes tengan atributo alt no vacío
        images.forEach((img, index) => {
          const alt = img.getAttribute('alt');
          const src = img.getAttribute('src');
          
          expect(
            alt,
            `Image #${index + 1} in ${htmlFile} (src="${src}") should have an alt attribute`
          ).not.toBeNull();
          
          expect(
            alt?.trim().length,
            `Image #${index + 1} in ${htmlFile} (src="${src}") should have a non-empty alt attribute`
          ).toBeGreaterThan(0);
        });
      });
    });

    // Test genérico para cualquier HTML en dist/
    it('all HTML files should have non-empty alt attributes on images', () => {
      const filesWithImages: { file: string; imageCount: number }[] = [];
      const filesWithMissingAlt: { file: string; issues: string[] }[] = [];
      
      htmlFiles.forEach((htmlFile) => {
        const document = loadHTMLFromDist(htmlFile);
        const images = document.querySelectorAll('img');
        
        if (images.length > 0) {
          filesWithImages.push({ file: htmlFile, imageCount: images.length });
          
          const issues: string[] = [];
          images.forEach((img, index) => {
            const alt = img.getAttribute('alt');
            const src = img.getAttribute('src') || 'unknown';
            
            if (!alt || alt.trim().length === 0) {
              issues.push(`Image #${index + 1} (src="${src}")`);
            }
          });
          
          if (issues.length > 0) {
            filesWithMissingAlt.push({ file: htmlFile, issues });
          }
        }
      });
      
      // Informe de diagnóstico
      if (filesWithImages.length === 0) {
        console.warn('No images found in any HTML files');
      }
      
      // La prueba falla si hay imágenes sin alt
      if (filesWithMissingAlt.length > 0) {
        const errorMessage = filesWithMissingAlt
          .map((item) => `\n  ${item.file}:\n    - ${item.issues.join('\n    - ')}`)
          .join('');
        
        throw new Error(
          `Found images with missing or empty alt attributes:${errorMessage}`
        );
      }
      
      // Si llegamos aquí, todas las imágenes tienen alt
      expect(filesWithMissingAlt.length).toBe(0);
    });
  });

  describe('H1 Heading Count', () => {
    it('should have pages to test after filtering redirects', () => {
      // Filtrar index.html porque es solo una redirección
      const pagesToTest = htmlFiles.filter(file => file !== 'index.html');
      expect(pagesToTest.length).toBeGreaterThan(0);
    });
    
    it('all pages should have exactly one H1 element', () => {
      // Filtrar index.html porque es solo una redirección
      const pagesToTest = htmlFiles.filter(file => file !== 'index.html');
      const problemPages: { file: string; h1Count: number; h1Text?: string }[] = [];
      
      pagesToTest.forEach((htmlFile) => {
        const document = loadHTMLFromDist(htmlFile);
        const h1Elements = document.querySelectorAll('h1');
        
        if (h1Elements.length !== 1) {
          const h1Text = h1Elements[0]?.textContent?.trim() || '';
          problemPages.push({
            file: htmlFile,
            h1Count: h1Elements.length,
            h1Text: h1Text.substring(0, 50) + (h1Text.length > 50 ? '...' : ''),
          });
        } else {
          // Verificar que el H1 tiene contenido
          const h1Text = h1Elements[0]?.textContent?.trim();
          if (!h1Text || h1Text.length === 0) {
            problemPages.push({
              file: htmlFile,
              h1Count: 1,
              h1Text: '(empty H1)',
            });
          }
        }
      });
      
      if (problemPages.length > 0) {
        const errorMessage = problemPages
          .map((p) => `  ${p.file}: ${p.h1Count} H1(s)${p.h1Text ? ' - "' + p.h1Text + '"' : ''}`)
          .join('\n');
        
        throw new Error(
          `Some pages don't have exactly one H1:\n${errorMessage}`
        );
      }
      
      expect(problemPages.length).toBe(0);
    });
  });

  describe('Accessibility with @testing-library/dom', () => {
    it('hero-b page should have accessible main heading', () => {
      const htmlPath = path.join(distDir, 'hero-b/index.html');
      
      if (!fs.existsSync(htmlPath)) {
        console.warn('Skipping hero-b test - file not found');
        return;
      }
      
      const document = loadHTMLFromDist('hero-b/index.html');
      
      // Usar @testing-library para buscar el heading principal
      const heading = getByRole(document.body, 'heading', { level: 1 });
      
      expect(heading).toBeTruthy();
      expect(heading.textContent).toContain('Flores de Bach');
    });

    it('pages should have navigation landmarks', () => {
      const samplePages = ['hero-b/index.html', 'servicios/index.html'];
      
      samplePages.forEach((htmlFile) => {
        const htmlPath = path.join(distDir, htmlFile);
        
        if (!fs.existsSync(htmlPath)) {
          console.warn(`Skipping ${htmlFile} - file not found`);
          return;
        }
        
        const document = loadHTMLFromDist(htmlFile);
        
        // Verificar que hay elementos de navegación
        const navElements = queryAllByRole(document.body, 'navigation');
        
        // Debe haber al menos un nav (puede haber más)
        expect(
          navElements.length,
          `${htmlFile} should have at least one navigation landmark`
        ).toBeGreaterThan(0);
      });
    });
  });
});
