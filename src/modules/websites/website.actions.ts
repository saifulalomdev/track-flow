import { createSiteSchema, updateSiteSchema } from "@/db/schema";
import { ActionError, defineAction } from "astro:actions";
import { siteService } from "./website.repository";
import { getDb } from "@/lib/get-db";
import { z } from "astro:schema";

const PROTECTED_SITE_IDS = [
    "cfb90e7b-64c1-4fdf-b412-f4eb8dbec7e9",
    "e05c0555-df01-4a78-8575-929b12c47920"
];

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
        const { id, ...data } = input;

        // Strict guard clause
        if (PROTECTED_SITE_IDS.includes(id)) {
            throw new ActionError({
                code: "FORBIDDEN",
                message: "This site is a protected system resource and cannot be updated.",
            });
        }
        const env = context.locals.runtime?.env;
        const db = getDb(env);

        const updatedSite = await siteService.update(db, id, data);
        return { success: true, data: updatedSite };
    },
})

// DELETE SITE
export const deleteSite = defineAction({
    accept: 'json',
    input: z.object({ id: z.string() }),
    handler: async (input, context) => {

        if (PROTECTED_SITE_IDS.includes(input.id)) {
            throw new ActionError({
                code: "FORBIDDEN",
                message: "This site is a protected system resource and cannot be deleted.",
            });
        }
        const env = context.locals.runtime?.env;
        const db = getDb(env);

        const deletedSite = await siteService.delete(db, input.id);
        return { success: true, data: deletedSite };
    },
})