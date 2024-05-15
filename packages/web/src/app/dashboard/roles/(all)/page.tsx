import { gql } from '@apollo/client'
import { getClient } from '@/lib/graphql/apollo-client-server'
import { Affiliate, Company } from '@/lib/utils/thirds/types'
import { getServerSession } from 'next-auth'
import TableRoles from '@/app/components/forms/roles/TableRoles'
import { redirect } from 'next/navigation'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { signOut } from 'next-auth/react'

export const revalidate = 0

const ROLES = gql`
  query {
    roles {
      id
      name
      third
      credit
      saving
      type_account
      type_saving
      type_credit
      movement
      deferred
      cash
      disbursementvoucher
    }
  }
`
async function PageRoles() {
  const session = await getServerSession(authOptions)

  if (!session.user.rol['roles']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: ROLES,
    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <div className="flex flex-col flex-grow  ">
      <div className="flex flex-grow flex-col p-2 pt-10 bg-white rounded-tr-[20px] rounded-b-[20px]  ">
        <TableRoles roles={data.roles} />
      </div>
    </div>
  )
}

export default PageRoles
