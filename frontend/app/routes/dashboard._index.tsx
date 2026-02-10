import { SignOutButton } from '@clerk/clerk-react';
import { Button } from '~/components/ui/button';

export default function Dashboard() {
  return (
    <div>
      <SignOutButton redirectUrl='/'>
        <Button variant="destructive">
          Sign out
        </Button>
      </SignOutButton>
    </div>
  )
}
