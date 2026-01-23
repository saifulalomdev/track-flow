import { Button } from "@/components/ui/button";
import { navItems } from "@/constants/nav-items";
import Image from "next/image";
import Link from "next/link";

export default function ClientHeader() {
  return (
    <header
      className="w-full h-16 md:h-20 z-50 flex justify-between items-center px-6 md:px-10 lg:px-20 py-4 fixed top-0 left-0 bg-background/5 backdrop-blur-md"
    >
      <Link href="/" className="shrink-0">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          priority
          className="md:w-10 md:h-10"
        />
      </Link>

      <nav className="hidden lg:flex items-center gap-8 xl:gap-13">
        {navItems.map(({ href, name }, index) => (
          <Link
            key={index}
            href={href}
            className="font-medium hover:underline underline-offset-4 hover:text-primary transition-all"
          >
            {name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Button size="lg" variant="outline" className="hidden sm:flex font-bold">
          Log in
        </Button>
        <Button size="lg" className="font-bold px-6">
          Get Started
        </Button>
        {/* Mobile Menu Trigger could go here */}
      </div>
    </header>
  )
}
