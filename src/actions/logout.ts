import { defineAction } from 'astro:actions';

export const logout = defineAction({
    handler: async (_, context) => {
        // Delete the authentication cookie
        context.cookies.delete('auth_token', {
            path: '/',
        });

        return { success: true };
    },
});