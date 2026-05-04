import { getDb } from "./db";
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export function initAuth(env: Env) {
  const db = getDb(env.DB);

  return betterAuth({
    database: drizzleAdapter(db, { provider: "sqlite" }),
    baseURL: env.BETTER_AUTH_URL,
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