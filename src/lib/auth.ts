import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "./db";

export function initAuth(env: Env) {
    const db = getDb(env.DB);

    return betterAuth({
        database: drizzleAdapter(db, { provider: "sqlite" }),
        emailAndPassword: { enabled: true }
    })
}
