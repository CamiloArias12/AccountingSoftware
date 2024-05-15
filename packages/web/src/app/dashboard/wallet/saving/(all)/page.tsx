import { gql } from '@apollo/client'
import { getClient } from '@/lib/graphql/apollo-client-server'
import { Credit } from '@/lib/utils/credit/types'
import { Saving } from '@/lib/utils/savings/types'
import Savings from './Savings'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { signOut } from 'next-auth/react'

export const revalidate = 0

const SAVINGS = gql`
  query {
    getAllSaving {
      id
      identification
      lastName
      name
      qoutaValue
      startDate
      nameSaving
      state
    }
  }
`

async function PageSaving() {
  const session = await getServerSession(authOptions)
  if (!session) {
    signOut({ callbackUrl: '/auth/login' })
  }
  if (!session.user.rol['saving']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: SAVINGS,
    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <>
      <Savings savings={data.getAllSaving} />
    </>
  )
}

export default PageSaving
