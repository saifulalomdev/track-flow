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