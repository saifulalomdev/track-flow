import { Card } from '../ui/card'
import { Button } from '../ui/button'
import {
    MoreVertical,
    CheckCircle2,
    AlertCircle,
    Code2,
    Globe,
    Play
} from 'lucide-react'
import { Badge } from '../ui/badge'
import type { Site } from '@/db/schema'
import CopyToClipboard from '../ui/copy-to-clipboard'
import { getBaseUrl } from '@/lib/get-base-url'

interface SiteCardProps extends Site {
    onUpdate?: () => void;
    onDelete?: () => void;
}

export default function SiteCard({ id, url, title, isActive }: SiteCardProps) {

    const scriptUrl = `${getBaseUrl()}/js/script.js`;
    const trackingScript = `<script async defer src="${scriptUrl}" data-website-id="${id}"></script>`;

    return (
        <Card key={id} className="border-white/10 bg-background/50 rounded-md overflow-hidden justify-between gap-6 p-6 flex flex-col md:flex-row">


            <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl relative">
                    <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <div className='flex gap-3'>
                        <h3 className="font-bold text-lg">{title}</h3>
                        {isActive ? <Badge>Active</Badge> : <Badge variant="destructive">Inactive</Badge>}
                    </div>
                    <h3 className="text-sm">{url}</h3>
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
                <Button variant="outline" className="gap-2">
                    <Play className="w-4 h-4" /> Test
                </Button>
                <Button variant="outline" size="icon">
                    <MoreVertical className="w-4 h-4" />
                </Button>
            </div>
        </Card>
    )
}
