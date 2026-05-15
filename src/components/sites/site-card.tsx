import { Card } from '../ui/card'
import { Button } from "@/components/ui/button"
import {
    Play,
    Globe,
    Trash2,
    Pencil
} from 'lucide-react'
import type { Site } from '@/db/schema'
import CopyToClipboard from '../ui/copy-to-clipboard'
import { getBaseUrl } from '@/lib/get-base-url'

interface SiteCardProps extends Site {
    onUpdate?: () => void;
    onDelete?: () => void;
    onTest?: () => void;
}

export default function SiteCard({
    id,
    url,
    title,
    isActive,
    onTest,
    onDelete,
    onUpdate
}: SiteCardProps) {

    const scriptUrl = `${getBaseUrl()}/js/script.js`;
    const trackingScript = `<script async defer src="${scriptUrl}" data-website-id="${id}"></script>`;

    return (
        <Card key={id} className="border-white/10 bg-background/50 justify-between gap-6 p-6 flex flex-col md:flex-row">
            <div className="flex items-center gap-4">
                <Globe className="w-6 h-6 text-primary" />
                <div>
                    <h3 className="font-bold text-lg">{title}</h3>
                    <a href={url} target='_blank' className="text-sm opacity-70 underline">{url}</a>
                </div>
            </div>

            {/* Site actions */}

            <div className="flex items-center gap-2">
                <CopyToClipboard
                    title="Copy script"
                    data={trackingScript}
                    successMessage="Tracking script copied to clipboard!"
                    errorMessage="Failed to copy script. Please try again."
                />
                <Button onClick={onTest} variant="outline" size="icon">
                    <Play className="w-4 h-4" />
                </Button>
                <Button onClick={onUpdate} variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                </Button>

                <Button onClick={onDelete} variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    )
}
