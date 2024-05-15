import { getClient } from '@/lib/graphql/apollo-client-server'
import { gql } from '@apollo/client'
import TypeCredits from './TypeCredit'
import { TypeCredit } from '@/lib/utils/type-credit/types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { signOut } from 'next-auth/react'

export const revalidate = 0
const TYPE_CREDITS = gql`
  query {
    getTypeCreditAll {
      id
      name
      interest
    }
  }
`

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.rol['type_credit']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: TYPE_CREDITS,
    context: { headers: { Authorization: session.user.token } }
  })
  return (
    <>
      <TypeCredits typeCredits={data.getTypeCreditAll} />
    </>
  )
}
