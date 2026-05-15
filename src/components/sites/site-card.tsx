import { Card } from '../ui/card'
import { Button } from "@/components/ui/button"
import {
    Play,
    Globe,
    Trash2,
    EllipsisVerticalIcon,
    MoreVertical,
    ExternalLink,
    Pencil
} from 'lucide-react'
import type { Site } from '@/db/schema'
import CopyToClipboard from '../ui/copy-to-clipboard'
import { getBaseUrl } from '@/lib/get-base-url'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/custom-dropdown'

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
                    <h3 className="text-sm opacity-70">{url}</h3>
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
                <Button onClick={onTest} variant="outline" className="gap-2">
                    <Play className="w-4 h-4" /> Test
                </Button>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <MoreVertical className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={() => window.open(url, '_blank')}>
                            <ExternalLink className="mr-2 h-4 w-4" /> Visit Site
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={onUpdate}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit Site
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={onDelete} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Site
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Card>
    )
}
