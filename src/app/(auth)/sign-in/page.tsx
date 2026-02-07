import { signInWithGoogle } from '@/features/auth/actions/signup-action'

export default function Sigin() {
  return (
    <form action={signInWithGoogle}>
      <button type="submit">
        Sign in with Google
      </button>
    </form>
  )
}
