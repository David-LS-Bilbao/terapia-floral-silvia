import { describe, it, expect } from 'vitest';
import { normalizeSlug, validateEmail, capitalize, truncate } from '../../src/lib/utils';

describe('General utilities', () => {
  describe('normalizeSlug()', () => {
    it('should convert to lowercase', () => {
      expect(normalizeSlug('HELLO WORLD')).toBe('hello-world');
      expect(normalizeSlug('MixedCase')).toBe('mixedcase');
      expect(normalizeSlug('CamelCaseSlug')).toBe('camelcaseslug');
    });

    it('should trim leading and trailing spaces', () => {
      expect(normalizeSlug('  hello world  ')).toBe('hello-world');
      expect(normalizeSlug('\t\n  slug  \n\t')).toBe('slug');
    });

    it('should replace spaces with hyphens', () => {
      expect(normalizeSlug('hello world')).toBe('hello-world');
      expect(normalizeSlug('rock rose flower')).toBe('rock-rose-flower');
      expect(normalizeSlug('a b c d')).toBe('a-b-c-d');
    });

    it('should replace multiple consecutive spaces with single hyphen', () => {
      expect(normalizeSlug('hello     world')).toBe('hello-world');
      expect(normalizeSlug('a   b   c')).toBe('a-b-c');
    });

    it('should remove invalid characters (keep only alphanumeric, hyphens, underscores)', () => {
      expect(normalizeSlug('hello@world!')).toBe('helloworld');
      expect(normalizeSlug('slug#with$special%chars')).toBe('slugwithspecialchars');
      expect(normalizeSlug('test (123)')).toBe('test-123');
      expect(normalizeSlug('email@example.com')).toBe('emailexamplecom');
    });

    it('should preserve hyphens and underscores', () => {
      expect(normalizeSlug('already-hyphenated')).toBe('already-hyphenated');
      expect(normalizeSlug('with_underscore')).toBe('with_underscore');
      expect(normalizeSlug('mixed-slug_name')).toBe('mixed-slug_name');
    });

    it('should collapse multiple hyphens into one', () => {
      expect(normalizeSlug('hello---world')).toBe('hello-world');
      expect(normalizeSlug('a--b--c')).toBe('a-b-c');
    });

    it('should remove leading and trailing hyphens', () => {
      expect(normalizeSlug('-hello-')).toBe('hello');
      expect(normalizeSlug('--slug--')).toBe('slug');
    });

    it('should handle complex real-world cases', () => {
      expect(normalizeSlug('Rock Rose')).toBe('rock-rose');
      expect(normalizeSlug('White Chestnut')).toBe('white-chestnut');
      expect(normalizeSlug('Star of Bethlehem')).toBe('star-of-bethlehem');
      expect(normalizeSlug('  Wild Oat  ')).toBe('wild-oat');
    });

    it('should handle numbers correctly', () => {
      expect(normalizeSlug('Post 123')).toBe('post-123');
      expect(normalizeSlug('Version 2.0')).toBe('version-20');
    });

    it('should handle empty string', () => {
      expect(normalizeSlug('')).toBe('');
      expect(normalizeSlug('   ')).toBe('');
    });

    it('should handle strings with only invalid characters', () => {
      expect(normalizeSlug('!@#$%^&*()')).toBe('');
      expect(normalizeSlug('---')).toBe('');
    });
  });

  describe('validateEmail()', () => {
    it('should return true for valid emails', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test.user@domain.co.uk')).toBe(true);
      expect(validateEmail('name+tag@example.org')).toBe(true);
      expect(validateEmail('biomiflor@hotmail.com')).toBe(true);
      expect(validateEmail('admin@localhost.dev')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('notanemail')).toBe(false);
      expect(validateEmail('missing@domain')).toBe(false);
      expect(validateEmail('@nodomain.com')).toBe(false);
      expect(validateEmail('noatsign.com')).toBe(false);
      expect(validateEmail('spaces in@email.com')).toBe(false);
      expect(validateEmail('double@@domain.com')).toBe(false);
    });

    it('should trim whitespace before validating', () => {
      expect(validateEmail('  user@example.com  ')).toBe(true);
      expect(validateEmail('\ttest@domain.org\n')).toBe(true);
    });

    it('should handle edge cases', () => {
      expect(validateEmail('a@b.c')).toBe(true);
      expect(validateEmail('user@sub.domain.example.com')).toBe(true);
      expect(validateEmail('user..name@example.com')).toBe(true); // Technically valid in our simple regex
    });

    it('should reject emails with spaces', () => {
      expect(validateEmail('user name@example.com')).toBe(false);
      expect(validateEmail('user@exam ple.com')).toBe(false);
    });

    it('should reject malformed emails', () => {
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('user@domain.')).toBe(false);
      // Note: Our simple regex allows .user@domain.com as technically valid
      // For stricter validation, use a more complex regex or library
    });
  });

  describe('capitalize()', () => {
    it('should capitalize first letter and lowercase the rest', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('mIxEd')).toBe('Mixed');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });
  });

  describe('truncate()', () => {
    it('should truncate text longer than maxLength', () => {
      const text = 'This is a long text that needs to be truncated';
      expect(truncate(text, 20)).toBe('This is a long text...');
      expect(truncate(text, 10)).toBe('This is a...');
    });

    it('should not truncate text shorter than maxLength', () => {
      expect(truncate('Short text', 20)).toBe('Short text');
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('should handle text exactly at maxLength', () => {
      expect(truncate('Exact', 5)).toBe('Exact');
    });

    it('should trim trailing spaces before adding ellipsis', () => {
      const result = truncate('Hello World   ', 8);
      expect(result).toBe('Hello Wo...');
      expect(result).not.toContain('   ...');
    });
  });
});
