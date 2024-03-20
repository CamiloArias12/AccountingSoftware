import { getClient } from '@/lib/graphql/apollo-client-server'
export const dynamic = 'force-dynamic'

export const revalidate = 0

import { gql } from '@apollo/client'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import DeferredCreate from './DeferredCreate'
import { signOut } from 'next-auth/react'

async function PageDefferedInterest() {
  const session = await getServerSession(authOptions)
  if (!session) {
    signOut({ callbackUrl: '/auth/login' })
  }

  if (!session.user.rol['deferred']) {
    redirect('/dashboard')
  }

  return (
    <>
      <DeferredCreate />
    </>
  )
}

export default PageDefferedInterest
