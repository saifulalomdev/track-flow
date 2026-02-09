"use server";

import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types/action";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Signs in a user using a Magic Link.
 * This sends an email to the user with a secure verification link.
 */
export async function signInWithMagicLink(email: string): Promise<ActionResponse> {
    try {
        await auth.api.signInMagicLink({
            body: {
                email,
                callbackURL: "/dashboard",
            },
            headers: await headers(),
        });

        return { 
            success: true, 
            message: "Check your email for the login link!" 
        };
    } catch (error) {
        console.error("Magic Link Error:", error);
        return { 
            success: false, 
            message: "Somethin went wrong"
        };
    }
}

/**
 * Initiates Google OAuth flow.
 */
export async function signInWithGoogle() {
    const res = await auth.api.signInSocial({
        body: {
            provider: "google",
            callbackURL: "/dashboard",
        },
        headers: await headers(),
    });

    if (res?.url) {
        redirect(res.url);
    }
}

/**
 * Initiates GitHub OAuth flow.
 */
export async function signInWithGithub() {
    const res = await auth.api.signInSocial({
        body: {
            provider: "github",
            callbackURL: "/dashboard",
        },
        headers: await headers(),
    });

    if (res?.url) {
        redirect(res.url);
    }
}

/**
 * Destroys the user session and redirects to sign-in.
 */
export async function signOut() {
    await auth.api.signOut({
        headers: await headers()
    });
    redirect("/sign-in");
}