import { describe, it, expect, beforeAll } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Tests para el componente de navegación (Nav.astro)
 * Valida tanto la navegación desktop como el menú móvil
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

describe('Navigation Component Tests', () => {
  const distDir = path.join(__dirname, '..', 'dist');
  let document: Document;

  beforeAll(() => {
    if (!fs.existsSync(distDir)) {
      throw new Error('dist/ directory not found. Please run "npm run build" before running these tests.');
    }
    
    // Cargar una página de ejemplo para probar el nav
    document = loadHTMLFromDist('hero-b/index.html');
  });

  describe('Desktop Navigation', () => {
    it('should have a navigation element with aria-label', () => {
      const nav = document.querySelector('nav[aria-label="Principal"]');
      expect(nav, 'Desktop navigation should exist').toBeTruthy();
    });

    it('should contain all main navigation links', () => {
      const expectedLinks = ['Inicio', 'Servicios', 'Tarifas', 'Contacto'];
      const nav = document.querySelector('nav[aria-label="Principal"]');
      
      expect(nav).toBeTruthy();
      
      expectedLinks.forEach((linkText) => {
        const link = Array.from(nav!.querySelectorAll('a')).find(
          (a) => a.textContent?.trim() === linkText
        );
        expect(link, `Desktop nav should have link "${linkText}"`).toBeTruthy();
      });
    });

    it('should have correct href attributes for navigation links', () => {
      const nav = document.querySelector('nav[aria-label="Principal"]');
      const links = nav?.querySelectorAll('a');
      
      expect(links && links.length).toBeGreaterThan(0);
      
      links?.forEach((link) => {
        const href = link.getAttribute('href');
        expect(href, 'Each nav link should have an href').toBeTruthy();
        expect(href?.endsWith('/'), `Nav link href should end with /: ${href}`).toBe(true);
      });
    });

    it('should mark active page with aria-current', () => {
      // hero-b es la página activa
      const nav = document.querySelector('nav[aria-label="Principal"]');
      const activeLink = nav?.querySelector('[aria-current="page"]');
      
      expect(activeLink, 'Should have an active link marked with aria-current').toBeTruthy();
      expect(activeLink?.textContent?.trim()).toBe('Inicio');
    });

    it('should have logo link to home page', () => {
      const logoLink = document.querySelector('a[aria-label="Ir al inicio"]');
      
      expect(logoLink, 'Logo link should exist').toBeTruthy();
      expect(logoLink?.getAttribute('href')?.includes('hero-b')).toBe(true);
    });
  });

  describe('Mobile Menu Structure', () => {
    it('should have hamburger menu toggle button', () => {
      const button = document.querySelector('[data-mobile-menu-toggle]');
      
      expect(button, 'Mobile menu toggle button should exist').toBeTruthy();
      expect(button?.getAttribute('aria-label')).toBe('Abrir menú de navegación');
      expect(button?.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have three hamburger lines', () => {
      const lines = document.querySelectorAll('.mobile-menu-line');
      
      expect(lines.length).toBe(3);
    });

    it('should have mobile menu overlay', () => {
      const overlay = document.querySelector('[data-mobile-menu-overlay]');
      
      expect(overlay, 'Mobile menu overlay should exist').toBeTruthy();
      expect(overlay?.getAttribute('aria-hidden')).toBe('true');
      expect(overlay?.classList.contains('opacity-0')).toBe(true);
      expect(overlay?.classList.contains('invisible')).toBe(true);
    });

    it('should have mobile menu panel', () => {
      const panel = document.querySelector('[data-mobile-menu-panel]');
      
      expect(panel, 'Mobile menu panel should exist').toBeTruthy();
      expect(panel?.getAttribute('aria-label')).toBe('Navegación móvil');
      expect(panel?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have close button in mobile menu', () => {
      const closeBtn = document.querySelector('[data-mobile-menu-close]');
      
      expect(closeBtn, 'Mobile menu should have close button').toBeTruthy();
      expect(closeBtn?.getAttribute('aria-label')).toBe('Cerrar menú');
      
      // Verificar que tiene un SVG (icono X)
      const svg = closeBtn?.querySelector('svg');
      expect(svg, 'Close button should have an SVG icon').toBeTruthy();
    });

    it('should have mobile panel with solid white background', () => {
      const panel = document.querySelector('[data-mobile-menu-panel]');
      
      expect(panel?.classList.contains('bg-white')).toBe(true);
    });
  });

  describe('Mobile Menu Navigation Links', () => {
    it('should contain all navigation links in mobile menu', () => {
      const expectedLinks = ['Inicio', 'Servicios', 'Tarifas', 'Contacto'];
      const mobileLinks = document.querySelectorAll('[data-mobile-menu-link]');
      
      expect(mobileLinks.length).toBe(expectedLinks.length);
      
      expectedLinks.forEach((linkText, index) => {
        const link = Array.from(mobileLinks).find(
          (a) => a.textContent?.trim() === linkText
        );
        expect(link, `Mobile menu should have link "${linkText}"`).toBeTruthy();
      });
    });

    it('should have proper styling classes for mobile links', () => {
      const mobileLinks = document.querySelectorAll('[data-mobile-menu-link]');
      
      mobileLinks.forEach((link) => {
        expect(link.classList.contains('block')).toBe(true);
        expect(link.classList.contains('rounded-xl')).toBe(true);
        expect(link.classList.contains('border-2')).toBe(true);
      });
    });

    it('should mark active page in mobile menu', () => {
      const mobileLinks = document.querySelectorAll('[data-mobile-menu-link]');
      const activeLink = Array.from(mobileLinks).find(
        (link) => link.getAttribute('aria-current') === 'page'
      );
      
      expect(activeLink, 'Mobile menu should have an active link').toBeTruthy();
      expect(activeLink?.textContent?.trim()).toBe('Inicio');
    });

    it('active mobile link should have distinct styling', () => {
      const mobileLinks = document.querySelectorAll('[data-mobile-menu-link]');
      const activeLink = Array.from(mobileLinks).find(
        (link) => link.getAttribute('aria-current') === 'page'
      );
      
      expect(activeLink?.classList.contains('bg-[#3B755F]')).toBe(true);
      expect(activeLink?.classList.contains('text-white')).toBe(true);
    });

    it('inactive mobile links should have border styling', () => {
      const mobileLinks = document.querySelectorAll('[data-mobile-menu-link]');
      const inactiveLinks = Array.from(mobileLinks).filter(
        (link) => link.getAttribute('aria-current') !== 'page'
      );
      
      inactiveLinks.forEach((link) => {
        expect(
          link.classList.contains('border-[#9FB8AD]') || 
          link.classList.contains('text-[#3B755F]')
        ).toBe(true);
      });
    });
  });

  describe('Mobile Menu JavaScript', () => {
    it('should have mobile menu initialization script', () => {
      const scripts = document.querySelectorAll('script');
      const mobileMenuScript = Array.from(scripts).find((script) =>
        script.textContent?.includes('data-mobile-menu-toggle')
      );
      
      expect(mobileMenuScript, 'Mobile menu JavaScript should be present').toBeTruthy();
    });

    it('menu script should prevent double initialization', () => {
      const scripts = document.querySelectorAll('script');
      const mobileMenuScript = Array.from(scripts).find((script) =>
        script.textContent?.includes('__mobileMenuInit')
      );
      
      expect(
        mobileMenuScript?.textContent?.includes('window.__mobileMenuInit'),
        'Script should check for double initialization'
      ).toBe(true);
    });

    it('menu script should handle opening and closing', () => {
      const scripts = document.querySelectorAll('script');
      const mobileMenuScript = Array.from(scripts).find((script) =>
        script.textContent?.includes('data-mobile-menu-toggle')
      );
      
      const scriptContent = mobileMenuScript?.textContent || '';
      
      // En producción el código está minificado, así que verificamos funcionalidad clave
      expect(scriptContent.includes('classList.add'), 'Script should manipulate classes').toBe(true);
      expect(scriptContent.includes('classList.remove'), 'Script should remove classes').toBe(true);
      expect(scriptContent.includes('setAttribute'), 'Script should set ARIA attributes').toBe(true);
    });

    it('menu script should handle escape key', () => {
      const scripts = document.querySelectorAll('script');
      const mobileMenuScript = Array.from(scripts).find((script) =>
        script.textContent?.includes('data-mobile-menu-toggle')
      );
      
      expect(
        mobileMenuScript?.textContent?.includes('Escape'),
        'Script should handle Escape key to close menu'
      ).toBe(true);
    });

    it('menu script should close on link click', () => {
      const scripts = document.querySelectorAll('script');
      const mobileMenuScript = Array.from(scripts).find((script) =>
        script.textContent?.includes('data-mobile-menu-toggle')
      );
      
      expect(
        mobileMenuScript?.textContent?.includes('data-mobile-menu-link'),
        'Script should close menu when clicking a link'
      ).toBe(true);
    });

    it('menu script should handle close button click', () => {
      const scripts = document.querySelectorAll('script');
      const mobileMenuScript = Array.from(scripts).find((script) =>
        script.textContent?.includes('data-mobile-menu-toggle')
      );
      
      expect(
        mobileMenuScript?.textContent?.includes('data-mobile-menu-close'),
        'Script should handle close button'
      ).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('navigation should be accessible with proper ARIA labels', () => {
      const desktopNav = document.querySelector('nav[aria-label="Principal"]');
      const mobileNav = document.querySelector('nav[aria-label="Navegación móvil"]');
      
      expect(desktopNav).toBeTruthy();
      expect(mobileNav).toBeTruthy();
    });

    it('mobile menu should be hidden by default with aria-hidden', () => {
      const overlay = document.querySelector('[data-mobile-menu-overlay]');
      const panel = document.querySelector('[data-mobile-menu-panel]');
      
      expect(overlay?.getAttribute('aria-hidden')).toBe('true');
      expect(panel?.getAttribute('aria-hidden')).toBe('true');
    });

    it('hamburger button should have proper aria attributes', () => {
      const button = document.querySelector('[data-mobile-menu-toggle]');
      
      expect(button?.hasAttribute('aria-label')).toBe(true);
      expect(button?.hasAttribute('aria-expanded')).toBe(true);
    });

    it('close button should have aria-label', () => {
      const closeBtn = document.querySelector('[data-mobile-menu-close]');
      
      expect(closeBtn?.getAttribute('aria-label')).toBe('Cerrar menú');
    });
  });

  describe('Responsive Design', () => {
    it('desktop navigation should have hidden class for mobile', () => {
      const desktopNav = document.querySelector('nav[aria-label="Principal"]');
      
      expect(desktopNav?.classList.contains('hidden')).toBe(true);
      expect(desktopNav?.classList.contains('md:flex')).toBe(true);
    });

    it('mobile menu toggle should be hidden on desktop', () => {
      const button = document.querySelector('[data-mobile-menu-toggle]');
      
      expect(button?.classList.contains('md:hidden')).toBe(true);
    });

    it('mobile overlay should be hidden on desktop', () => {
      const overlay = document.querySelector('[data-mobile-menu-overlay]');
      
      expect(overlay?.classList.contains('md:hidden')).toBe(true);
    });
  });

  describe('Brand Colors', () => {
    it('should use brand colors for active links', () => {
      const html = fs.readFileSync(path.join(distDir, 'hero-b/index.html'), 'utf-8');
      
      expect(html.includes('#3B755F'), 'Should use primary brand color #3B755F').toBe(true);
      expect(html.includes('#9FB8AD'), 'Should use secondary brand color #9FB8AD').toBe(true);
    });

    it('mobile panel header should have gradient background', () => {
      const header = document.querySelector('[data-mobile-menu-panel] > div');
      
      expect(header?.classList.contains('bg-gradient-to-r')).toBe(true);
      expect(header?.classList.contains('from-[#3B755F]')).toBe(true);
      expect(header?.classList.contains('to-[#9FB8AD]')).toBe(true);
    });
  });
});
