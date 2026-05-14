import type { MiddlewareHandler } from "astro";
import { jwtVerify } from "jose";

export const authMiddleware: MiddlewareHandler = async (context, next) => {
  const { url, cookies, locals, redirect } = context;
  const { env } = locals.runtime;

  // Define which paths require authentication
  const isDashboard = url.pathname.startsWith("/dashboard");

  if (isDashboard) {
    const token = cookies.get("auth_token")?.value;

    if (!token) {
      return redirect("/login");
    }

    try {
      const secret = new TextEncoder().encode(env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
    } catch (error) {
      // Token is invalid or expired
      cookies.delete("auth_token", { path: "/" });
      return redirect("/login");
    }
  }

  return next();
};