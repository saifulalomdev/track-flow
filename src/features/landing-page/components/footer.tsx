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
        <div className='px-25 pt-15 border-t'>
            <div className='w-full border-b pb-6 border-primary grid grid-cols-5'>
                <div className='col-span-2 pr-10'>
                    <h3 className='text-[32px] font-bold'> About Us</h3>
                    <p className='text-[18px] opacity-80 mt-3'>
                        We’re a team of engineers and data strategists building high-performance tracking tools that empower teams to turn raw data into actionable insights—faster, more accurately, and effortlessly.
                    </p>
                </div>
                <div>
                    <h3 className='text-[24px] font-bold text-primary'> Usefull links</h3>
                    <div className='flex flex-col gap-2 mt-3'>
                        {
                            navItems.map(({ name, href }) => (
                                <Link
                                    className='text-[18px] opacity-75 hover:underline w-fit'
                                    key={name}
                                    href={href}
                                >
                                    {name}
                                </Link>
                            ))
                        }
                    </div>

                </div>

                {/* Help section */}
                <div>
                    <h3 className='text-[24px] font-bold text-primary'>Help</h3>
                    <div className='flex flex-col gap-2 mt-3'>
                        {
                            helpMenus.map(({ name, href }) => (
                                <Link
                                    className='text-[18px] opacity-75 hover:underline w-fit'
                                    key={name}
                                    href={href}
                                >
                                    {name}
                                </Link>
                            ))
                        }
                    </div>

                </div>
                {/* Adress section */}
                <div>
                    <h3 className='text-[24px] font-bold text-primary'>Connect With Us</h3>
                    <div className='flex flex-col gap-2 mt-3'>
                        <p
                            className='text-[18px] opacity-75 w-fit'
                        >
                            27 Division St, New York,<br />NY 10002, USA
                        </p>
                        <p
                            className='text-[18px] opacity-75 w-fit'
                        >
                            +8801935679071
                        </p>
                        <p
                            className='text-[18px] opacity-75 w-fit'
                        >
                            hello@saifulalom.com
                        </p>
                    </div>

                </div>
            </div>
            <div className='flex justify-between py-8'>
                <p className='col-span-3 text-muted-foreground'>
                    © {new Date().getFullYear()} All Right Reserved.
                </p>
                <div className='flex gap-2'>
                    {socialLinks.map(({ href, name, Icon }) => (
                        <Tooltip key={name}>
                            <TooltipContent
                                className='bg-primary text-foreground'
                            >
                                {name}
                            </TooltipContent>
                            <TooltipTrigger asChild>
                                <Link
                                    className='border-2 border-primary/70 p-2 text-primary/90 rounded-full'
                                    href={href}
                                >
                                    <Icon size={16} />
                                </Link>
                            </TooltipTrigger>
                        </Tooltip>


                    ))}
                </div>
            </div>
        </div>
    )
}
