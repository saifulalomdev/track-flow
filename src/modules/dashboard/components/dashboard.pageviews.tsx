import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import type { PageviewItem } from '../dashboard.types'
import { formatPageTitle, formatPageUrl, formatViews } from '../dashboard-libs'
import { truncateText } from '@/lib/truncate-text'

type PageviewsCardProps = {
    pageviews?: PageviewItem[]
}

export function PageviewsCard({
    pageviews = [],
}: PageviewsCardProps) {
    const topPages = pageviews.slice(0, 5)

    return (
        <Card className="border-white/10 bg-background/50 w-full backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    Top Pages
                </CardTitle>

                <CardDescription>
                    {topPages.length} page views
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                {topPages.length === 0 ? (
                    <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
                        No page views available yet.
                    </div>
                ) : (
                    topPages.map((page, index) => {
                        const title = formatPageTitle(page?.title)
                        const url = formatPageUrl(page?.url)
                        const views = formatViews(page?.views)

                        return (
                            <div
                                key={page?.url || index}
                                className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0"
                            >
                                <div className="min-w-0 flex-1 pr-4">
                                    <h3 className="truncate text-sm font-medium text-foreground">
                                        {truncateText(title, 80)}
                                    </h3>

                                    {page?.url ? (
                                        <a
                                            href={page.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-block truncate text-xs text-muted-foreground transition-colors hover:text-primary hover:underline"
                                        >
                                            {truncateText(url, 30)}
                                        </a>
                                    ) : (
                                        <p className="truncate text-xs text-muted-foreground">
                                            No URL available
                                        </p>
                                    )}
                                </div>

                                <p className="shrink-0 text-sm font-medium">
                                    {views}
                                </p>
                            </div>
                        )
                    })
                )}
            </CardContent>
        </Card>
    )
}