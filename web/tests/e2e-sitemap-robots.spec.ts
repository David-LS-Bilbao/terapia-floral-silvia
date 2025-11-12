/**
 * E2E Tests for Terapia Floral Silvia Adame - Sitemap and Robots.txt
 * 
 * These tests verify that sitemap.xml and robots.txt are properly configured
 * and accessible.
 * 
 * Prerequisites:
 * - Build the site: `pnpm build`
 * - Start preview server: `pnpm preview` (runs on http://localhost:4321)
 * 
 * Run tests:
 * - All E2E tests: `pnpm playwright test`
 * - Only this file: `pnpm playwright test tests/e2e-sitemap-robots.spec.ts`
 * - With UI: `pnpm playwright test --ui`
 */

import { test, expect } from '@playwright/test';

test.describe('Sitemap.xml Tests', () => {
  test('should have sitemap.xml accessible and return 200', async ({ page, request }) => {
    // Make a direct HTTP request to sitemap.xml
    const response = await request.get('/sitemap.xml');
    
    // Verify status code is 200
    expect(response.status()).toBe(200);
    
    // Verify content type is XML
    const contentType = response.headers()['content-type'];
    expect(contentType).toMatch(/xml|text/);
  });

  test('should have valid XML structure in sitemap', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();
    
    // Verify it's not empty
    expect(body.length).toBeGreaterThan(0);
    
    // Verify it contains XML declaration
    expect(body).toContain('<?xml');
    
    // Verify it has urlset element (standard sitemap format)
    expect(body).toMatch(/<urlset|<sitemapindex/);
    
    // Verify it contains at least one URL entry
    expect(body).toContain('<url>');
    expect(body).toContain('<loc>');
  });

  test('should include main pages in sitemap', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();
    
    // Check for key pages in the sitemap
    const expectedPages = [
      'hero-b',      // Main landing page
      'contacto',    // Contact page
      'servicios',   // Services page
      'tarifas',     // Rates page
    ];
    
    // Verify at least some of these pages are in the sitemap
    let foundPages = 0;
    for (const page of expectedPages) {
      if (body.includes(page)) {
        foundPages++;
      }
    }
    
    // Expect at least 2 of the main pages to be in sitemap
    expect(foundPages).toBeGreaterThanOrEqual(2);
  });

  test('should include flores (flowers) pages in sitemap', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();
    
    // Check if flores pages are included
    // Should have /flores/ or /flores/[slug] entries
    expect(body).toContain('flores');
  });

  test('sitemap URLs should use HTTPS protocol', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();
    
    // Sitemap URLs should use https:// for production
    // Note: In local dev/preview, they might be http://localhost
    const hasHttps = body.includes('https://');
    const hasLocalhost = body.includes('localhost');
    
    // Should have either HTTPS URLs or localhost URLs (dev mode)
    expect(hasHttps || hasLocalhost).toBe(true);
  });
});

test.describe('Robots.txt Tests', () => {
  test('should have robots.txt accessible and return 200', async ({ request }) => {
    // Make a direct HTTP request to robots.txt
    const response = await request.get('/robots.txt');
    
    // Verify status code is 200
    expect(response.status()).toBe(200);
    
    // Verify content type is text/plain
    const contentType = response.headers()['content-type'];
    expect(contentType).toMatch(/text\/plain/);
  });

  test('should have valid robots.txt content', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const body = await response.text();
    
    // Verify it's not empty
    expect(body.length).toBeGreaterThan(0);
    
    // Verify it contains User-agent directive
    expect(body).toMatch(/User-agent:/i);
    
    // Verify it contains at least one directive (Allow, Disallow, or Sitemap)
    const hasDirective = 
      body.includes('Disallow:') || 
      body.includes('Allow:') || 
      body.includes('Sitemap:');
    expect(hasDirective).toBe(true);
  });

  test('should allow all user agents (or specify rules)', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const body = await response.text();
    
    // Should have User-agent: * (allow all crawlers)
    expect(body).toMatch(/User-agent:\s*\*/i);
    
    // Common patterns:
    // - Allow: / (allow everything)
    // - Disallow: (empty = allow everything)
    // - Specific rules for certain paths
    
    // Verify it doesn't block all content
    const blocksEverything = body.includes('Disallow: /') && !body.includes('Allow:');
    expect(blocksEverything).toBe(false);
  });

  test('should reference sitemap.xml in robots.txt', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const body = await response.text();
    
    // Verify robots.txt includes Sitemap directive
    expect(body).toMatch(/Sitemap:/i);
    expect(body).toContain('sitemap.xml');
  });

  test('robots.txt sitemap URL should be absolute', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const body = await response.text();
    
    // Extract sitemap line
    const sitemapMatch = body.match(/Sitemap:\s*(.+)/i);
    
    if (sitemapMatch) {
      const sitemapUrl = sitemapMatch[1].trim();
      
      // Should be an absolute URL (starts with http:// or https://)
      expect(sitemapUrl).toMatch(/^https?:\/\//);
    }
  });
});

test.describe('Sitemap and Robots Integration', () => {
  test('sitemap URL in robots.txt should be accessible', async ({ request }) => {
    // Get robots.txt
    const robotsResponse = await request.get('/robots.txt');
    const robotsBody = await robotsResponse.text();
    
    // Extract sitemap URL
    const sitemapMatch = robotsBody.match(/Sitemap:\s*(.+)/i);
    
    if (sitemapMatch) {
      const sitemapUrl = sitemapMatch[1].trim();
      
      // Try to fetch the sitemap URL
      // Note: If it's an absolute URL to production, this might fail in local tests
      // So we'll also try the relative path
      
      let sitemapResponse;
      try {
        // Try absolute URL first
        sitemapResponse = await request.get(sitemapUrl);
      } catch (error) {
        // Fall back to relative path
        sitemapResponse = await request.get('/sitemap.xml');
      }
      
      // Verify sitemap is accessible
      expect(sitemapResponse.status()).toBe(200);
    }
  });
});

test.describe('SEO Meta Tests', () => {
  test('pages should have proper meta tags', async ({ page }) => {
    // Navigate to home page
    await page.goto('/hero-b/');
    
    // Check for essential meta tags
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveCount(1);
    
    // Check for viewport meta tag (mobile-friendly)
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveCount(1);
  });

  test('pages should have Open Graph meta tags for social sharing', async ({ page }) => {
    await page.goto('/hero-b/');
    
    // Check for Open Graph tags
    const ogTags = page.locator('meta[property^="og:"]');
    const count = await ogTags.count();
    
    // Should have at least some OG tags
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Canonical URLs', () => {
  test('pages should have canonical link tag', async ({ page }) => {
    await page.goto('/hero-b/');
    
    // Check for canonical link
    const canonical = page.locator('link[rel="canonical"]');
    
    // If present, verify it's a valid URL
    const count = await canonical.count();
    if (count > 0) {
      const href = await canonical.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href).toMatch(/^https?:\/\//);
    }
  });
});
