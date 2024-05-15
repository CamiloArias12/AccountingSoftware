import { getClient } from '@/lib/graphql/apollo-client-server'
import DisbursementVoucherCreate from './DisbursementVoucherCreate'

import { gql } from '@apollo/client'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'

export const revalidate = 0

const DATA = gql`
  query {
    getAuxilaryAll {
      type
      typeAccount {
        code
        name
        nature
        state
      }
    }
  }
`

async function PageDisbursementVoucherCreate() {
  const session = await getServerSession(authOptions)
  if (!session.user.rol['disbursementvoucher']) {
    redirect('/dashboard')
  }
  const { data } = await getClient().query({
    query: DATA,
    context: { headers: { Authorization: session.user.token } }
  })

  return <DisbursementVoucherCreate accounts={data.getAuxilaryAll} />
}

export default PageDisbursementVoucherCreate
