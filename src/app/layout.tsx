import { brandFont } from "@/lib/font";
import "./globals.css";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={brandFont.className}>
        {children}
      </body>
    </html>
  );
}
