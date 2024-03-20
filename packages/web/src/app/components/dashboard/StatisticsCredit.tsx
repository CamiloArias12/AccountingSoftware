import { getClient } from '@/lib/graphql/apollo-client-server'
import { gql } from '@apollo/client'
import { StatisticsCreditChart } from './StatisticsCreditChart'
import { signOut } from 'next-auth/react'

const CLASS_STATISTICS = gql`
  query {
    getStatisticsCredit {
      total
      total_value
      total_approved
      total_progress
      total_refinanced
      total_finalized
      total_dibursed
    }

    getStatisticsCreditGeneral
  }
`

async function StatisticsCredit({ token }: { token: string }) {
  const { data, error } = await getClient().query({
    query: CLASS_STATISTICS,
    context: { headers: { Authorization: token } }
  })
  if (error) {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <>
      <StatisticsCreditChart
        values={data.getStatisticsCredit}
        valuesTwo={data.getStatisticsCreditGeneral}
      />
    </>
  )
}

export default StatisticsCredit
