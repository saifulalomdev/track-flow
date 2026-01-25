import { brandFont } from "@/lib/font";
import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
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
    </html>
  );
}
