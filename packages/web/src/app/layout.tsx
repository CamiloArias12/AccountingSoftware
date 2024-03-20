import { ApolloWrapper } from '@/lib/graphql/apollo-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StoreProvider from '@/lib/redux/StoreProvider'
import { getServerSession } from 'next-auth'
import AuthProvider from './auth/AuthProvider'
import authOptions from './api/auth/[...nextauth]/options'
export const metadata: Metadata = {
  title: 'Foncastel',
  icons: '/logo.svg'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en" className="font-sans">
      <body className="overflow-hidden ">
        <StoreProvider>
          <AuthProvider session={session} refetchInterval={120}>
            <ApolloWrapper>{children}</ApolloWrapper>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
