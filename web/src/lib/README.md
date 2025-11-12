# Helper Utilities

This directory contains reusable utility functions for the Terapia Floral Silvia Adame website.

## Modules

### `url.ts` - URL and Path Utilities

Helper functions for building and normalizing URLs with support for base paths (useful for GitHub Pages deployment).

**Functions:**

- **`normalize(path: string): string`**
  - Ensures a path ends with a trailing slash
  - Example: `normalize('/path')` → `'/path/'`

- **`link(path: string, baseUrl: string): string`**
  - Builds absolute URL paths by combining BASE_URL with relative paths
  - Handles various edge cases (leading/trailing slashes, multiple slashes)
  - Example: `link('contacto/', '/terapia-floral-silvia/')` → `'/terapia-floral-silvia/contacto/'`

- **`getBaseUrl(): string`**
  - Retrieves the BASE_URL from environment variables (Astro/Vite)
  - Falls back to `'/'` if not set
  - Example: `getBaseUrl()` → `'/terapia-floral-silvia/'`

**Usage:**

```typescript
import { link, normalize, getBaseUrl } from '@/lib/url';

// In Astro component
const base = getBaseUrl();
const contactUrl = link('contacto/', base);
// → '/terapia-floral-silvia/contacto/'
```

### `utils.ts` - General Utilities

Common utility functions for text processing and validation.

**Functions:**

- **`normalizeSlug(text: string): string`**
  - Converts text to URL-friendly slug format
  - Lowercase, trim spaces, replace spaces with hyphens
  - Removes invalid characters (keeps only alphanumeric, hyphens, underscores)
  - Example: `normalizeSlug('Rock Rose')` → `'rock-rose'`

- **`validateEmail(email: string): boolean`**
  - Validates email format using regex
  - Trims whitespace before validation
  - Example: `validateEmail('user@example.com')` → `true`

- **`capitalize(text: string): string`**
  - Capitalizes first letter, lowercases the rest
  - Example: `capitalize('hello')` → `'Hello'`

- **`truncate(text: string, maxLength: number): string`**
  - Truncates text to maximum length with ellipsis
  - Trims trailing spaces before adding ellipsis
  - Example: `truncate('Long text...', 10)` → `'Long text...'`

**Usage:**

```typescript
import { normalizeSlug, validateEmail, truncate } from '@/lib/utils';

// Generate slug from flower name
const slug = normalizeSlug('Star of Bethlehem');
// → 'star-of-bethlehem'

// Validate email in contact form
if (validateEmail(userInput)) {
  // Send email
}

// Truncate description for card
const shortDesc = truncate(fullDescription, 100);
```

## Testing

All utility functions have comprehensive unit tests using Vitest.

**Run tests:**

```bash
pnpm test tests/lib/
```

**Test coverage:**

- `tests/lib/url.spec.ts` - URL utilities (13 tests)
- `tests/lib/utils.spec.ts` - General utilities (25 tests)

**Test cases include:**

- ✅ Edge cases (empty strings, special characters)
- ✅ Boundary conditions (exact length, single character)
- ✅ Real-world scenarios (flower names, email formats)
- ✅ Normalization behavior (multiple slashes, spaces)

## Development

When adding new utilities:

1. Add function to appropriate module (`url.ts` or `utils.ts`)
2. Add JSDoc documentation with examples
3. Write unit tests covering:
   - Happy path (expected usage)
   - Edge cases (empty, null, special chars)
   - Boundary conditions
   - Real-world examples
4. Run tests: `pnpm test`
5. Update this README

## Examples

### Building Navigation Links

```typescript
// In Nav.astro
import { link, normalize, getBaseUrl } from '@/lib/url';

const base = getBaseUrl();
const links = [
  { href: normalize(link('hero-b/', base)), label: 'Inicio' },
  { href: normalize(link('servicios/', base)), label: 'Servicios' },
  { href: normalize(link('tarifas/', base)), label: 'Tarifas' },
  { href: normalize(link('contacto/', base)), label: 'Contacto' },
];
```

### Creating Flower Page Slugs

```typescript
// In flores data processing
import { normalizeSlug } from '@/lib/utils';

const flores = [
  { name: 'Rock Rose', slug: normalizeSlug('Rock Rose') },
  { name: 'Star of Bethlehem', slug: normalizeSlug('Star of Bethlehem') },
];
// Results in: 'rock-rose', 'star-of-bethlehem'
```

### Contact Form Validation

```typescript
// In contact form handler
import { validateEmail } from '@/lib/utils';

function handleSubmit(formData: FormData) {
  const email = formData.get('email') as string;
  
  if (!validateEmail(email)) {
    return { error: 'Invalid email format' };
  }
  
  // Process form...
}
```

## Notes

- All functions are pure (no side effects)
- Type-safe with TypeScript
- Tree-shakeable (use ES modules)
- Well-tested (100% coverage on critical paths)
- Documented with JSDoc for IDE autocomplete
