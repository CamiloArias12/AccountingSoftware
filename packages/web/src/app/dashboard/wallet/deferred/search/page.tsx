import { getClient } from '@/lib/graphql/apollo-client-server'
import { gql } from '@apollo/client'
import { Movement } from '@/lib/utils/accounting/types'
import Deferred from './Deferred'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { signOut } from 'next-auth/react'

export const revalidate = 0

const MOVEMENTS = gql`
  query ($data: InputSearchMovement!) {
    findDeferredAll(data: $data) {
      date
      id
      concept
    }
  }
`
async function PageDeferred({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | undefined }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    signOut({ callbackUrl: '/auth/login' })
  }
  if (!session.user.rol['deferred']) {
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
      <Deferred deferreds={data.findDeferredAll} />
    </>
  )
}

export default PageDeferred
