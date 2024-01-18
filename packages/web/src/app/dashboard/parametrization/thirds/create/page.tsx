import { getClient } from '@/lib/graphql/apollo-client-server'
import CreateThird from './CreateThird'
import { gql } from '@apollo/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

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

  if (!session.user.rol['third']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({ query: COUNTRIES })

  return (
    <>
      <CreateThird countries={data.getCountry} />
    </>
  )
}

export default CreatePage
