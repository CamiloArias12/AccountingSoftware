import { getClient } from '@/lib/graphql/apollo-client-server'
import { TypeSaving } from '@/lib/utils/type-saving/types'
import { gql } from '@apollo/client'
import TypeSavings from './TypeSaving'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { signIn, signOut } from 'next-auth/react'

export const revalidate = 0

const TYPE_SAVINGS = gql`
  query {
    getTypeSavingAll {
      id
      name
    }
  }
`

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.rol['type_saving']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: TYPE_SAVINGS,
    context: { headers: { Authorization: session.user.token } }
  })
  return (
    <>
      <TypeSavings typeSavings={data.getTypeSavingAll} />
    </>
  )
}
