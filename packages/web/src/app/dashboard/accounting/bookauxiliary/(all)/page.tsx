import { getClient } from '@/lib/graphql/apollo-client-server'

import { gql } from '@apollo/client'
import FormBook from '@/app/components/forms/accounting/BookAuxiliaryForm'
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

async function PageBook() {
  const session = await getServerSession(authOptions)
  if (!session.user.rol['book_auxiliary']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: DATA,
    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <div className="flex flex-col h-full w-full gap-4">
      <FormBook
        accounts={data.getAuxilaryAll}
        users={data.getAllUsers}
        companys={data.allCompanies}
        searchRoute="/dashboard/accounting/bookauxiliary/search"
      />
    </div>
  )
}

export default PageBook
