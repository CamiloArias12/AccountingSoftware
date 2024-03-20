import { gql } from '@apollo/client'
import Thirds from './Thirds'
import { getClient } from '@/lib/graphql/apollo-client-server'
import { Affiliate, Company } from '@/lib/utils/thirds/types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { signOut } from 'next-auth/react'

export const revalidate = 0

async function getUsers(token: string): Promise<any> {
  const THIRDS = gql`
    query {
      getAllUsers {
        name
        lastName
        identification
        status
        phone
        cityResidence
      }
      allCompanies {
        typeIdentification
        identification
        legalRepresentativeName
        legalRepresentativeDocument
        name
        typePerson
      }
    }
  `
  const { data } = await getClient().query({
    query: THIRDS,
    context: { headers: { Authorization: token } }
  })
  return data
}
async function esperarDosMinutos(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(
      () => {
        resolve()
      },
      2 * 60 * 3000
    ) // 2 minutos en milisegundos
  })
}

async function PageThirds() {
  esperarDosMinutos()

  const session = await getServerSession(authOptions)
  console.log(session.user)
  if (session.user.exit) {
    signOut({ callbackUrl: '/auth/login' })
  }

  if (!session?.user?.rol['third']) {
    redirect('/dashboard')
  }

  const query = await getUsers(session.user.token)

  const affiliates: Affiliate[] = query.getAllUsers
  const companies: Company[] = query.allCompanies

  return (
    <>
      <Thirds affiliates={affiliates} companies={companies} />
    </>
  )
}

export default PageThirds
