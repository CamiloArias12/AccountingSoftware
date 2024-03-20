import { getClient } from '@/lib/graphql/apollo-client-server'
import { gql } from '@apollo/client'
import { Movement } from '@/lib/utils/accounting/types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import TableBookAuxiliary from '@/app/components/forms/accounting/TableBookAuxiliary'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { signOut } from 'next-auth/react'

export const revalidate = 0

const MOVEMENTS = gql`
  query ($data: BookAuxiliary!) {
    getBookAuxiliary(data: $data) {
      date
      typeMovement
      idMovement
      concept
      identificationThird
      nameThird
      code
      nameAccount
      previusBalance
      debit
      credit
      total
    }
  }
`

async function PageBook({
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

    if (!session.user.rol['book_auxiliary']) {
        redirect('/dashboard')
    }
    const { data, errors } = await getClient().query({
        query: MOVEMENTS,
        variables: {
            data: {
                user: searchParams.user !== '' ? parseInt(searchParams.user) : null,
                company:
                    searchParams.company !== '' ? parseInt(searchParams.company) : null,

                startDate: searchParams.startDate,
                endDate: searchParams.endDate
            }
        },
        context: { headers: { Authorization: session.user.token } }
    })

    return (
        <>
            <TableBookAuxiliary movements={data.getBookAuxiliary} />
        </>
    )
}

export default PageBook
