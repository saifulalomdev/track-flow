import { SignUp } from '@clerk/clerk-react';


export default function SignUpPage() {
  return (
    <div className='w-full flex justify-center items-center h-screen'>
        <SignUp signInUrl='/sign-in'/>
    </div>
  )
}
