import { getClient } from '@/lib/graphql/apollo-client-server'
export const revalidate = 0
import { gql } from '@apollo/client'
import Image from 'next/image'
import CardDashBoard from '../card/CardDashboard'
import { signOut } from 'next-auth/react'
const THIRDS = gql`
  query {
    totalCredits
  }
`

async function CreditCount({ token }: { token: string }) {
  const { data, error } = await getClient().query({
    query: THIRDS,
    context: { headers: { Authorization: token } }
  })
  if (error) {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <CardDashBoard
      value={data.totalCredits}
      image="/credits.svg"
      name="Créditos"
    />
  )
}

export default CreditCount
