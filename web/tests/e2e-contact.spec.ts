/**
 * E2E Tests for Terapia Floral Silvia Adame - Contact Page
 * 
 * These tests verify the contact page functionality, including:
 * - WhatsApp CTA with proper wa.me link
 * - Email mailto link with correct address
 * - Form validation and submission (if present)
 * 
 * Prerequisites:
 * - Build the site: `pnpm build`
 * - Start preview server: `pnpm preview` (runs on http://localhost:4321)
 * 
 * Run tests:
 * - All E2E tests: `pnpm playwright test`
 * - Only this file: `pnpm playwright test tests/e2e-contact.spec.ts`
 * - With UI: `pnpm playwright test --ui`
 * 
 * Note: Form submission tests use network mocking to avoid actual API calls.
 */

import { test, expect } from '@playwright/test';

// Expected contact information
const EXPECTED_EMAIL = 'biomiflor@hotmail.com';
const EXPECTED_WHATSAPP_NUMBER = '34687235652';

test.describe('Contact Page - Core Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the contact page
    await page.goto('/contacto/');
  });

  test('should load contact page successfully', async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Verify the page title
    await expect(page).toHaveTitle(/Contacto|Silvia Adame/i);
    
    // Verify H1 heading
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Contacto/i);
  });

  test('should have WhatsApp CTA with correct wa.me link', async ({ page }) => {
    // Find the WhatsApp button
    const whatsappButton = page.locator('a:has-text("WhatsApp")').first();
    
    // Verify button is visible
    await expect(whatsappButton).toBeVisible();
    
    // Get the href attribute
    const href = await whatsappButton.getAttribute('href');
    
    // Verify it's a wa.me link
    expect(href).toContain('wa.me');
    expect(href).toContain(EXPECTED_WHATSAPP_NUMBER);
    
    // Verify it contains a pre-filled message
    expect(href).toContain('text=');
    expect(href).toMatch(/Hola.*Silvia/i);
    
    // Verify target="_blank" for external link
    const target = await whatsappButton.getAttribute('target');
    expect(target).toBe('_blank');
    
    // Verify rel="noopener" for security
    const rel = await whatsappButton.getAttribute('rel');
    expect(rel).toContain('noopener');
  });

  test('should have mailto link with correct email address', async ({ page }) => {
    // Find the email link (might be a button or link)
    const emailLink = page.locator(`a[href*="mailto:${EXPECTED_EMAIL}"]`).first();
    
    // Verify link is visible
    await expect(emailLink).toBeVisible();
    
    // Verify href is correct
    const href = await emailLink.getAttribute('href');
    expect(href).toBe(`mailto:${EXPECTED_EMAIL}`);
    
    // Verify the visible text shows the email
    await expect(emailLink).toContainText(EXPECTED_EMAIL);
  });

  test('should display email address visibly on page', async ({ page }) => {
    // Check that email is displayed somewhere on the page
    const emailText = page.locator(`text=${EXPECTED_EMAIL}`);
    await expect(emailText).toBeVisible();
  });

  test('should have WhatsApp phone number visible', async ({ page }) => {
    // The WhatsApp link should contain the phone number
    const whatsappLink = page.locator('a[href*="wa.me"]').first();
    await expect(whatsappLink).toBeVisible();
    
    const href = await whatsappLink.getAttribute('href');
    expect(href).toContain(EXPECTED_WHATSAPP_NUMBER);
  });
});

test.describe('Contact Page - Additional Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contacto/');
  });

  test('should have social media links', async ({ page }) => {
    // Check for social media links (Facebook, Instagram, TikTok)
    const socialLinks = page.locator('a[href*="facebook.com"], a[href*="instagram.com"], a[href*="tiktok.com"]');
    
    // Verify at least one social link exists
    const count = await socialLinks.count();
    expect(count).toBeGreaterThan(0);
    
    // Verify social links open in new tab
    const firstSocialLink = socialLinks.first();
    if (await firstSocialLink.isVisible()) {
      const target = await firstSocialLink.getAttribute('target');
      expect(target).toBe('_blank');
    }
  });

  test('should have "Quién soy" section with therapist info', async ({ page }) => {
    // Check for the WhoAmI component
    const whoAmISection = page.locator('h2:has-text("Quién soy")');
    await expect(whoAmISection).toBeVisible();
    
    // Verify therapist name is displayed
    const silviaNombre = page.locator('text=Silvia Adame');
    await expect(silviaNombre.first()).toBeVisible();
  });

  test('should have image of therapist', async ({ page }) => {
    // Find the therapist photo
    const photo = page.locator('img[alt*="Silvia"]').first();
    
    // Verify image is visible
    await expect(photo).toBeVisible();
    
    // Verify image has loaded
    const imgSrc = await photo.getAttribute('src');
    expect(imgSrc).toBeTruthy();
  });

  test('should have "Ver Servicios y Tarifas" button', async ({ page }) => {
    // Find the tarifas button
    const tarifasButton = page.locator('a:has-text("Ver Servicios y Tarifas")');
    
    // Verify button exists and is visible
    await expect(tarifasButton).toBeVisible();
    
    // Verify it links to tarifas page
    const href = await tarifasButton.getAttribute('href');
    expect(href).toMatch(/tarifas\/?$/);
  });

  test('should have privacy policy link', async ({ page }) => {
    // Find privacy policy link
    const privacyLink = page.locator('a:has-text("Política de privacidad"), a[href*="privacidad"]');
    
    // Verify link exists
    const count = await privacyLink.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have "Volver al Inicio" navigation button', async ({ page }) => {
    // Find back button
    const backButton = page.locator('a:has-text("Volver al Inicio")');
    
    // Verify button is visible
    await expect(backButton).toBeVisible();
    
    // Verify it points to home
    const href = await backButton.getAttribute('href');
    expect(href).toMatch(/hero-b|\/$/);
  });
});

test.describe('Contact Page - User Interactions', () => {
  test('clicking WhatsApp button opens link in new tab', async ({ page, context }) => {
    await page.goto('/contacto/');
    
    // Find WhatsApp button
    const whatsappButton = page.locator('a:has-text("WhatsApp")').first();
    
    // Verify it has target="_blank"
    const target = await whatsappButton.getAttribute('target');
    expect(target).toBe('_blank');
    
    // Note: We don't actually open the external link in tests to avoid rate limiting
    // but we verify the link structure is correct
    const href = await whatsappButton.getAttribute('href');
    expect(href).toMatch(/^https:\/\/wa\.me\//);
  });

  test('clicking "Ver Servicios y Tarifas" navigates to tarifas page', async ({ page }) => {
    await page.goto('/contacto/');
    
    // Click the tarifas button
    const tarifasButton = page.locator('a:has-text("Ver Servicios y Tarifas")').first();
    await tarifasButton.click();
    
    // Wait for navigation
    await page.waitForURL(/\/tarifas\/?$/);
    
    // Verify we're on tarifas page
    await expect(page).toHaveURL(/\/tarifas\/?$/);
    await expect(page.locator('h1')).toContainText(/Tarifas|Servicios/i);
  });

  test('clicking "Volver al Inicio" navigates to home', async ({ page }) => {
    await page.goto('/contacto/');
    
    // Click back button
    const backButton = page.locator('a:has-text("Volver al Inicio")').first();
    await backButton.click();
    
    // Wait for navigation
    await page.waitForURL(/\/hero-b\/?$/);
    
    // Verify we're back at home
    await expect(page.locator('h1')).toContainText(/Bienestar emocional/i);
  });
});

test.describe('Contact Page - Responsive Design', () => {
  test('should be mobile-friendly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/contacto/');
    
    // Verify key elements are still visible on mobile
    const h1 = page.locator('h1:has-text("Contacto")');
    await expect(h1).toBeVisible();
    
    const whatsappButton = page.locator('a:has-text("WhatsApp")').first();
    await expect(whatsappButton).toBeVisible();
    
    const emailLink = page.locator(`a[href*="mailto:${EXPECTED_EMAIL}"]`).first();
    await expect(emailLink).toBeVisible();
  });

  test('should be tablet-friendly', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('/contacto/');
    
    // Verify layout adapts properly
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Verify grid layout works
    const sections = page.locator('section, .grid');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Contact Page - Schema and SEO', () => {
  test('should have structured data (JSON-LD schema)', async ({ page }) => {
    await page.goto('/contacto/');
    
    // Check for JSON-LD script tag
    const schemaScript = page.locator('script[type="application/ld+json"]');
    
    // Verify schema exists
    const count = await schemaScript.count();
    expect(count).toBeGreaterThan(0);
    
    if (count > 0) {
      // Get the schema content
      const schemaContent = await schemaScript.first().textContent();
      const schema = JSON.parse(schemaContent || '{}');
      
      // Verify it's Person schema
      expect(schema['@type']).toBe('Person');
      expect(schema.name).toBeTruthy();
      expect(schema.email).toContain('mailto:');
    }
  });
});
