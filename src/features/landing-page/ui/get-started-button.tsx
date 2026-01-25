import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function GetStarted() {
    return (
        <Link href="/dashboard">
            <Button size="lg" className='font-bold w-full sm:w-auto'>
                Get started <ArrowUpRight/>
            </Button>
        </Link>
    )
}
