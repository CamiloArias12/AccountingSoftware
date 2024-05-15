import { gql } from '@apollo/client'
import { getClient } from '@/lib/graphql/apollo-client-server'
import { Movement } from '@/lib/utils/accounting/types'
import Notes from './Notes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { signOut } from 'next-auth/react'

export const revalidate = 0

const MOVEMENTS = gql`
  query ($data: InputSearchMovement!) {
    findMovementsNote(data: $data) {
      id
      date
      concept
    }
  }
`

async function PageNotes({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | undefined }
}) {
  const session = await getServerSession(authOptions)

  if (!session.user.rol['note']) {
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
      <Notes movements={data.findMovementsNote} />
    </>
  )
}

export default PageNotes
