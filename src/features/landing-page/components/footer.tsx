import { navItems } from '@/constants/nav-items'
import { socialLinks } from '@/constants/socials-links'
import Link from 'next/link'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { helpMenus } from '@/constants/help-menus';

export default function Footer() {
    return (
        <footer id='footer'  className='px-6 md:px-10 lg:px-15 xl:px-25 pt-15 border-t'>
            {/* Navigations Section */}
            <div className='w-full border-b pb-12 border-white/10 grid gap-10 grid-cols-1 md:grid-cols-3 xl:grid-cols-5'>
              
                {/* About Us section - Spans full width on mobile, 2 cols on Desktop */}
                <div className='md:col-span-3 xl:col-span-2 pr-0'>
                    <h3 className='text-3xl font-bold tracking-tight'>About Us</h3>
                    <p className='text-lg opacity-70 mt-4 leading-relaxed'>
                        We’re a team of engineers and data strategists building high-performance tracking tools that empower teams to turn raw data into actionable insights—faster, more accurately, and effortlessly.
                    </p>
                </div>

                {/* Useful links */}
                <div className='space-y-4'>
                    <h3 className='text-xl font-bold text-primary'>Useful Links</h3>
                    <nav className='flex flex-col gap-2'>
                        {navItems.map(({ name, href }) => (
                            <Link
                                className='text-base opacity-75 hover:opacity-100 hover:text-primary transition-all hover:underline w-fit'
                                key={name}
                                href={href}
                            >
                                {name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Help section */}
                <div className='space-y-4'>
                    <h3 className='text-xl font-bold text-primary'>Help</h3>
                    <nav className='flex flex-col gap-2'>
                        {helpMenus.map(({ name, href }) => (
                            <Link
                                className='text-base opacity-75 hover:opacity-100 hover:text-primary transition-all hover:underline w-fit'
                                key={name}
                                href={href}
                            >
                                {name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Connect section */}
                <div className='space-y-4'>
                    <h3 className='text-xl font-bold text-primary'>Connect With Us</h3>
                    <div className='flex flex-col gap-3 text-base opacity-75'>
                        <address className='not-italic leading-relaxed'>
                            Sylhet, 3100, Bangladesh
                        </address>
                        <a href="tel:+8801935679071" className="hover:text-primary transition-colors">+8801935679071</a>
                        <a href="mailto:hello@saifulalom.com" className="hover:text-primary transition-colors underline decoration-primary/30">hello@saifulalom.com</a>
                    </div>
                </div>
            </div>

            {/* Copyright and Socials */}
            <div className='flex flex-col md:flex-row justify-between items-center gap-6 py-10'>
                <p className='text-sm text-muted-foreground order-2 md:order-1'>
                    © {new Date().getFullYear()} <span className="text-foreground font-medium">trackFlow</span>. All Rights Reserved.
                </p>
                
                <div className='flex gap-3 order-1 md:order-2'>
                    {socialLinks.map(({ href, name, Icon }) => (
                        <Tooltip key={name} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Link
                                    className='border border-primary/80 p-2.5 text-primary/80 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300'
                                    href={href}
                                    aria-label={name}
                                >
                                    <Icon size={18} />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent className='bg-primary text-primary-foreground'>
                                <p>{name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </footer>
    )
}