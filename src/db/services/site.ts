// src/db/services/site.ts
import { eq } from "drizzle-orm";
import { sites } from "../schema"; 
import type { NewSite, Site } from "../schema"; // Importing single source of truth inferred types
import type { D1Instance } from "@/lib/get-db";

export const siteService = {
  /**
   * CREATE: Inserts a new site using the inferred type directly
   */
  async create(db: D1Instance, data: NewSite): Promise<Site> {
    const [newSite] = await db
      .insert(sites)
      .values(data)
      .returning();
      
    return newSite;
  },

  /**
   * UPDATE: Updates site settings using single source of truth schemas
   */
  async update(db: D1Instance, id: string, data: Partial<NewSite>): Promise<Site> {
    const [updatedSite] = await db
      .update(sites)
      .set(data) 
      .where(eq(sites.id, id))
      .returning();
      
    return updatedSite;
  },

  /**
   * DELETE: Removes a site profile from the system securely
   */
  async delete(db: D1Instance, id: string): Promise<Site> {
    const [deletedSite] = await db
      .delete(sites)
      .where(eq(sites.id, id))
      .returning();
      
    return deletedSite;
  }
};