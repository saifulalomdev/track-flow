import { cookies } from "next/headers";
import { cache } from "react";
import { verifyJWTToken } from "@/lib/jwt-token";
import { JWTPayload } from "@/db/schema";

export const getSession = cache(async (): Promise<JWTPayload | null> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) return null;

        const payload = await verifyJWTToken(token);

        if (!payload) return null;

        return payload;
    } catch (error) {
        return null;
    }
});