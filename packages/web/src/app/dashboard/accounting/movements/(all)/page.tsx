import { getClient } from '@/lib/graphql/apollo-client-server'

import { gql } from '@apollo/client'
import SearchFormMovement from '@/app/components/forms/search-movement.tsx/SearchMovementForm'
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

async function PageNotesCreate() {
  const session = await getServerSession(authOptions)
  if (!session) {
    signOut({ callbackUrl: '/auth/login' })
  }

  if (!session?.user?.rol['movement']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: DATA,
    context: { headers: { Authorization: session.user.token } }
  })
  return (
    <SearchFormMovement
      accounts={data.getAuxilaryAll}
      users={data.getAllUsers}
      companys={data.allCompanies}
      searchRoute="/dashboard/accounting/movements/search"
    />
  )
}

export default PageNotesCreate
