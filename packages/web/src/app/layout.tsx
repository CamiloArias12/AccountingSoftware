import { ApolloWrapper } from '@/lib/graphql/apollo-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StoreProvider from '@/lib/redux/StoreProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import AuthProvider from './auth/AuthProvider'
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
      <body>
        <StoreProvider>
          <AuthProvider session={session}>
            <ApolloWrapper>{children}</ApolloWrapper>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
