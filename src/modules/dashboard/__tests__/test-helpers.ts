import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "@/db/schema";
import path from "path";

export async function initTestDb() {
  // 1. Create a completely isolated, in-memory SQLite database
  const sqlite = new Database(":memory:");
  
  // 2. Instantiate the Drizzle instance using the SQLite driver
  const db = drizzle(sqlite, { schema });

  // 3. Automatically run your migrations to build the schema before tests run
  // Adjust the path relative to where your drizzle migrations folder lives (usually in the root)
  const migrationsFolder = path.resolve(process.cwd(), "./drizzle"); 
  
  try {
    migrate(db, { migrationsFolder });
  } catch (error) {
    console.error("Failed to migrate test database. Ensure your migrations folder path is correct.", error);
    throw error;
  }

  // 4. Return a mocked D1 client structure that matches what your repository expects
  return {
    run: async (query: any) => {
      // Drizzle's raw SQL queries can be parsed and run directly on our memory DB
      const { sql, params } = query.toSQL();
      const statement = sqlite.prepare(sql);
      
      // Mimic Cloudflare D1's returned .run() schema object wrapper
      const results = statement.all(...params);
      return { results, success: true };
    },
    // Add dummy versions of other D1 methods if your repository calls them later
    batch: async () => [],
    prepare: (sql: string) => ({ bind: () => {} }),
  } as any;
}