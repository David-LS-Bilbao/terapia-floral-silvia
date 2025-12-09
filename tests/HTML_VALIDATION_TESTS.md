# HTML Validation Tests

## Overview

This test suite validates the built HTML files from the Astro project to ensure SEO best practices and accessibility standards.

## Test File

- **Location**: `tests/html-validation.spec.ts`
- **Environment**: jsdom (for HTML parsing)
- **Dependencies**: 
  - `@testing-library/dom` - For accessible DOM queries
  - `jsdom` - For parsing HTML in Node.js environment

## Test Categories

### 1. Canonical Links ✅

**Purpose**: Ensure every page has a canonical link that points to the correct URL.

**Tests**:
- Verifies all HTML files contain `<link rel="canonical">` tags
- Validates that canonical URLs start with `https://david-ls-bilbao.github.io/terapia-floral-silvia`
- Reports any missing or malformed canonical links

**Why it matters**: Canonical links help search engines understand the primary URL for a page, preventing duplicate content issues.

**Implementation Note**: The canonical URL is added in `src/layouts/Base.astro` using:
```astro
<link rel="canonical" href={`https://david-ls-bilbao.github.io${Astro.url.pathname}`} />
```

### 2. Image Alt Attributes ✅

**Purpose**: Ensure all images have non-empty alt attributes for accessibility.

**Tests**:
- Sample pages tested: `hero-b/index.html`, `servicios/index.html`, `contacto/index.html`
- Comprehensive scan of all HTML files for images
- Reports any images with missing or empty alt attributes

**Why it matters**: Alt text is crucial for:
- Screen readers for visually impaired users
- SEO - search engines index image alt text
- Fallback when images fail to load

### 3. H1 Heading Count ✅

**Purpose**: Ensure each page has exactly one H1 element.

**Tests**:
- Validates that every page (except redirect pages like `index.html`) has exactly one `<h1>`
- Verifies the H1 has non-empty text content
- Reports pages with 0 or multiple H1s

**Why it matters**: 
- SEO best practice - H1 indicates the main topic of the page
- Accessibility - screen readers use H1 for page navigation
- Proper heading hierarchy improves content structure

**Fix Applied**: The `mindfulness.astro` page had 2 H1s - one was changed to H2.

### 4. Accessibility Tests with @testing-library/dom ✅

**Purpose**: Use accessible queries to verify semantic HTML structure.

**Tests**:
- Verifies main headings are accessible via role="heading"
- Checks for navigation landmarks (`<nav>` elements)
- Ensures semantic HTML patterns

**Why it matters**: Using semantic HTML and ARIA roles improves accessibility and helps assistive technologies understand page structure.

## Running the Tests

### Build First
The tests run against built HTML files, so always build before testing:
```bash
pnpm run build
```

### Run HTML Validation Tests Only
```bash
pnpm test html-validation.spec.ts
```

### Run All Tests
```bash
pnpm test
```

### Watch Mode
```bash
pnpm test html-validation.spec.ts --watch
```

## Test Results

All tests passing ✅:
- **52 HTML files** tested across the site
- **~50 individual pages** validated (excluding redirect pages)
- **All images** have alt attributes
- **All pages** have canonical links
- **All pages** have exactly one H1

## Configuration Changes

### vitest.config.ts
Changed environment from `node` to `jsdom` to support HTML parsing:
```typescript
export default defineConfig({
  test: {
    environment: 'jsdom', // Required for HTML/DOM testing
    // ...
  },
});
```

### Dependencies Added
```json
{
  "devDependencies": {
    "@testing-library/dom": "^10.4.1",
    "jsdom": "^27.2.0"
  }
}
```

## Files Modified

1. **`vitest.config.ts`** - Changed environment to jsdom
2. **`src/layouts/Base.astro`** - Added canonical link tag
3. **`src/pages/mindfulness.astro`** - Fixed duplicate H1 (changed to H2)

## Best Practices Enforced

✅ **SEO**:
- Canonical URLs on all pages
- Single H1 per page
- Proper heading hierarchy

✅ **Accessibility**:
- Alt text on all images
- Semantic HTML structure
- Navigation landmarks

✅ **Quality Assurance**:
- Automated validation prevents regressions
- Tests run against production build
- Clear error messages for debugging

## Future Enhancements

Potential additions to the test suite:
- Meta description validation
- Open Graph tags validation
- Twitter Card tags validation
- Link validation (no broken links)
- Performance metrics (lighthouse scores)
- Structured data validation (JSON-LD)
