"use server";

import { db } from "@/db";
import { type SignUp, signUpUserSchema, users } from "@/db/schema/users";
import { hashPassword } from "@/lib/hash-password";
import { ActionResponse } from "@/types/action";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function signUpAction(data: SignUp): Promise<ActionResponse> {
    // 1. Validation
    const result = signUpUserSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            message: "Invalid form data.",
            errors: result.error.flatten().fieldErrors,
        };
    }

    const { email, password, name } = result.data;
    let isSuccess = false;

    try {
        // 2. Check for existing user
        const existingUser = await db.query.users.findFirst({
            where: eq(users.email, email.toLowerCase()),
        });

        if (existingUser) {
            return {
                success: false,
                message: "A user with this email already exists.",
            };
        }

        // 3. Security: Hash Password
        const hashedPassword = await hashPassword(password);

        // 4. Database Insertion
        await db.insert(users).values({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        isSuccess = true;

    } catch (error) {
        console.error("SIGNUP_ERROR:", error); 
        return {
            success: false,
            message: "Something went wrong. Please try again later.",
        };
    }

    // 5. Success Redirect
    if (isSuccess) {
        // Sending them to sign-in with a success message in the URL is a nice touch
        redirect("/sign-in?message=account-created");
    }

    return { success: false, message: "An unexpected error occurred" };
}