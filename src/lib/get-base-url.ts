/**
 * Safely gets the current site's base URL (protocol + host).
 * Works seamlessly across both Server-Side Rendering (SSR) and Client environments.
 * 
 * @param fallback - Optional URL to return if window object is undefined (e.g., on the server)
 * @returns The base URL string (e.g., "https://trackflow.com")
 */
export function getBaseUrl(fallback: string = "https://localhost:3000"): string {
  if (typeof window !== "undefined" && window.location) {
    return window.location.origin;
  }
  return fallback;
}