import { defineMiddleware } from "astro:middleware";
import { initAuth } from "./lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const auth = initAuth(context.locals.runtime.env);

  const session = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (session) {
    context.locals.user = session.user;
    context.locals.session = session.session;
  } else {
    context.locals.user = null;
    context.locals.session = null;
  }

  // 🔐 PROTECTED ROUTES LOGIC
  const isDashboardRoute = context.url.pathname.startsWith("/dashboard");
  const isAuthRoute = context.url.pathname.startsWith("/auth");

  // If NOT logged in and trying to access dashboard → redirect
  if (isDashboardRoute && !session) {
    return context.redirect("/auth/sign-in");
  }

  // Optional: if already logged in and visiting auth pages → redirect away
  if (isAuthRoute && session) {
    return context.redirect("/dashboard");
  }

  return next();
});