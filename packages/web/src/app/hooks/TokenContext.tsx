import { useSession } from 'next-auth/react'

export function Token() {
  const {
    data: { user }
  } = useSession()

  return {
    context: { headers: { Authorization: user.token } }
  }
}
