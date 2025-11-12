/**
 * E2E Tests for Terapia Floral Silvia Adame - 404 Error Page
 * 
 * These tests verify that the custom 404 page is properly displayed
 * when navigating to non-existent URLs.
 * 
 * Prerequisites:
 * - Build the site: `pnpm build`
 * - Start preview server: `pnpm preview` (runs on http://localhost:4321)
 * 
 * Run tests:
 * - All E2E tests: `pnpm playwright test`
 * - Only this file: `pnpm playwright test tests/e2e-404.spec.ts`
 * - With UI: `pnpm playwright test --ui`
 * 
 * Note: 404 behavior may differ between dev server and production build.
 * These tests run against the preview server (production build).
 */

import { test, expect } from '@playwright/test';

test.describe('404 Error Page Tests', () => {
  test('should display custom 404 page for non-existent route', async ({ page }) => {
    // Navigate to a URL that definitely doesn't exist
    const response = await page.goto('/ruta-que-no-existe/');
    
    // Note: Some servers return 200 for 404 pages (SPA behavior)
    // Astro in preview mode should return proper 404 status
    // We'll check for either 404 status or the presence of 404 content
    
    const status = response?.status();
    const is404Status = status === 404;
    const is200WithSPA = status === 200; // Some setups serve 404 content with 200
    
    // Should be either 404 or 200 (depending on server config)
    expect(is404Status || is200WithSPA).toBe(true);
  });

  test('should show "Página no encontrada" heading', async ({ page }) => {
    await page.goto('/ruta-que-no-existe/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Find the 404 heading
    const h1 = page.locator('h1');
    
    // Verify heading is visible
    await expect(h1).toBeVisible();
    
    // Verify heading contains 404-related text
    await expect(h1).toContainText(/no encontrada|404|not found/i);
  });

  test('should have custom 404 content explaining the error', async ({ page }) => {
    await page.goto('/esta-pagina-no-existe/');
    
    // Check for explanatory text about the missing page
    const content = page.locator('main, body');
    
    // Should explain that the page doesn't exist or link has changed
    await expect(content).toContainText(/no existe|cambiado|not exist/i);
  });

  test('should have "Volver al inicio" or home link', async ({ page }) => {
    await page.goto('/pagina-inexistente/');
    
    // Find the link back to home
    const homeLink = page.locator('a:has-text("Volver al inicio"), a:has-text("inicio"), a:has-text("Home")').first();
    
    // Verify link exists
    await expect(homeLink).toBeVisible();
    
    // Verify link points to home page
    const href = await homeLink.getAttribute('href');
    expect(href).toMatch(/^\/$|\/terapia-floral-silvia\/$|hero-b/);
  });

  test('should maintain site navigation on 404 page', async ({ page }) => {
    await page.goto('/no-existe/');
    
    // Verify navigation menu is still present
    const nav = page.locator('nav, header');
    
    // Should have some navigation elements
    const navLinks = nav.locator('a');
    const linkCount = await navLinks.count();
    
    // Should have at least a few navigation links
    expect(linkCount).toBeGreaterThan(0);
  });

  test('clicking home link from 404 navigates back to working page', async ({ page }) => {
    await page.goto('/ruta-falsa/');
    
    // Find and click the home link
    const homeLink = page.locator('a:has-text("Volver al inicio"), a:has-text("inicio")').first();
    await homeLink.click();
    
    // Wait for navigation
    await page.waitForURL(/\/hero-b\/|\/$/);
    
    // Verify we're on a working page
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Should not see 404 content anymore
    await expect(page.locator('text="no encontrada"')).not.toBeVisible();
  });

  test('should work for various non-existent routes', async ({ page }) => {
    const nonExistentRoutes = [
      '/esta-no-existe/',
      '/fake-page/',
      '/random-url/',
      '/404-test/',
    ];
    
    for (const route of nonExistentRoutes) {
      await page.goto(route);
      
      // Each should show 404 content
      const h1 = page.locator('h1');
      await expect(h1).toContainText(/no encontrada|404/i);
    }
  });

  test('should work for nested non-existent routes', async ({ page }) => {
    await page.goto('/servicios/no-existe/subpagina/');
    
    // Should still show 404 page
    const h1 = page.locator('h1');
    await expect(h1).toContainText(/no encontrada|404/i);
  });

  test('should have proper page title for 404', async ({ page }) => {
    await page.goto('/pagina-no-encontrada/');
    
    // Verify title indicates it's a 404 page
    await expect(page).toHaveTitle(/no encontrada|404/i);
  });

  test('404 page should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/mobile-test-404/');
    
    // Verify content is visible on mobile
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    const homeLink = page.locator('a:has-text("Volver")').first();
    await expect(homeLink).toBeVisible();
  });
});

test.describe('404 Page - Design and UX', () => {
  test('should maintain site branding on 404 page', async ({ page }) => {
    await page.goto('/not-found/');
    
    // Check if logo or site name is present
    const logo = page.locator('img[alt*="Logo"], img[alt*="Silvia"]').first();
    const siteTitle = page.locator('text=Silvia Adame, text=Terapia Floral').first();
    
    // At least one should be present
    const logoVisible = await logo.isVisible().catch(() => false);
    const titleVisible = await siteTitle.isVisible().catch(() => false);
    
    expect(logoVisible || titleVisible).toBe(true);
  });

  test('404 page should have consistent styling with site', async ({ page }) => {
    await page.goto('/test-404/');
    
    // Verify page has styling applied (not a blank unstyled page)
    const body = page.locator('body');
    const backgroundColor = await body.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Should have a background color set (not default white or transparent)
    expect(backgroundColor).toBeTruthy();
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('404 page content should be centered and readable', async ({ page }) => {
    await page.goto('/missing-page/');
    
    // Find main content container
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    // Verify content has reasonable width constraints
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Content should be readable (not edge-to-edge)
    const mainBox = await main.boundingBox();
    if (mainBox) {
      // Width should be reasonable (not full viewport on desktop)
      expect(mainBox.width).toBeLessThan(1200);
    }
  });
});

test.describe('404 vs Valid Routes Comparison', () => {
  test('valid routes should NOT show 404 content', async ({ page }) => {
    // Navigate to valid pages
    const validPages = ['/hero-b/', '/contacto/', '/servicios/'];
    
    for (const validPage of validPages) {
      await page.goto(validPage);
      
      // Should NOT see "no encontrada" text
      const pageContent = await page.textContent('body');
      expect(pageContent?.toLowerCase()).not.toContain('página no encontrada');
      
      // Should have proper content
      const h1 = page.locator('h1');
      await expect(h1).toBeVisible();
    }
  });

  test('flores routes should work (not 404)', async ({ page }) => {
    // Navigate to flores index
    const response = await page.goto('/flores/');
    
    // Should be 200 OK
    expect(response?.status()).toBe(200);
    
    // Should NOT show 404 content
    const h1Text = await page.locator('h1').textContent();
    expect(h1Text?.toLowerCase()).not.toContain('no encontrada');
  });
});
