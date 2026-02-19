// features/sites/hooks/use-sites.ts
import { useState, useEffect } from 'react';
import { siteApi } from './site-api';
import type { SiteFormData } from './schema';

export const useSites = () => {
    const [sites, setSites] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Initial Fetch
    useEffect(() => {
        const fetchSites = async () => {
            setIsLoading(true);
            try {
                const data = await siteApi.getAll();
                setSites(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSites();
    }, []);

    // CREATE: Optimistic Add
    const createSite = async (formData: SiteFormData) => {
        const previousSites = [...sites];
        const optimisticSite = { 
            ...formData, 
            id: `temp-${Date.now()}`, 
            isOptimistic: true 
        };

        setSites((prev) => [...prev, optimisticSite]);

        try {
            const savedSite = await siteApi.create(formData);
            setSites((prev) => 
                prev.map(s => s.id === optimisticSite.id ? savedSite : s)
            );
        } catch (err) {
            setSites(previousSites);
            setError(err as Error);
        }
    };

    // UPDATE: Optimistic Edit
    const updateSite = async (id: string, formData: SiteFormData) => {
        const previousSites = [...sites];
        
        // Apply update locally immediately
        setSites((prev) => 
            prev.map(s => s.id === id ? { ...s, ...formData } : s)
        );

        try {
            const updatedSite = await siteApi.update(id, formData);
            // Sync with server response (in case server modified data)
            setSites((prev) => 
                prev.map(s => s.id === id ? updatedSite : s)
            );
        } catch (err) {
            setSites(previousSites); // Rollback
            setError(err as Error);
        }
    };

    // DELETE: Optimistic Remove
    const deleteSite = async (id: string) => {
        const previousSites = [...sites];

        // Remove locally immediately
        setSites((prev) => prev.filter(s => s.id !== id));

        try {
            await siteApi.delete(id);
        } catch (err) {
            setSites(previousSites); // Put it back if delete fails
            setError(err as Error);
            alert("Could not delete the site. Restoring item.");
        }
    };

    return { 
        sites, 
        isLoading, 
        error, 
        createSite, 
        updateSite, 
        deleteSite 
    };
};