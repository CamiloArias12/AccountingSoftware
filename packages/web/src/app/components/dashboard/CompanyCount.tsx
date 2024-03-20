import { getClient } from '@/lib/graphql/apollo-client-server'
import { classColors } from '@/lib/utils/type-account/options'
import { ClassAccountStatistics } from '@/lib/utils/type-account/types'
export const revalidate = 0
import { gql } from '@apollo/client'
import Image from 'next/image'
import CardDashBoard from '../card/CardDashboard'
import { signOut } from 'next-auth/react'
const THIRDS = gql`
  query {
    totalThirdsCompany
  }
`

async function CompanyCount({ token }: { token: string }) {
  const { data, error } = await getClient().query({
    query: THIRDS,
    context: { headers: { Authorization: token } }
  })
  if (error) {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <CardDashBoard
      value={data.totalThirdsCompany}
      image="/company.svg"
      name="Personas juridicas"
    />
  )
}

export default CompanyCount
