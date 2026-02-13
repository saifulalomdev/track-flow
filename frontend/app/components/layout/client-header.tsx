"use client";

import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import GetStarted from "../landing-page/get-started-button";
import { cn } from "~/lib/utils";
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { navItems } from "~/constants/nav-items";
import { Button } from "../ui/button";

export default function ClientHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="w-full h-16 md:h-20 z-50 flex justify-between items-center px-6 md:px-10 lg:px-20 py-4 fixed top-0 left-0 bg-background/5 backdrop-blur-md border-b border-white/10">
        <Link to="/" className="shrink-0 z-50">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="w-10 h-10"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-13">
          {navItems.map(({ href, name }, index) => (
            <Link
              key={index}
              to={href}
              className="font-medium text-white/70 hover:text-primary transition-all"
            >
              {name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 z-50">
          <LandingCTA  className="hidden md:block"/>

          {/* Mobile Toggle Button */}
          <Button
            variant="outline"
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
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-2.5"
        )}
      >
        {navItems.map(({ href, name }) => (
          <Link
            to={href}
            key={name}
            onClick={() => setIsOpen(false)} // Close on click
            className="text-2xl font-semibold text-white hover:text-primary transition-colors"
          >
            {name}
          </Link>
        ))}
        <LandingCTA className="px-6"/>
      </nav>
    </>
  );
}


function LandingCTA({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 w-full border-white/10", className)}>
      <SignedOut>
        <GetStarted />
      </SignedOut>
      <SignedIn>
        <Link to="/dashboard" className="w-full md:w-auto">
          <Button className="w-full md:w-auto">
            Dashboard
          </Button>
        </Link>
      </SignedIn>
    </div>
  )
}