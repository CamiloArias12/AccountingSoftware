import { getClient } from '@/lib/graphql/apollo-client-server'
export const revalidate = 0
import { gql } from '@apollo/client'
import CardDashBoard from '../card/CardDashboard'
import { signOut } from 'next-auth/react'
const AFFILIATES = gql`
  query {
    totalAffiliates
  }
`

async function AffliatesCount({ token }: { token: string }) {
  const { data, error } = await getClient().query({
    query: AFFILIATES,
    context: { headers: { Authorization: token } }
  })

  if (error) {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <CardDashBoard
      value={data.totalAffiliates}
      image="/affiliates.svg"
      name="Afiliados"
    />
  )
}

export default AffliatesCount
