// app/root.tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { TooltipProvider } from "./components/ui/tooltip";
import { ClerkProvider } from "@clerk/clerk-react";
import type { LinksFunction } from "react-router";
import fontStylesheet from "./fonts.css?url";
import "./app.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: fontStylesheet },

  {
    rel: "preload",
    href: "/fonts/sk-modernist-regular.otf",
    as: "font",
    type: "font/otf",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/fonts/sk-modernist-bold.otf",
    as: "font",
    type: "font/otf",
    crossOrigin: "anonymous",
  },
];

export default function Root() {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="max-w-360 mx-auto">
          <TooltipProvider>
            <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
              <Outlet />
            </ClerkProvider>
            <ScrollRestoration />
          </TooltipProvider>
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  return (
    <div className="flex flex-col items-center justify-center h-screen font-sans">
      <h1 className="text-2xl font-bold">Something went wrong!</h1>
      <a href="/" className="text-blue-500 underline mt-4">Go Home</a>
    </div>
  );
}