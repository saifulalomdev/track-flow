// features/sites/services/site-api.ts
import { apiClient } from "~/lib/api-client";
import type { SiteFormData } from "./schema";

export const siteApi = {
    // READ: Get all sites
    getAll: async () => {
        const response = await apiClient.get('/sites');
        return response.data;
    },

    // CREATE: Add a new site
    create: async (data: SiteFormData) => {
        const response = await apiClient.post('/sites', data);
        return response.data;
    },

    // UPDATE: Modify an existing site
    update: async (id: string, data: SiteFormData) => {
        const response = await apiClient.patch(`/sites/${id}`, data);
        return response.data;
    },

    // DELETE: Remove a site
    delete: async (id: string) => {
        const response = await apiClient.delete(`/sites/${id}`);
        return response.data;
    },
};