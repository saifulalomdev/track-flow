"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOutAction() {
    const cookieStore = await cookies();

    // 1. Delete the session cookie
    cookieStore.delete("auth_token");

    // 2. Redirect to the sign-in page
    redirect("/sign-in");
}