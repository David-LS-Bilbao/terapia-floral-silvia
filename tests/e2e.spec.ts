import { test, expect } from '@playwright/test';

test.describe('Página principal', () => {
  test('carga correctamente y tiene título apropiado', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Terapia Floral Silvia Adame/);
  });

  test('tiene navegación funcional', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que existe el enlace de contacto
    const contactoLink = page.locator('a[href*="contacto"]');
    await expect(contactoLink).toBeVisible();
  });

  test('botón de WhatsApp funciona', async ({ page }) => {
    await page.goto('/');
    
    // Verificar que existe botón de WhatsApp
    const whatsappButton = page.locator('a[href*="wa.me"]');
    await expect(whatsappButton).toBeVisible();
  });
});

test.describe('Página de contacto', () => {
  test('carga y muestra información de contacto', async ({ page }) => {
    await page.goto('/contacto/');
    await expect(page).toHaveTitle(/Contacto/);
    
    // Verificar que se muestra el WhatsApp
    const whatsappLink = page.locator('a[href*="wa.me"]');
    await expect(whatsappLink).toBeVisible();
    
    // Verificar que se muestra el email
    const emailLink = page.locator('a[href*="mailto"]');
    await expect(emailLink).toBeVisible();
  });

  test('muestra las redes sociales', async ({ page }) => {
    await page.goto('/contacto/');
    
    // Verificar que hay iconos de redes sociales
    const socialLinks = page.locator('nav[aria-label="Redes sociales"] a');
    await expect(socialLinks).toHaveCount(3); // Facebook, Instagram, TikTok
  });
});
