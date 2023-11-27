'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
  const httpLink = new HttpLink({
      uri: `${process.env.API_ENDPOINT}/graphql`,
  });
  const removeTypenameLink = removeTypenameFromVariables();
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      addTypename: false,
    }),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            removeTypenameLink,
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
