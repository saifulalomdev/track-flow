import { loginSchema } from '@/schema/login';
import { defineAction } from 'astro:actions';
import { SignJWT } from 'jose';

export const login = defineAction({
    accept: 'json',
    input: loginSchema,
    handler: async (input, context) => {
        const { email, password } = input;
        const { env } = context.locals.runtime;

        // 1. Validate Credentials against Environment Secrets
        if (email !== env.ADMIN_EMAIL || password !== env.ADMIN_PASSWORD) {
            throw new Error("Invalid credentials");
        }

        // 2. Prepare JWT Secret
        const secret = new TextEncoder().encode(env.JWT_SECRET);

        // 3. Create JWT
        const token = await new SignJWT({ email })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(secret);

        // 4. Set HttpOnly Cookie
        context.cookies.set('auth_token', token, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 24 hours
        });

        return { success: true };
    },
})