import authOptions from '@/app/api/auth/[...nextauth]/options'
import RefinanceCreditForm from '@/app/components/forms/credit/RefinanceCreditForm'
import UpdateCredit from '@/app/components/forms/credit/UpdateCredit'
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

const GET_CREDIT = gql`
  query getCredit($id: Int!) {
    findOneCredit(id: $id) {
      id
      creditValue
      interest
      startDate
      discountDate
      state
      methodPayment
      typeCredit {
        id
        name
      }
      affiliate {
        user {
          identification
          name
          lastName
        }
      }
      installments {
        installmentNumber
        paymentDate
        initialBalance
        scheduledPayment
        extraPayment
        totalPayment
        capital
        interest
        finalBalance
        state
      }
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
    query: GET_CREDIT,
    variables: {
      id: Number(params.id)
    },
    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <>
      <UpdateCredit
        dataCredit={data.findOneCredit}
        idCredit={Number(params.id)}
      />
    </>
  )
}

export default Page
