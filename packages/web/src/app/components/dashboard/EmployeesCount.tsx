import { getClient } from '@/lib/graphql/apollo-client-server'
import { classColors } from '@/lib/utils/type-account/options'
import { ClassAccountStatistics } from '@/lib/utils/type-account/types'
export const revalidate = 0
import { gql } from '@apollo/client'
import Image from 'next/image'
import CardDashBoard from '../card/CardDashboard'
import { signOut } from 'next-auth/react'
const EMPLOYEES = gql`
  query {
    totalEmployees
  }
`

async function EmployeesCount({ token }: { token: string }) {
  const { data, error } = await getClient().query({
    query: EMPLOYEES,
    context: { headers: { Authorization: token } }
  })
  if (error) {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <CardDashBoard
      value={data.totalEmployees}
      image="/employee.svg"
      name="Empleados"
    />
  )
}

export default EmployeesCount
