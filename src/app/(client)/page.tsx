"use client"
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div>
      <Button onClick={()=> alert("Next")}>
        This is button
      </Button>
    </div>
  )
}
