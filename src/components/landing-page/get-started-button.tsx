import { ArrowUpRight } from 'lucide-react'
import { Button } from '../ui/button'

export default function GetStarted() {
    return (
        <a href="/dashboard"  className='w-full md:w-auto'>
            <Button size="lg" className='font-bold md:w-auto w-full'>
                Get started <ArrowUpRight/>
            </Button>
        </a>
    )
}
