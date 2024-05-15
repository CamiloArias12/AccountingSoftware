import { getClient } from '@/lib/graphql/apollo-client-server'
export const dynamic = 'force-dynamic'

export const revalidate = 0

import { gql } from '@apollo/client'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import CashCreate from './CashPayment'

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

    getAllUsers {
      name
      lastName
      identification
    }
    allCompanies {
      identification
      name
    }
  }
`

async function PageCash() {
  const session = await getServerSession(authOptions)

  if (!session.user.rol['cash']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: DATA,
    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <>
      <CashCreate
        accounts={data.getAuxilaryAll}
        users={data.getAllUsers}
        companys={data.allCompanies}
      />
    </>
  )
}

export default PageCash
