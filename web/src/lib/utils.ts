/**
 * General utility functions
 */

/**
 * Normalizes a string to be used as a URL slug
 * - Converts to lowercase
 * - Trims leading/trailing spaces
 * - Replaces spaces with hyphens
 * - Removes invalid characters (keeps only alphanumeric, hyphens, and underscores)
 * 
 * @param text - The text to normalize
 * @returns The normalized slug
 */
export function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")           // Replace spaces with hyphens
    .replace(/[^a-z0-9\-_]/g, "")   // Remove invalid characters
    .replace(/\-+/g, "-")           // Collapse multiple hyphens
    .replace(/^-+|-+$/g, "");       // Remove leading/trailing hyphens
}

/**
 * Validates if a string is a valid email address
 * Uses a simple but effective regex pattern
 * 
 * @param email - The email string to validate
 * @returns true if valid email format, false otherwise
 */
export function validateEmail(email: string): boolean {
  // Simple but effective email validation regex
  // Matches: user@domain.ext
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(email.trim());
}

/**
 * Capitalizes the first letter of a string
 * @param text - The text to capitalize
 * @returns The text with first letter capitalized
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Truncates text to a maximum length and adds ellipsis if needed
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns The truncated text with ellipsis if needed
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
