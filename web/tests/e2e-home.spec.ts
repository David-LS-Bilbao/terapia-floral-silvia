/**
 * E2E Tests for Terapia Floral Silvia Adame - Home Page
 * 
 * These tests verify the main landing page (hero-b) functionality.
 * 
 * Prerequisites:
 * - Build the site: `pnpm build`
 * - Start preview server: `pnpm preview` (runs on http://localhost:4321)
 * 
 * Run tests:
 * - All E2E tests: `pnpm playwright test`
 * - Only this file: `pnpm playwright test tests/e2e-home.spec.ts`
 * - With UI: `pnpm playwright test --ui`
 * - Headed mode: `pnpm playwright test --headed`
 * 
 * The webServer in playwright.config.ts automatically runs build+preview before tests.
 */

import { test, expect } from '@playwright/test';

test.describe('Home Page (hero-b) - Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page (hero-b is the main landing page)
    await page.goto('/hero-b/');
  });

  test('should load the page successfully', async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Verify the page loaded by checking the title
    await expect(page).toHaveTitle(/Hero B|Silvia Adame/i);
    
    // Verify main content is visible
    const main = page.locator('header, main, body');
    await expect(main).toBeVisible();
  });

  test('should have H1 heading with correct content', async ({ page }) => {
    // Find the H1 element
    const h1 = page.locator('h1.brand-title');
    
    // Verify H1 is visible
    await expect(h1).toBeVisible();
    
    // Verify H1 contains expected text about Flores de Bach and Mindfulness
    await expect(h1).toContainText(/Bienestar emocional/i);
    await expect(h1).toContainText(/Flores de Bach/i);
    await expect(h1).toContainText(/Mindfulness/i);
  });

  test('should have "Pedir cita" CTA that leads to /contacto/', async ({ page }) => {
    // Find the main CTA button "Pedir cita"
    const ctaButton = page.locator('a:has-text("Pedir cita")').first();
    
    // Verify button is visible and enabled
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toBeEnabled();
    
    // Verify the href points to contacto page
    const href = await ctaButton.getAttribute('href');
    expect(href).toMatch(/contacto\/?$/);
    
    // Click the button and verify navigation
    await ctaButton.click();
    
    // Wait for navigation to complete
    await page.waitForURL(/\/contacto\/?$/);
    
    // Verify we're on the contact page
    await expect(page).toHaveURL(/\/contacto\/?$/);
    await expect(page.locator('h1')).toContainText(/Contacto/i);
  });

  test('should have "Ver servicios" button', async ({ page }) => {
    // Find the secondary CTA button
    const serviciosButton = page.locator('a:has-text("Ver servicios")');
    
    // Verify button is visible
    await expect(serviciosButton).toBeVisible();
    
    // Verify the href points to servicios page
    const href = await serviciosButton.getAttribute('href');
    expect(href).toMatch(/servicios\/?$/);
  });

  test('should have navigation menu with key links', async ({ page }) => {
    // Verify main navigation links are present
    const nav = page.locator('nav, header');
    
    // Check for Inicio/Home link
    const inicioLink = page.locator('a:has-text("Inicio")');
    await expect(inicioLink).toBeVisible();
    
    // Check for Servicios link
    const serviciosLink = page.locator('a:has-text("Servicios")');
    await expect(serviciosLink).toBeVisible();
    
    // Check for Contacto link
    const contactoLink = page.locator('a:has-text("Contacto")');
    await expect(contactoLink).toBeVisible();
  });

  test('should have logo visible', async ({ page }) => {
    // Find the lotus logo image
    const logo = page.locator('img[alt*="Logo"]').first();
    
    // Verify logo is visible
    await expect(logo).toBeVisible();
    
    // Verify logo has loaded (not broken)
    const logoSrc = await logo.getAttribute('src');
    expect(logoSrc).toBeTruthy();
    expect(logoSrc).toMatch(/logo|lotus/i);
  });

  test('should be responsive - mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verify page still loads correctly
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Verify CTA buttons are still visible on mobile
    const ctaButton = page.locator('a:has-text("Pedir cita")');
    await expect(ctaButton).toBeVisible();
  });

  test('should have descriptive text about therapies', async ({ page }) => {
    // Verify there's descriptive content about the therapies
    const content = page.locator('p.brand-text, p:has-text("Mindfulness")');
    
    await expect(content).toBeVisible();
    await expect(content).toContainText(/Mindfulness|Flores de Bach/i);
  });
});

test.describe('Home Page - Navigation Flow', () => {
  test('complete user journey: home -> contacto -> back to home', async ({ page }) => {
    // Start at home
    await page.goto('/hero-b/');
    await expect(page.locator('h1')).toContainText(/Bienestar emocional/i);
    
    // Click "Pedir cita" to go to contact
    await page.locator('a:has-text("Pedir cita")').first().click();
    await page.waitForURL(/\/contacto\/?$/);
    await expect(page.locator('h1')).toContainText(/Contacto/i);
    
    // Click "Volver al Inicio" or navigate back
    const backButton = page.locator('a:has-text("Volver al Inicio"), a:has-text("Inicio")').first();
    await backButton.click();
    
    // Verify we're back at home (hero-b)
    await page.waitForURL(/\/hero-b\/?$/);
    await expect(page.locator('h1')).toContainText(/Bienestar emocional/i);
  });
});
