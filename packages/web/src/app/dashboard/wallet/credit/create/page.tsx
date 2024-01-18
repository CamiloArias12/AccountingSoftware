import { getClient } from '@/lib/graphql/apollo-client-server'
import { gql } from '@apollo/client'
import FormCredit from './CreateCredit'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
export const revalidate = 0

async function getCreditInformation(): Promise<any> {
  const CREDIT_INFORMATION = gql`
    query {
      allAfiliates {
        user {
          identification
          name
          lastName
        }
        salary
      }
      getTypeCreditAll {
        id
        name
        interest
      }
    }
  `
  const { data } = await getClient().query({ query: CREDIT_INFORMATION })

  return data
}

async function CreatePage() {
  const session = await getServerSession(authOptions)

  if (!session.user.rol['credit']) {
    redirect('/dashboard')
  }

  const data = await getCreditInformation()
  return (
    <>
      <FormCredit
        creditType={data.getTypeCreditAll}
        affiliates={data.allAfiliates}
      />
    </>
  )
}

export default CreatePage
