import { describe, it, expect } from 'vitest';

describe('URL utilities', () => {
  it('should handle base URL correctly', () => {
    const base = '/terapia-floral-silvia/';
    const path = 'contacto/';
    const fullUrl = base + path;
    
    expect(fullUrl).toBe('/terapia-floral-silvia/contacto/');
  });

  it('should normalize URLs properly', () => {
    const normalize = (p: string) => (p.endsWith("/") ? p : p + "/");
    
    expect(normalize('/path')).toBe('/path/');
    expect(normalize('/path/')).toBe('/path/');
  });
});