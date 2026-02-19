import { useState } from 'react'
import { Plus } from 'lucide-react'
import HelperCard from '~/components/sites/helper-card'
import SiteListItem from '~/components/sites/site-list-item'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { SiteForm } from '~/features/sites/form'
import type { SiteFormData } from '~/features/sites/schema'
import { useSites } from '~/features/sites/use-sites'

export default function Websites() {
    // 1. Destructure all needed methods from your custom hook
    const { createSite, isLoading, sites } = useSites();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // 2. Handle submission and close the dialog
    async function onSubmit(data: SiteFormData) {
        try {
            await createSite(data);
            setIsDialogOpen(false); // Close dialog on success
        } catch (error) {
            console.error("Failed to create site", error);
        }
    }

    return (
        <div className='space-y-6'>
            <div className="flex flex-col md:flex-row gap-3 justify-between md:items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Websites</h1>
                    <p className="text-muted-foreground">Track and manage your websites.</p>
                </div>

                {/* Controlled Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 w-full md:w-auto">
                            <Plus className="w-4 h-4" /> Add New Site
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Add site</DialogTitle>
                            <DialogDescription>
                                Enter the details of the website you want to track.
                            </DialogDescription>
                        </DialogHeader>

                        {/* 3. Pass the hook's loading state to the form */}
                        <SiteForm onSubmit={onSubmit} isLoading={isLoading} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* 4. Render the list dynamically */}
            <div className="grid gap-4">
                {sites.length === 0 && !isLoading && (
                    <p className="text-center py-10 text-muted-foreground">No websites added yet.</p>
                )}

                {sites.map((site) => (
                    <SiteListItem
                        key={site.id}
                        siteUrl={site.url || site.siteUrl} // Adjust based on your schema
                        // siteStatus={site.isOptimistic ? 'Pending...' : 'Active'}
                        // Pass down delete/update if your SiteListItem supports it:
                        // onDelete={() => deleteSite(site.id)}
                        // Static data for now as per your original code
                        siteStatus='Active'
                        avgDaily={site.avgDaily || 0}
                        lastPing={site.lastPing || 'Never'}
                        totalVisits={site.totalVisits || 0}
                    />
                ))}
            </div>

            <HelperCard />
        </div>
    )
}