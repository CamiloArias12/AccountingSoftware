import { gql } from '@apollo/client'
import { getClient } from '@/lib/graphql/apollo-client-server'
import { Movement } from '@/lib/utils/accounting/types'
import DisbursementVoucher from './DisbursementVoucher'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'

export const revalidate = 0

const MOVEMENTS = gql`
  query ($data: InputSearchMovement!) {
    findMovementsDisbursement(data: $data) {
      id
      date
      concept
    }
  }
`

async function PageDisbursement({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | undefined }
}) {
  const session = await getServerSession(authOptions)

  if (!session.user.rol['disbursementvoucher']) {
    redirect('/dashboard')
  }
  const { data } = await getClient().query({
    query: MOVEMENTS,
    variables: {
      data: {
        user: searchParams.user !== '' ? parseInt(searchParams.user) : null,
        company:
          searchParams.comany !== '' ? parseInt(searchParams.company) : null,
        idAccount:
          searchParams.idAccount !== ''
            ? parseInt(searchParams.idAccount)
            : null,
        name: searchParams.name !== '' ? searchParams.name : null,
        concept: searchParams.concept !== '' ? searchParams.concept : null,
        startDate: searchParams.startDate,
        endDate: searchParams.endDate
      }
    },

    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <>
      <DisbursementVoucher movements={data.findMovementsDisbursement} />
    </>
  )
}

export default PageDisbursement
