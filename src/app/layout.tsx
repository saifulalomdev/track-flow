import "./globals.css";
import { brandFont } from "@/lib/font";
import { Toaster } from "sonner";
import { getSession } from "@/lib/auth";
import { SessionProvider } from "@/providers/session-provider";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await getSession();

  return (
    <html lang="en" className="dark">
      <SessionProvider user={user}>
        <body className={brandFont.className}>
          {children}
          <Toaster
            toastOptions={{
              classNames: {
                toast: "bg-background border-border",
                error: "!text-red-500",
                success: "!text-green-500",
                warning: "!text-yellow-500",
                info: "!text-blue-500",
                loader: "!text-slate-400",
              },
            }}
          />
        </body>
      </SessionProvider>
    </html>
  );
}
