import { Card } from '../ui/card'
import { Button } from "@/components/ui/button"
import {
    Play,
    Trash2,
    Pencil,
    AlertCircle,
    CheckCircle2,
} from 'lucide-react'
import type { Site } from '@/db/schema'
import CopyToClipboard from '../ui/copy-to-clipboard'
import { getBaseUrl } from '@/lib/get-base-url'
import { cn } from '@/lib/utils'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface SiteCardProps extends Site {
    onUpdate?: () => void;
    onDelete?: () => void;
    onTest?: () => void;
    isDeleting?: boolean;
    
}

export default function SiteCard({
    id,
    url,
    title,
    isActive,
    isDeleting,
    onTest,
    onDelete,
    onUpdate
}: SiteCardProps) {

    const scriptUrl = `${getBaseUrl()}/js/script.js`;
    const trackingScript = `<script async defer src="${scriptUrl}" data-website-id="${id}"></script>`;

    return (
        <Card key={id} className="border-white/10 bg-background/50 justify-between gap-6 p-6 flex flex-col md:flex-row items-center">
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className={cn(
                    "p-2.5 rounded-xl border transition-colors duration-200",
                    isActive
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border-neutral-800 bg-neutral-900 text-neutral-500"
                )}>
                    {isActive ? (
                        <CheckCircle2 />
                    ) : (
                        <AlertCircle />
                    )}
                </div>

                <div>
                    <h3 className="font-bold text-lg tracking-tight">{title}</h3>
                    <a href={url} target='_blank' rel="noopener noreferrer" className="text-sm opacity-60 hover:opacity-100 transition-opacity underline block mt-0.5">
                        {url}
                    </a>
                </div>
            </div>

            {/* Site actions */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
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
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                account from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction variant="destructive" onClick={onDelete}>
                              {isDeleting ? "Deleteing website and its all data..." : "Delete Site & All related data"}  
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
        </Card>
    )
}