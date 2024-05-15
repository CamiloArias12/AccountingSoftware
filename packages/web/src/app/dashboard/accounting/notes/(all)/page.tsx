import authOptions from '@/app/api/auth/[...nextauth]/options'
import SearchFormMovement from '@/app/components/forms/search-movement.tsx/SearchMovementForm'
import { getClient } from '@/lib/graphql/apollo-client-server'

import { gql } from '@apollo/client'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

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
async function PageNote() {
  const session = await getServerSession(authOptions)

  if (!session.user.rol['note']) {
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
      searchRoute="/dashboard/accounting/notes/search"
      createRoute="/dashboard/accounting/notes/create"
    />
  )
}

export default PageNote
