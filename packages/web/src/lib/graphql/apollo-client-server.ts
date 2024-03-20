import { HttpLink } from '@apollo/client'
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient
} from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'

console.log('Env apollo', process.env.API_ENDPOINT)
console.log('Env url', process.env.NEXTAUTH_URL)
export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      addTypename: false
    }),
    link: new HttpLink({
      uri: `${process.env.API_ENDPOINT}/graphql`
    })
  })
})
