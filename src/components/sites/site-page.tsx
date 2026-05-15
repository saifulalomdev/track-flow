// src/components/sites/site-page.tsx
import React, { useState } from "react";
import { actions } from "astro:actions";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SiteCard from "@/components/sites/site-card";
import DomainEmptyState from "@/components/sites/domain-empty-state";
import type { Site } from "@/db/schema";

interface SitePageProps {
  initialWebsites: Site[];
}

export default function SitePage({ initialWebsites }: SitePageProps) {
  const [sites, setSites] = useState<Site[] | []>(initialWebsites)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<Site | null>(null);

  // Form Field States (Matching your Drizzle/Zod single source of truth schema)
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // 1. Hook for Create Action
  const createAction = useAction(actions.createSite, {
    successMessage: "Website created successfully!",
    onSuccess: () => {
      setIsDialogOpen(false);
      window.location.reload();
    },
  });

  // 2. Hook for Update Action
  const updateAction = useAction(actions.updateSite, {
    successMessage: "Website updated successfully!",
    onSuccess: () => {
      setIsDialogOpen(false);
      window.location.reload();
    },
  });

  // 3. Hook for Delete Action
  const deleteAction = useAction(actions.deleteSite, {
    successMessage: "Website deleted successfully!",
    onSuccess: () => {
      window.location.reload();
    },
  });

  const isLoading = createAction.isLoading || updateAction.isLoading || deleteAction.isLoading;

  // Open modal for Creating
  const handleOpenCreate = () => {
    setEditingSite(null);
    setTitle("");
    setUrl("");
    setIsDialogOpen(true);
  };

  // Open modal for Updating
  const handleOpenUpdate = (site: Site) => {
    setEditingSite(site);
    setTitle(site.title);
    setUrl(site.url);
    setIsDialogOpen(true);
  };

  // Handle Save (Dispatches the payload up to your Edge Services through the hooks)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    if (editingSite) {
      updateAction.execute({ id: editingSite.id, title, url });
    } else {
      createAction.execute({ title, url });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-3 justify-between md:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Websites</h1>
          <p className="text-muted-foreground">Track and manage your websites.</p>
        </div>
        <Button onClick={handleOpenCreate} disabled={isLoading} className="gap-2 w-full md:w-auto">
          <Plus className="w-4 h-4" /> Add New Site
        </Button>
      </div>

      {/* Grid/List of Sites */}
      {sites.length === 0 ? (
        <DomainEmptyState />
      ) : (
        <div className="space-y-4">
          {sites.map((site) => (
            <SiteCard
              {...site}
              onUpdate={() => handleOpenUpdate(site)}
            />
          ))}
        </div>
      )}

      {/* Shared Dialog for Create / Update */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-106">
          <DialogHeader>
            <DialogTitle>
              {editingSite ? "Update Website" : "Add New Website"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Website Name</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
                placeholder="My Awesome App"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
                placeholder="https://example.com"
                required
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : editingSite ? "Save Changes" : "Create Site"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}