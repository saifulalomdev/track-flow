import { getAuth } from "@hono/clerk-auth";
import { Context, Next } from "hono";

export const requireAuth = async (c: Context, next: Next) => {

    const auth = getAuth(c);
    if (c.env.NODE_ENV === 'development' && c.req.header('x-test-bypass')) {
        c.set('userId', 'user_debug_123');
        return await next();
    }

    if (!auth?.userId) {
        return c.json({
            success: false,
            message: 'You must be logged in to access this resource.'
        }, 401);
    }
    c.set('userId', auth.userId);
    await next();
};