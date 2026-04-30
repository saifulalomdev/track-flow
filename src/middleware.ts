import { defineMiddleware } from "astro:middleware";
import { initAuth } from "./lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {

  const auth = initAuth(context.locals.runtime.env);

  const isAuthed = await auth.api
    .getSession({
      headers: context.request.headers,
    })
  if (isAuthed) {
    context.locals.user = isAuthed.user;
    context.locals.session = isAuthed.session;
  } else {
    context.locals.user = null;
    context.locals.session = null;
  }
  return next();
});