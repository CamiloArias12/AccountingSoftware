import authOptions from '@/app/api/auth/[...nextauth]/options'
import RefinanceCreditForm from '@/app/components/forms/credit/RefinanceCreditForm'
import { getClient } from '@/lib/graphql/apollo-client-server'
import { RefinanceCredit } from '@/lib/utils/credit/types'
import { gql } from '@apollo/client'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
export const dynamic = 'force-dynamic'
type pageProps = {
  params: { id: number }
}

export const revalidate = 0

const CREDITS = gql`
  query ($id: Int!) {
    refinanceCredit(id: $id) {
      nameAffiliate
      identification
      previewBalance
      typeCredit
      interest
      idTypeCredit
    }
  }
`

async function Page({ params }: pageProps) {
  const session = await getServerSession(authOptions)
  if (!session) {
    signOut({ callbackUrl: '/auth/login' })
  }

  if (!session.user.rol['credit']) {
    redirect('/dashboard')
  }
  const { data } = await getClient().query({
    query: CREDITS,
    variables: {
      id: Number(params.id)
    },
    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <>
      <RefinanceCreditForm
        dataCredit={data.refinanceCredit}
        id={Number(params.id)}
      />
    </>
  )
}

export default Page
