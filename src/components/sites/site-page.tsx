// src/components/sites/site-page.tsx
import React, { useState } from "react";
import { actions } from "astro:actions";
import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DomainEmptyState from "@/components/sites/domain-empty-state";
import SiteCard from "@/components/sites/site-card";
import type { Site } from "@/db/schema";
import SiteForm from "./site-form";

interface SitePageProps {
  initialWebsites: Site[];
}

const siteDefaultValue: Site = {
  id: "",
  isActive: true,
  title: "",
  url: ""
}
export default function SitePage({ initialWebsites }: SitePageProps) {
  const [sites, setSites] = useState<Site[] | []>(initialWebsites)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<Site>(siteDefaultValue);

  // 1. Hook for Create Action
  const createAction = useAction(actions.createSite, {
    successMessage: "Website created successfully!",
    onSuccess: () => { setIsDialogOpen(false); },
  });

  // 2. Hook for Update Action
  const updateAction = useAction(actions.updateSite, {
    successMessage: "Website updated successfully!",
    onSuccess: () => { setIsDialogOpen(false); },
  });

  // 3. Hook for Delete Action
  const deleteAction = useAction(actions.deleteSite, {
    successMessage: "Website deleted successfully!",
    onSuccess: () => {
      window.location.reload();
    },
  });

  const isLoading = createAction.isLoading || updateAction.isLoading || deleteAction.isLoading;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingSite(p => ({ ...p, [name]: value }))
  };
  // Open modal for Creating
  const handleOpenCreate = () => {
    setEditingSite(siteDefaultValue);
    setIsDialogOpen(true);
  };

  // Open modal for Updating
  const handleOpenUpdate = (site: Site) => {
    setEditingSite(site);
    setIsDialogOpen(true);
  };

  // Handle Save (Dispatches the payload up to your Edge Services through the hooks)
  const handleSave = (data: Partial<Site>) => {
    const { id, ...restData } = data;

    if (id) {
      updateAction.execute(editingSite);
    } else {
      createAction.execute(restData);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-3 justify-between md:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Websites</h1>
          <p className="text-muted-foreground">Track and manage your websites.</p>
        </div>
        <Button onClick={handleOpenCreate} disabled={isLoading} className="gap-2 w-full md:w-auto">
          <Plus className="w-4 h-4" /> Add New Site
        </Button>
      </div>

      {/* Grid/List of Sites */}
      {sites.length === 0 ? (<DomainEmptyState />) : (
        <div className="space-y-4">
          {sites.map((site) => (
            <SiteCard
              {...site}
              key={site.id}
              onUpdate={() => handleOpenUpdate(site)}
              onDelete={() => deleteAction.execute({ id: site.id })}
            />
          ))}
        </div>
      )}

      <SiteForm
        onSubmit={handleSave}
        isLoading={isLoading}
        initialData={editingSite}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
}