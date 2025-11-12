/**
 * URL utilities for handling base paths and link generation
 */

/**
 * Normalizes a path by ensuring it ends with a trailing slash
 * @param path - The path to normalize
 * @returns The normalized path with trailing slash
 */
export function normalize(path: string): string {
  return path.endsWith("/") ? path : path + "/";
}

/**
 * Builds an absolute URL path by combining BASE_URL with a relative path
 * @param path - The relative path to append to BASE_URL
 * @param baseUrl - The base URL (defaults to '/')
 * @returns The complete URL path
 */
export function link(path: string = "", baseUrl: string = "/"): string {
  // Normalize BASE_URL: remove multiple trailing slashes, ensure single trailing slash
  const trimmedBase = baseUrl.replace(/\/+$/, "");
  const normalizedBase = trimmedBase === "" ? "/" : trimmedBase + "/";
  
  // Remove leading slashes from path to avoid double slashes
  const cleanPath = path.replace(/^\/+/, "");
  
  return `${normalizedBase}${cleanPath}`;
}

/**
 * Gets the current BASE_URL from environment or returns default
 * @returns The BASE_URL for the application
 */
export function getBaseUrl(): string {
  // @ts-ignore - import.meta.env may not be typed in all contexts
  return (import.meta?.env?.BASE_URL ?? "/").replace(/\/+$/, "/");
}
