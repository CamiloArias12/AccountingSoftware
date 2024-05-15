import { getClient } from '@/lib/graphql/apollo-client-server'
export const revalidate = 0
import { gql } from '@apollo/client'
import Image from 'next/image'
import CardDashBoard from '../card/CardDashboard'
import { signOut } from 'next-auth/react'
const SAVINGS = gql`
  query {
    totalSavings
  }
`

async function SavingCount({ token }: { token: string }) {
  const { data, error } = await getClient().query({
    query: SAVINGS,
    context: { headers: { Authorization: token } }
  })
  if (error) {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <CardDashBoard
      value={data.totalSavings}
      image="/saving.svg"
      name="Ahorros"
    />
  )
}

export default SavingCount
