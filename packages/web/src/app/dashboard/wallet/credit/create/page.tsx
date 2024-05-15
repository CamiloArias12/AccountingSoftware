import { getClient } from '@/lib/graphql/apollo-client-server'
import { gql } from '@apollo/client'
import FormCredit from './CreateCredit'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'
export const revalidate = 0

const CREDIT_INFORMATION = gql`
  query {
    allAfiliates {
      user {
        identification
        name
        lastName
      }
      salary
    }
    getTypeCreditAll {
      id
      name
      interest
    }
  }
`

async function CreatePage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    signOut({ callbackUrl: '/auth/login' })
  }

  if (!session.user.rol['credit']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: CREDIT_INFORMATION,
    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <>
      <FormCredit
        creditType={data.getTypeCreditAll}
        affiliates={data.allAfiliates}
      />
    </>
  )
}

export default CreatePage
