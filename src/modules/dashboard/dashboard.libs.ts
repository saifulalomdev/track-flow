export function formatPageTitle(title?: string) {
    if (!title?.trim()) {
        return 'Untitled page'
    }

    return title.length > 30
        ? `${title.slice(0, 30)}...`
        : title
}

export function formatPageUrl(url?: string) {
    if (!url?.trim()) {
        return 'No URL available'
    }

    return url
        .replace(/^(https?:\/\/)?(www\.)?/, '')
        .replace(/\/$/, '')
}

export function formatViews(views?: number | string) {
    const parsedViews = Number(views)

    if (Number.isNaN(parsedViews) || parsedViews < 0) {
        return '0'
    }

    return parsedViews.toLocaleString()
}

export const getCountryName = (code: string) => {
    try {
        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        return regionNames.of(code) || code;
    } catch {
        return code;
    }
};

export const getPlatformName = (referrer: string): string => {
    if (!referrer || referrer === "Direct" || referrer === "Direct / None") {
        return "Direct";
    }

    try {
        const url = new URL(referrer);
        // Extract hostname (e.g., "l.facebook.com")
        const host = url.hostname.toLowerCase();

        // Remove common subdomains and the TLD
        // This regex looks for common names between dots
        const parts = host.split('.');
        
        // Handle cases like "google.com" or "l.facebook.com"
        // We usually want the second to last part, unless it's a co.uk style
        if (parts.length >= 2) {
            const name = parts[parts.length - 2];
            
            // Capitalize the first letter
            return name.charAt(0).toUpperCase() + name.slice(1);
        }

        return host;
    } catch (e) {
        // If it's not a valid URL, return the original string
        return referrer;
    }
};

/**
 * Utility to get favicon details.
 * Returns either a remote URL string or a Lucide icon component name.
 */
export const getFaviconSource = (sourceName: string) => {
  if (!sourceName) return { type: 'icon', value: 'Globe' }; // Default fallback

  const cleanName = sourceName.trim().toLowerCase();

  // 1. Handle generic "Direct" traffic using a Lucide icon name
  if (cleanName === "direct") {
    return { type: 'icon', value: 'ArrowUpRight' }; // Lucide icon name
  }

  const domainMapping = {
    google: "google.com",
    perplexity: "perplexity.ai",
    brave: "brave.com",
    facebook: "facebook.com",
    saifulalom: "saifulalom.com",
  } as any;

  const domain = domainMapping[cleanName] || `${cleanName}.com`;

  // 2. Return the Google favicon URL for external sites
  return { 
    type: 'url', 
    value: `https://www.google.com/s2/favicons?domain=${domain}&sz=32` 
  };
};

export const calculateChange = (current: number, previous: number): string => {
    if (!previous || previous === 0) {
        // If there is no previous history but current has metrics, it's a 100% surge. Otherwise, 0%.
        return current > 0 ? "+100%" : "0%";
    }
    const variance = Math.round(((current - previous) / previous) * 100);
    return variance >= 0 ? `+${variance}%` : `${variance}%`;
};