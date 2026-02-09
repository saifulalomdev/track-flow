import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import { ENV } from "@/config/env";
import { db } from "@/db";
import { magicLink } from "better-auth/plugins"; // 1. Import the plugin

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, url, token }, request) => {
                // 3. Implement your email logic here
                console.log(`Sending magic link to ${email}: ${url}`);

                // Example using a hypothetical mail service:
                // await sendEmail({
                //     to: email,
                //     subject: "Login to your account",
                //     body: `Click here to login: ${url}`
                // });
            },
        }),
        nextCookies()
    ],
    socialProviders: {
        google: {
            clientId: ENV.GOOGLE_CLIENT_ID,
            clientSecret: ENV.GOOGLE_CLIENT_SECRET,
        },
        github: {
            clientSecret: ENV.GITHUB_CLIENT_SECRET,
            clientId: ENV.GITHUB_CLIENT_ID,
        }
    }

});