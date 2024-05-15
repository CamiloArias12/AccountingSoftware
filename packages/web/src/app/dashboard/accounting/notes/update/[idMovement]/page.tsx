import { getClient } from '@/lib/graphql/apollo-client-server'

import { gql } from '@apollo/client'
import NoteUpdate from './NotesUpdate'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'

export const revalidate = 0
type pageProps = {
  params: { idMovement: string }
}

const DATA = gql`
  query ($idMovement: String!) {
    findMovementNote(idMovement: $idMovement) {
      movement {
        id
        concept
        date
      }
      type
      account_movement {
        account
        user
        company
        value
        nature
      }
    }
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

async function PageNotesUpdate({ params }: pageProps) {
  console.log(params.idMovement)
  const session = await getServerSession(authOptions)

  if (!session.user.rol['note']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: DATA,
    variables: { idMovement: params.idMovement },
    context: { headers: { Authorization: session.user.token } }
  })

  console.log(data)
  return (
    <NoteUpdate
      noteMovement={data.findMovementNote}
      accounts={data.getAuxilaryAll}
      users={data.getAllUsers}
      companys={data.allCompanies}
    />
  )
}

export default PageNotesUpdate
