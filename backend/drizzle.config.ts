import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.dev.vars' });

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema/index.ts',
  out: './drizzle/migrations',
  driver: "d1-http",
  dbCredentials: {
    // @ts-ignore
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    // @ts-ignore
    token: process.env.CLOUDFLARE_D1_TOKEN!,
    databaseId: "893a3b21-f6bf-4881-8337-ac11b0a23214",
  }
});