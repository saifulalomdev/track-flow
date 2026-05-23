export function getBaseUrl(fallback: string = "https://localhost:3000"): string {
  if (typeof window !== "undefined" && window.location) {
    return window.location.origin;
  }
  return fallback;
}