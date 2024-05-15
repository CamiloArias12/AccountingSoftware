import { getClient } from '@/lib/graphql/apollo-client-server'
import { gql } from '@apollo/client'
import CreateTypeAccount from './TypeAccount'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { signOut } from 'next-auth/react'

export const revalidate = 0
const ACCOUNTS = gql`
  query {
    getClassAccountAll {
      type
      typeAccount {
        code
        name
        nature
        state
      }
      accounts {
        type
        typeAccount {
          code
          name
          nature
          state
        }
        accounts {
          type
          typeAccount {
            code
            name
            nature
            state
          }
          accounts {
            type
            typeAccount {
              code
              name
              nature
              state
            }
            accounts {
              type
              typeAccount {
                code
                name
                nature
                state
              }
            }
          }
        }
      }
    }
  }
`

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.rol['type_account']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: ACCOUNTS,
    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <>
      <CreateTypeAccount typeAccounts={data.getClassAccountAll} />
    </>
  )
}
