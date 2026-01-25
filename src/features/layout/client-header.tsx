"use client";

import { useState } from "react";
import { SignedOut } from "@/components/auth/auth-control";
import { Button } from "@/components/ui/button";
import { navItems } from "@/constants/nav-items";
import Image from "next/image";
import Link from "next/link";
import GetStarted from "../landing-page/ui/get-started-button";
import { Menu, X } from "lucide-react"; // Added X for closing
import { cn } from "@/lib/utils"; // Standard shadcn helper

export default function ClientHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="w-full h-16 md:h-20 z-50 flex justify-between items-center px-6 md:px-10 lg:px-20 py-4 fixed top-0 left-0 bg-background/5 backdrop-blur-md border-b border-white/10">
        <Link href="/" className="shrink-0 z-50">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            priority
            className="md:w-10 md:h-10"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-13">
          {navItems.map(({ href, name }, index) => (
            <Link
              key={index}
              href={href}
              className="font-medium text-white/70 hover:text-primary transition-all"
            >
              {name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 z-50">
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost" className="hidden sm:flex text-white">
                Sign in
              </Button>
            </Link>
          </SignedOut>
          
          <div className="hidden sm:block">
            <GetStarted />
          </div>

          {/* Mobile Toggle Button */}
          <Button 
            variant="ghost" 
            size="icon-lg" 
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <nav 
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-[-10px]"
        )}
      >
        {navItems.map(({ href, name }) => (
          <Link 
            href={href} 
            key={name} 
            onClick={() => setIsOpen(false)} // Close on click
            className="text-2xl font-semibold text-white hover:text-primary transition-colors"
          >
            {name}
          </Link>
        ))}
        
        <div className="flex flex-col gap-4 w-full px-10 pt-10 border-t border-white/10">
           <SignedOut>
              <Link href="/sign-in" className="w-full">
                <Button variant="outline" className="w-full h-12">Sign in</Button>
              </Link>
           </SignedOut>
           <GetStarted />
        </div>
      </nav>
    </>
  );
}