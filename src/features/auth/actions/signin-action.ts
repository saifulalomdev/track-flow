"use server";

import { db } from "@/db";
import { type SignIn, signInUserSchema, users } from "@/db/schema/users";
import { ActionResponse } from "@/types/action";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { generateJWTToken } from "@/lib/jwt-token";
import { verifyPassword } from "@/lib/hash-password";
import { redirect } from "next/navigation";

export async function signInAction(data: SignIn): Promise<ActionResponse> {
    // 1. Validate input
    const result = signInUserSchema.safeParse(data);
    if (!result.success) {
        return {
            success: false,
            message: "Validation failed",
            errors: result.error.flatten().fieldErrors
        };
    }

    const { email, password } = result.data;
    let isSuccess = false;

    try {
        // 2. Find user
        const user = await db.query.users.findFirst({
            where: eq(users.email, email.toLowerCase()),
        });

        if (!user) {
            return { success: false, message: "Invalid email or password" };
        }

        // 3. Verify Password
        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid email or password" };
        }

        // 4. Generate JWT
        // SECURITY: We only pass ID and Email. NEVER pass the password into a JWT.
        const token = await generateJWTToken(data); 

        // 5. Set Cookie
        const cookieStore = await cookies();
        cookieStore.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        isSuccess = true;

    } catch (error) {
        console.error("SIGNIN_ERROR:", error);
        return { success: false, message: "Internal Server Error" };
    }

    // 6. Redirect MUST be called outside of try/catch
    if (isSuccess) {
        redirect("/dashboard");
    }

    return { success: false, message: "An unexpected error occurred" };
}