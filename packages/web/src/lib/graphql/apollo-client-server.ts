import { HttpLink } from '@apollo/client'
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient
} from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { setContext } from '@apollo/client/link/context'
export const { getClient } = registerApolloClient(() => {
  const authMiddleware = setContext(async (operation, { headers }) => {
    console.log('Token validation')
    const { token } = await fetch('/api/auth/token').then(res => res.json())

    return {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMDI2NDkxMzIiLCJuYW1lIjoiZGVtbyIsImlhdCI6MTcwNDk4NTQ3OCwiZXhwIjoxNzA0OTkyNjc4fQ.aDmyItz4rBiBnX6L0p5S63Di7mobfChDAA-MbGL_GeE'
      }
    }
  })
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      addTypename: false
    }),
    link: new HttpLink({
      uri: `${process.env.API_ENDPOINT}/graphql`,
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMDI2NDkxMzIiLCJuYW1lIjoiZGVtbyIsImlhdCI6MTcwNDk4NTQ3OCwiZXhwIjoxNzA0OTkyNjc4fQ.aDmyItz4rBiBnX6L0p5S63Di7mobfChDAA-MbGL_GeE'
      }
    })
  })
})
