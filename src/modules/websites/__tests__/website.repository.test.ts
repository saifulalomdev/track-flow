import { site, siteRepository } from '@/db';
import { getDb } from '@/lib';
import { describe, it, beforeAll, expect } from 'vitest';
import { env } from 'cloudflare:workers';
import { eq, sql } from 'drizzle-orm';
import { SQLiteAsyncDialect } from 'drizzle-orm/sqlite-core';

// Instead of path.resolve, import the SQL files via an extension wrapper if needed, 
// or let wrangler handle migrations via your local wrangler.jsonc setup.
describe("Website repository integration test", () => {
    
    beforeAll(async () => {
        // If your getDb helper correctly initializes D1 out of env, ensure 
        // the wrangler.jsonc binding name matches what getDb expects.
        const db = getDb(env);
        const dialect = new SQLiteAsyncDialect();
        const [ createTableSql ] = dialect.getCreateTableQueries(site);
        await db.execute(sql.raw(createTableSql));
        
        
        // Note: For D1 local testing via Vitest Pool, migrations are usually auto-applied 
        // if specified in wrangler setup, or handled via the dynamic cloudflare worker context.
    });

    it("should create a new site", async () => {
        const db = getDb(env);

        const testMockSite = {
            title: "My Production Analytics App",
            url: "https://trackflow.dev",
            isActive: true
        };

        const createdSite = await siteRepository.create(db, testMockSite);

        // Assertions
        expect(createdSite).toBeDefined();
        expect(createdSite.id).toBeTypeOf("string"); 
        expect(createdSite.title).toBe(testMockSite.title);
        expect(createdSite.url).toBe(testMockSite.url);
        expect(createdSite.isActive).toBe(true);

        const [databaseRecord] = await db
            .select()
            .from(site)
            .where(eq(site.id, createdSite.id))
            .execute();

        expect(databaseRecord).toBeDefined();
        expect(databaseRecord.title).toBe(testMockSite.title);
    });
});