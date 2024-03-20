import { gql } from '@apollo/client'
import { getClient } from '@/lib/graphql/apollo-client-server'
import CashRegister from './CashRegister'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'

export const revalidate = 0
const MOVEMENTS = gql`
  query ($data: InputSearchMovement!) {
    findMovementsCashRegister(data: $data) {
      id
      date
      concept
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
  if (!session.user.rol['cash']) {
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
      <CashRegister cash={data.findMovementsCashRegister} />
    </>
  )
}

export default Page
