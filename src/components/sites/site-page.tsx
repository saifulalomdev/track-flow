// src/components/sites/site-page.tsx
import { useState } from "react";
import SiteForm from "./site-form";
import { Plus } from "lucide-react";
import { actions } from "astro:actions";
import type { Site } from "@/db/schema";
import { useAction } from "@/hooks/use-action";
import { PageHeader } from "../ui/page-header";
import { Button } from "@/components/ui/button";
import SiteCard from "@/components/sites/site-card";
import DomainEmptyState from "@/components/sites/domain-empty-state";
import ErrorAlert from "../ui/error-alart";

interface SitePageProps {
  initialWebsites: Site[];
  errorMsg: string | null
}

const siteDefaultValue: Site = {
  id: "",
  isActive: true,
  title: "",
  url: ""
}
export default function SitePage({ initialWebsites, errorMsg }: SitePageProps) {
  const [sites, setSites] = useState<Site[] | []>(initialWebsites)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<Site>(siteDefaultValue);

  // 1. Hook for Create Action
  const createAction = useAction(actions.createSite, {
    successMessage: "Website created successfully!",
    onSuccess: ({ data }) => {
      if (data && "id" in data) {
        setSites((prevSites) => [...prevSites, data as Site]);
      }
      setIsDialogOpen(false);
    },
  });

  // 2. Hook for Update Action
  const updateAction = useAction(actions.updateSite, {
    successMessage: "Website updated successfully!",
    onSuccess: ({ data }) => {
      if (data && data.id) {
        setSites((prevSites) => prevSites.map((site) => site.id === data.id ? (data as Site) : site))
      }
      setIsDialogOpen(false);
    }
  });

  // 3. Hook for Delete Action
  const deleteAction = useAction(actions.deleteSite, {
    successMessage: "Website deleted successfully!",
    onSuccess: ({ data: { id } }) => {
      if (id) {
        setSites((prevSites) => prevSites.filter((site) => site.id !== id));
      }
      setIsDialogOpen(false);
    },
  });

  // 4. Hook for Script Verification Action
  const verifyAction = useAction(actions.verifyTrackingScript, {
    successMessage: "Tracking script verified successfully!",
    loadingMessage: "Verifying tracking script placement...",
  });

  const isLoading =
    createAction.isLoading ||
    updateAction.isLoading ||
    deleteAction.isLoading ||
    verifyAction.isLoading

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
      updateAction.execute(data);
    } else {
      createAction.execute(restData);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <ErrorAlert errorMsg={errorMsg} />
      <PageHeader
        title="Websites"
        description="Track and manage your websites."
      >
        <Button onClick={handleOpenCreate} disabled={isLoading} className="gap-2 w-full md:w-auto">
          <Plus className="w-4 h-4" /> Add New Site
        </Button>
      </PageHeader>

      {/* Grid/List of Sites */}
      {!errorMsg && sites.length === 0 ? (<DomainEmptyState />) : (
        <div className="space-y-4">
          {sites.map((site) => (
            <SiteCard
              {...site}
              key={site.id}
              onUpdate={() => handleOpenUpdate(site)}
              onDelete={() => deleteAction.execute({ id: site.id })}
              onTest={() => verifyAction.execute({ url: site.url, websiteId: site.id })}
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