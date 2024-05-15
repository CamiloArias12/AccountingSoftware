import { getClient } from '@/lib/graphql/apollo-client-server'
import { gql } from '@apollo/client'
import { StatisticsCreditChart } from './StatisticsCreditChart'
import { StatisticsContributionChart } from './StatisticsContributionChart'
import { signOut } from 'next-auth/react'

const CLASS_STATISTICS = gql`
  query {
    statisticsContributions
  }
`

async function StatisticsContribution({ token }: { token: string }) {
  const { data, error } = await getClient().query({
    query: CLASS_STATISTICS,
    context: { headers: { Authorization: token } }
  })
  if (error) {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <>
      <StatisticsContributionChart values={data.statisticsContributions} />
    </>
  )
}

export default StatisticsContribution
