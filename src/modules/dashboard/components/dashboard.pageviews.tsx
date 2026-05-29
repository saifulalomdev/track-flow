import { Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { PageviewItem } from '../dashboard.types'

// Wrap your mapping inside this elegant container
export function PageviewsCard({ pageviews }: { pageviews: PageviewItem[] }) {
    return (
        <Card className="border-white/10 bg-background/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    Top 5 pages
                </CardTitle>
                <CardDescription>Views</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {pageviews.slice(0, 5).map(({ title, url, views }, index) => (
                    <div
                        key={url || index}
                        className="flex w-full items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0"
                    >
                        <div className="flex flex-col gap-0.5 min-w-0 pr-4">
                            <h3 className="text-sm font-medium truncate text-foreground">
                                {title}
                            </h3>
                            <a
                                className="text-xs text-muted-foreground hover:text-primary hover:underline transition-colors truncate max-w-[250px]"
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {url.replace(/^(https?:\/\/)?(www\.)?/, '')} {/* Cleans up URL for elegance */}
                            </a>
                        </div>
                        <p>
                            {Number(views).toLocaleString()}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}