import { useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { navItems } from "@/constants/nav-items";


export default function PublicHeader({ signedIn = false }: { signedIn?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="w-full h-16 md:h-20 z-50 flex justify-between items-center px-6 md:px-10 lg:px-20 py-4 fixed top-0 left-0 bg-background/5 backdrop-blur-md border-b border-white/10">
        {/* site logo */}
        <a href="/" className="shrink-0 z-50">
          <img
            src="/images/logo.svg"
            alt="Logo"
            className="w-10 h-10"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 xl:gap-13">
          {navItems.map(({ href, name }, index) => (
            <a
              key={index}
              href={href}
              className="font-medium text-white/70 hover:text-primary transition-all"
            >
              {name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 z-50">
          <LandingCTA signedIn={signedIn} className="hidden md:block"/>
          
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

      {/* Mobile Nav and Overlay */}
      <nav
        className={cn(
          "fixed w-full h-screen z-40 bg-background/95 backdrop-blur-xl mt-16 transition-all duration-300 md:hidden",
          isOpen ? "opacity-100 left-0" : "opacity-0 -translate-x-full"
        )}
      >
        {navItems.map(({ href, name }) => (
          <a
            href={href}
            key={name}
            onClick={() => setIsOpen(false)}
            className="text-[16px] border-b flex justify-between items-center first:border-t border-white/20 w-full px-6 py-4 font-semibold text-white hover:text-primary transition-colors"
          >
            {name} <ChevronRight/>
          </a>
        ))}
        <LandingCTA signedIn={signedIn} className="px-6 mt-5"/>
      </nav>
    </>
  );
}


function LandingCTA({ className, signedIn }: { className?: string, signedIn?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-4 w-full border-white/10", className)}>
      {signedIn ? <a href="/dashboard" className="w-full md:w-auto">
        <Button size="lg" className="w-full md:w-auto">
          Dashboard
        </Button>
      </a> :
        <a href="/sign-in" className="w-full md:w-auto">
          <Button size="lg" className="w-full md:w-auto">
            Sign in
          </Button>
        </a>
      }
    </div>
  )
}