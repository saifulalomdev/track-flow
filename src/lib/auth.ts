import { getDb } from "./db";
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export function initAuth(env: Env) {
  const db = getDb(env.DB);

  return betterAuth({
    baseURL: env.BETTER_AUTH_URL,

    database: drizzleAdapter(db, { provider: "sqlite" }),
    
    emailAndPassword: { enabled: false },
    plugins: [
      magicLink({
        sendMagicLink: async ({ email, url }, ctx) => {
          console.log(email, url)
        }
      })
    ],
    advanced: {
      useSecureCookies: true,
    },
  });
}