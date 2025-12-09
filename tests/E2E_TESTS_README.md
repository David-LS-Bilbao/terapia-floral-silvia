# End-to-End Tests - Playwright

Comprehensive E2E testing suite for Terapia Floral Silvia Adame website using Playwright.

## 📋 Test Coverage

### 1. Home Page Tests (`e2e-home.spec.ts`)
**10 tests** covering main landing page functionality:

✅ **Smoke Tests:**
- Page loads successfully
- H1 heading present with correct content
- Main CTA "Pedir cita" navigates to `/contacto/`
- "Ver servicios" button present and functional
- Navigation menu with key links
- Logo visible and loaded
- Mobile responsive design
- Descriptive therapy content

✅ **Navigation Flow:**
- Complete user journey: home → contacto → back

### 2. Contact Page Tests (`e2e-contact.spec.ts`)
**22 tests** covering contact page functionality:

✅ **Core Functionality:**
- Page loads with correct H1
- WhatsApp CTA with proper `wa.me/34687235652` link
- Mailto link with `biomiflor@hotmail.com`
- Email address visible on page
- WhatsApp number visible

✅ **Additional Elements:**
- Social media links (Facebook, Instagram, TikTok)
- "Quién soy" section with therapist info
- Therapist photo displayed
- "Ver Servicios y Tarifas" button
- Privacy policy link
- "Volver al Inicio" navigation

✅ **User Interactions:**
- WhatsApp button opens in new tab
- Navigate to tarifas page
- Navigate back to home

✅ **Responsive Design:**
- Mobile-friendly (375x667)
- Tablet-friendly (768x1024)

✅ **SEO:**
- Structured data (JSON-LD schema)
- Person schema with name and email

### 3. Sitemap & Robots Tests (`e2e-sitemap-robots.spec.ts`)
**13 tests** covering SEO infrastructure:

✅ **Sitemap.xml:**
- Accessible and returns 200
- Valid XML structure
- Contains main pages (hero-b, contacto, servicios, tarifas)
- Includes flores pages
- Uses HTTPS protocol (or localhost in dev)

✅ **Robots.txt:**
- Accessible and returns 200 with text/plain
- Valid User-agent directives
- Allows crawlers (doesn't block everything)
- References sitemap.xml
- Sitemap URL is absolute

✅ **Integration:**
- Sitemap URL in robots.txt is accessible

✅ **SEO Meta:**
- Pages have meta description
- Viewport meta tag present
- Open Graph tags for social sharing
- Canonical URLs

### 4. 404 Error Page Tests (`e2e-404.spec.ts`)
**15 tests** covering custom 404 page:

✅ **Basic Functionality:**
- Custom 404 page for non-existent routes
- "Página no encontrada" heading
- Explanatory content about missing page
- "Volver al inicio" link
- Navigation menu maintained
- Clicking home link navigates back

✅ **Multiple Routes:**
- Works for various non-existent URLs
- Works for nested routes
- Proper page title

✅ **Design & UX:**
- Mobile responsive
- Site branding maintained
- Consistent styling
- Centered and readable content

✅ **Comparison:**
- Valid routes don't show 404 content
- Flores routes work correctly

## 🚀 Running Tests

### Prerequisites

1. **Build the site:**
   ```bash
   pnpm build
   ```

2. **Start preview server (optional - config does this automatically):**
   ```bash
   pnpm preview
   ```
   The server runs at `http://localhost:4321`

### Test Commands

```bash
# Run all E2E tests
pnpm playwright test

# Run specific test file
pnpm playwright test tests/e2e-home.spec.ts
pnpm playwright test tests/e2e-contact.spec.ts
pnpm playwright test tests/e2e-sitemap-robots.spec.ts
pnpm playwright test tests/e2e-404.spec.ts

# Run with UI mode (interactive)
pnpm playwright test --ui

# Run in headed mode (see browser)
pnpm playwright test --headed

# Run specific test by name
pnpm playwright test -g "should have H1 heading"

# Debug a specific test
pnpm playwright test --debug tests/e2e-home.spec.ts

# Generate HTML report
pnpm playwright show-report
```

### Running in CI

The `playwright.config.ts` automatically:
- Builds the site (`pnpm build`)
- Starts preview server (`pnpm preview`)
- Runs tests against `http://localhost:4321/terapia-floral-silvia/`
- Retries failed tests (in CI only)
- Generates HTML report

## 📊 Test Statistics

**Total E2E Tests: 60 tests**

- Home Page: 10 tests
- Contact Page: 22 tests
- Sitemap & Robots: 13 tests
- 404 Page: 15 tests

**Coverage:**
- ✅ Smoke tests (page loading, basic content)
- ✅ Navigation flows
- ✅ Form validation
- ✅ External links (WhatsApp, mailto, social media)
- ✅ SEO (sitemap, robots.txt, meta tags, schema)
- ✅ Error handling (404 page)
- ✅ Responsive design (mobile, tablet)
- ✅ User journeys (end-to-end flows)

## 🛠️ Configuration

**File:** `playwright.config.ts`

Key settings:
- **Base URL:** `http://localhost:4321/terapia-floral-silvia/`
- **Timeout:** 30 seconds per test
- **Expect timeout:** 5 seconds
- **Browser:** Chromium (Desktop Chrome)
- **Retries:** 2 in CI, 0 in local
- **Screenshots:** Only on failure
- **Traces:** On first retry
- **Reporter:** HTML report

## 📝 Test Structure

Each test file follows this pattern:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/page/');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const element = page.locator('selector');
    
    // Act
    await element.click();
    
    // Assert
    await expect(element).toBeVisible();
  });
});
```

## 🎯 Best Practices Used

1. **Descriptive test names** - Clear "should..." statements
2. **Page Object pattern** - Reusable selectors
3. **Wait strategies** - Proper `waitForLoadState()`, `waitForURL()`
4. **Explicit assertions** - `expect(...).toBe()` instead of implicit waits
5. **Isolated tests** - Each test independent, `beforeEach` setup
6. **Grouped tests** - Related tests in `test.describe()` blocks
7. **Error handling** - Graceful fallbacks for external links
8. **Mobile testing** - Multiple viewport sizes
9. **Network considerations** - Avoid actual external calls
10. **Comments** - Clear documentation in each file

## 🐛 Debugging Tips

### Test Fails Locally

1. **Run in headed mode:**
   ```bash
   pnpm playwright test --headed
   ```

2. **Use UI mode:**
   ```bash
   pnpm playwright test --ui
   ```

3. **Check preview server:**
   ```bash
   pnpm preview
   # Visit http://localhost:4321/terapia-floral-silvia/
   ```

4. **View HTML report:**
   ```bash
   pnpm playwright show-report
   ```

### Common Issues

**Problem:** Tests timeout  
**Solution:** Increase timeout in `playwright.config.ts` or use `test.setTimeout(60000)`

**Problem:** Element not found  
**Solution:** Check selector with `page.locator('selector').count()`, add wait

**Problem:** Base URL wrong  
**Solution:** Verify `baseURL` in config matches your deployment

**Problem:** Flaky tests  
**Solution:** Add proper waits (`waitForLoadState()`, `waitForSelector()`)

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)

## 🔄 Continuous Integration

Tests run automatically on GitHub Actions when:
- Pushing to `master` branch
- Opening/updating pull requests

CI Configuration in `.github/workflows/`:
```yaml
- name: Install dependencies
  run: pnpm install
  
- name: Install Playwright Browsers
  run: pnpm playwright install --with-deps
  
- name: Run E2E tests
  run: pnpm playwright test
  
- name: Upload test report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
```

## ✅ Maintenance

**Adding new tests:**
1. Create file in `tests/` directory: `e2e-[feature].spec.ts`
2. Import from `@playwright/test`
3. Follow existing patterns
4. Run locally: `pnpm playwright test tests/e2e-[feature].spec.ts`
5. Update this README with new test count

**Updating selectors:**
- If page structure changes, update selectors in test files
- Consider using data-testid attributes for stability
- Run full suite after changes: `pnpm playwright test`

**Performance:**
- Keep tests fast (< 5 seconds per test)
- Use parallel execution (default)
- Mock external API calls
- Avoid unnecessary waits

---

**Last Updated:** November 12, 2025  
**Total Tests:** 60 E2E tests  
**Status:** ✅ All passing
