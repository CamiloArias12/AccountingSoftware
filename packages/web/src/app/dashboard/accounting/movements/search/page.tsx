import { gql } from '@apollo/client'
import { getClient } from '@/lib/graphql/apollo-client-server'
import { Movement } from '@/lib/utils/accounting/types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Movements from './Movements'
import authOptions from '@/app/api/auth/[...nextauth]/options'

export const revalidate = 0

const MOVEMENTS = gql`
  query ($data: InputSearchMovement!) {
    findMovementsAccount(data: $data) {
      concept
      date
      id
      state
      accounting
    }
  }
`
async function Page({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | undefined }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/auth/login')
  }

  if (!session.user.rol['movement']) {
    redirect('/dashboard')
  }
  const { data, errors } = await getClient().query({
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
      <Movements movements={data.findMovementsAccount} />
    </>
  )
}

export default Page
