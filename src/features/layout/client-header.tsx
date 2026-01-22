import { Button } from "@/components/ui/button";
import { navItems } from "@/constants/nav-items";
import Image from "next/image";
import Link from "next/link";

export default function ClientHeader() {
  return (
    <header 
    className="w-full h-16 z-20 flex justify-between items-center px-20 py-14 fixed top-0 left-0 bg-background/5 backdrop-blur-sm"
    >
      <Image
        src="/images/logo.svg"
        alt="Logo"
        width={40}
        height={40}
        priority
      />
      <nav className="flex gap-13">
        {navItems.map(({ href, name }, index) => (
          <Link
            key={index}
            href={href}
            className="font-normal [-word-spacing:0.10rem]"
          >
            {name}
          </Link>
        ))}
      </nav>
      <Button className="font-bold">
        Log in
      </Button>
    </header>
  )
}
