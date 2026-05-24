import { createSiteSchema, updateSiteSchema } from "@/db/schema";
import { siteService } from "@/db/services/site";
import { getDb } from "@/lib/get-db";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const createSite = defineAction({
    accept: 'json',
    input: createSiteSchema as any,
    handler: async (input, context) => {
        const env = context.locals.runtime?.env;
        const db = getDb(env);

        const newSite = await siteService.create(db, input);
        return { success: true, data: newSite };
    },
})

// UPDATE SITE
export const updateSite = defineAction({
    accept: 'json',
    input: updateSiteSchema as any,
    handler: async (input, context) => {
        const env = context.locals.runtime?.env;
        const db = getDb(env);
        
        const { id, ...data } = input;
        const updatedSite = await siteService.update(db, id, data);
        return { success: true, data: updatedSite };
    },
})

// DELETE SITE
export const deleteSite = defineAction({
    accept: 'json',
    input: z.object({ id: z.string() }),
    handler: async (input, context) => {
        const env = context.locals.runtime?.env;
        const db = getDb(env);

        const deletedSite = await siteService.delete(db, input.id);
        return { success: true, data: deletedSite };
    },
})