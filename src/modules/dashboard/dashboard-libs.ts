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