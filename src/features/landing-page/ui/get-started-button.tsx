import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function GetStarted() {
    return (
        <Link href="/dashboard" className='w-full md:w-auto'>
            <Button size="lg" className='font-bold md:w-auto w-full'>
                Get started <ArrowUpRight/>
            </Button>
        </Link>
    )
}
