import { getClient } from '@/lib/graphql/apollo-client-server'
import CreateThird from './CreateThird'
import { gql } from '@apollo/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { signOut } from 'next-auth/react'

export const revalidate = 0
const COUNTRIES = gql`
  query Country {
    getCountry {
      id
      name
      iso2
    }
  }
`

async function CreatePage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    signOut({ callbackUrl: '/auth/login' })
  }

  if (!session.user.rol['third']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: COUNTRIES,
    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <>
      <CreateThird countries={data.getCountry} />
    </>
  )
}

export default CreatePage
