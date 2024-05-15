import { getClient } from '@/lib/graphql/apollo-client-server'

import { gql } from '@apollo/client'
import NoteCreate from './NotesCreate'
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

  if (!session.user.rol['note']) {
    redirect('/dashboard')
  }
  const { data } = await getClient().query({
    query: DATA,
    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <NoteCreate
      accounts={data.getAuxilaryAll}
      users={data.getAllUsers}
      companys={data.allCompanies}
    />
  )
}

export default PageNotesCreate
