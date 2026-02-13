import { Plus } from 'lucide-react'
import HelperCard from '~/components/sites/helper-card'
import SiteListItem from '~/components/sites/site-list-item'
import { Button } from '~/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'

export default function Websites() {
    return (
        <div className='space-y-6'>
            <div className="flex flex-col md:flex-row gap-3 justify-between md:items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Websites</h1>
                    <p className="text-muted-foreground">Track and manage your websites.</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="gap-2 w-full md:w-auto">
                            <Plus className="w-4 h-4" /> Add New Site
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Add site</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
            <SiteListItem
                avgDaily={300}
                lastPing='11'
                siteStatus='Active'
                siteUrl='d'
                totalVisits={300}

            />
            <SiteListItem
                avgDaily={300}
                lastPing='11'
                siteStatus='Active'
                siteUrl='d'
                totalVisits={300}

            />
            <HelperCard />
        </div>
    )
}
