import authOptions from '@/app/api/auth/[...nextauth]/options'
import UpdateThird from '@/app/components/forms/thirds/UpdateThird'
import ViewThird from '@/app/components/forms/thirds/ViewThird'
import { getClient } from '@/lib/graphql/apollo-client-server'
import { gql } from '@apollo/client'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

export const revalidate = 0
type pageProps = {
  params: { identification: number }
}

const COUNTRIES = gql`
  query ($id: Float!) {
    getUser(id: $id) {
      typeIdentification
      identification
      name
      lastName
      expeditionDate
      expeditionCity
      birthDate
      countryBirth
      stateBirth
      cityBirth
      gender
      statusCivil
      addressResidence
      countryResidence
      stateResidence
      cityResidence
      phone
      landLine
      email
      housingType
      studies
      profession
      foreignOperations
      publicResources
      publicRecognition
      publicPower
      status
      affiliate {
        company
        addreesCompany
        emailJob
        salary
        bank
        jobTitle
        phone
        incomeCompany
        typeAccount
        numberAccount
        beneficiaries {
          percentage
          beneficiary {
            idDocument
            name
          }
        }
      }
      employee {
        username
        password
      }
      provider {
        idProvider
      }
    }

    countCreditAfiliate(identifiation: $id)
  }
`

async function ViewPage({ params }: pageProps) {
  const session = await getServerSession(authOptions)
  if (!session) {
    signOut({ callbackUrl: '/auth/login' })
  }

  if (!session.user.rol['third']) {
    redirect('/dashboard')
  }

  const { data } = await getClient().query({
    query: COUNTRIES,
    variables: { id: Number(params.identification) },
    context: { headers: { Authorization: session.user.token } }
  })

  return (
    <>
      <ViewThird data={data} />
    </>
  )
}

export default ViewPage
