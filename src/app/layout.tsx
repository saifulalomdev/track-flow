import { brandFont } from "@/lib/font";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className="drk">
        <body className={brandFont.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
