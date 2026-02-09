"use server";

import { RegisterInput } from "@/db/schema";
import { auth } from "@/lib/auth";
import { ActionResponse } from "@/types/action";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUpAction(data: RegisterInput): Promise<ActionResponse> {
    try {
        await auth.api.signUpEmail({
            body: {
                email: data.email,
                password: data.password,
                name: data.name,
            },
            headers: await headers()
        });

        // Redirects must happen outside of try/catch blocks in Next.js 
        // because redirect() technically throws a special error.
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to create account.",
        };
    }

    redirect("/dashboard"); 
}


export async function signInWithGoogle() {
    const res = await auth.api.signInSocial({
        body: {
            provider: "google",
            callbackURL: "/dashboard", // Where to go after Google success
        },
        headers: await headers(),
    });

    // Better Auth returns a 'url' property for social providers
    if (res?.url) {
        redirect(res.url); // Sends the user to Google's login page
    }
}

export async function signInWithGithub() {
    const res = await auth.api.signInSocial({
        body: {
            provider: "github",
            callbackURL: "/dashboard", // Where to go after Google success
        },
        headers: await headers(),
    });

    // Better Auth returns a 'url' property for social providers
    if (res?.url) {
        redirect(res.url); // Sends the user to Google's login page
    }
}