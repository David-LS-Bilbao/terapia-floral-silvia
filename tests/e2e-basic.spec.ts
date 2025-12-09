/**
 * E2E Tests - Basic Smoke Tests
 * 
 * Tests básicos para verificar funcionalidad principal del sitio
 */

import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('site loads at root', async ({ page }) => {
    // El baseURL en playwright.config.ts incluye /terapia-floral-silvia/
    // por lo que page.goto('/') va a http://localhost:4321/terapia-floral-silvia/
    await page.goto('/');
    
    // La página debe cargar (puede mostrar contenido o redirigir)
    const body = page.locator('body');
    await expect(body).toBeVisible({ timeout: 10000 });
    
    console.log('Page URL:', page.url());
  });

  test('home page has content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Debe haber algún contenido en la página
    const bodyText = await page.textContent('body');
    expect(bodyText).toBeTruthy();
    expect(bodyText.length).toBeGreaterThan(0);
  });

  test('site has navigation', async ({ page }) => {
    await page.goto('/');
    
    // Debe haber links de navegación
    const links = page.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });
});
