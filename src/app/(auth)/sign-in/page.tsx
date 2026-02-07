import { signInWithGithub, signInWithGoogle } from '@/features/auth/actions/signup-action'

export default function Sigin() {
  return (
    <div>
      <form action={signInWithGoogle}>
        <button type="submit">
          Sign in with Google
        </button>
      </form>
      <form action={signInWithGithub}>
        <button type="submit">
          Sign in with github
        </button>
      </form>
    </div>
  )
}
