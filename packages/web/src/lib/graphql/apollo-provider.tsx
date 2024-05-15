'use client'

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink
} from '@apollo/experimental-nextjs-app-support/ssr'

export const client = new ApolloClient({
  ssrMode: true,
  uri: `${process.env.API_ENDPOINT}/graphql`,
  cache: new InMemoryCache()
})
function makeClient() {
  const httpLink = new HttpLink({
    uri: `${process.env.API_ENDPOINT}/graphql`
  })
  const removeTypenameLink = removeTypenameFromVariables()
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      addTypename: false
    }),
    defaultOptions: {
      watchQuery: {
        nextFetchPolicy(currentFetchPolicy) {
          if (
            currentFetchPolicy === 'network-only' ||
            currentFetchPolicy === 'cache-and-network'
          ) {
            return 'cache-first'
          }
          return currentFetchPolicy
        }
      }
    },
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true
            }),
            removeTypenameLink,
            httpLink
          ])
        : httpLink
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
