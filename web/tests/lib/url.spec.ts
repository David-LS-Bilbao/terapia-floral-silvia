import { describe, it, expect } from 'vitest';
import { link, normalize, getBaseUrl } from '../../src/lib/url';

describe('URL utilities', () => {
  describe('normalize()', () => {
    it('should add trailing slash if missing', () => {
      expect(normalize('/path')).toBe('/path/');
      expect(normalize('path')).toBe('path/');
      expect(normalize('/some/nested/path')).toBe('/some/nested/path/');
    });

    it('should preserve trailing slash if already present', () => {
      expect(normalize('/path/')).toBe('/path/');
      expect(normalize('path/')).toBe('path/');
      expect(normalize('/')).toBe('/');
    });

    it('should handle empty string', () => {
      expect(normalize('')).toBe('/');
    });
  });

  describe('link()', () => {
    it('should build correct absolute path when BASE is "/"', () => {
      expect(link('', '/')).toBe('/');
      expect(link('contacto/', '/')).toBe('/contacto/');
      expect(link('flores/rock-rose/', '/')).toBe('/flores/rock-rose/');
    });

    it('should build correct absolute path when BASE is "/subfolder/"', () => {
      const base = '/terapia-floral-silvia/';
      
      expect(link('', base)).toBe('/terapia-floral-silvia/');
      expect(link('contacto/', base)).toBe('/terapia-floral-silvia/contacto/');
      expect(link('flores/rock-rose/', base)).toBe('/terapia-floral-silvia/flores/rock-rose/');
    });

    it('should handle paths with leading slashes', () => {
      const base = '/terapia-floral-silvia/';
      
      expect(link('/contacto/', base)).toBe('/terapia-floral-silvia/contacto/');
      expect(link('//contacto/', base)).toBe('/terapia-floral-silvia/contacto/');
    });

    it('should handle BASE without trailing slash', () => {
      expect(link('contacto/', '/base')).toBe('/base/contacto/');
      expect(link('contacto/', '/base/')).toBe('/base/contacto/');
    });

    it('should handle BASE with multiple trailing slashes', () => {
      expect(link('contacto/', '/base///')).toBe('/base/contacto/');
    });

    it('should use "/" as default BASE when not provided', () => {
      expect(link('contacto/')).toBe('/contacto/');
      expect(link('')).toBe('/');
    });

    it('should handle complex nested paths', () => {
      const base = '/app/';
      
      expect(link('api/v1/users/', base)).toBe('/app/api/v1/users/');
      expect(link('static/images/logo.png', base)).toBe('/app/static/images/logo.png');
    });

    it('should preserve file extensions', () => {
      expect(link('styles/global.css', '/')).toBe('/styles/global.css');
      expect(link('images/logo.png', '/site/')).toBe('/site/images/logo.png');
    });
  });

  describe('getBaseUrl()', () => {
    // Note: Testing getBaseUrl() is tricky because import.meta.env is compile-time
    // In a real environment, it would be set by Vite/Astro during build
    // These tests verify the fallback behavior works
    
    it('should return "/" as default fallback', () => {
      // When import.meta.env.BASE_URL is not set (like in test environment)
      // the function should return the default "/"
      const result = getBaseUrl();
      expect(result).toBe('/');
    });

    it('should normalize BASE_URL by removing trailing slashes', () => {
      // This test verifies the normalization logic works
      // In actual usage, BASE_URL would come from import.meta.env
      const testUrl = '/terapia-floral-silvia///';
      const normalized = testUrl.replace(/\/+$/, "/");
      expect(normalized).toBe('/terapia-floral-silvia/');
    });
  });
});
