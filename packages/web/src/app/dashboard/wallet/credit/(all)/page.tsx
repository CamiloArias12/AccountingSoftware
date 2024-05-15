import { gql } from '@apollo/client'
import { getClient } from '@/lib/graphql/apollo-client-server'
import { Affiliate } from '@/lib/utils/thirds/types'
import Credits from './Credits'
import { Credit } from '@/lib/utils/credit/types'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'

export const revalidate = 0

const CREDITS = gql`
  query {
    getAllCredit {
      id
      identification
      name
      lastName
      creditValue
      nameCredit
      state
      discountDate
      valuePrevius
      interest
    }
  }
`

async function PageCredit() {
  const session = await getServerSession(authOptions)
  if (!session) {
    signOut({ callbackUrl: '/auth/login' })
  }

  if (!session.user.rol['credit']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: CREDITS,
    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <>
      <Credits credits={data.getAllCredit} />
    </>
  )
}

export default PageCredit
