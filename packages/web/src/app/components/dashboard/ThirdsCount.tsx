import { getClient } from '@/lib/graphql/apollo-client-server'
export const revalidate = 0
import { gql } from '@apollo/client'
import CardDashBoard from '../card/CardDashboard'
import { signOut } from 'next-auth/react'
const THIRDS = gql`
  query {
    totalThirdsNatural
  }
`

async function ThirdsCount({ token }: { token: string }) {
  const { data, error } = await getClient().query({
    query: THIRDS,
    context: { headers: { Authorization: token } }
  })
  if (error) {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <CardDashBoard
      value={data.totalThirdsNatural}
      image="/users.svg"
      name="Personas naturales"
    />
  )
}

export default ThirdsCount
