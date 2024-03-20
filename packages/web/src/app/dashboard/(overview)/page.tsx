import { Suspense } from 'react'
import StatisticsClassAccount from '@/app/components/dashboard/ClassAccountStatistics'
import ThirdsCount from '@/app/components/dashboard/ThirdsCount'
import AffliatesCount from '@/app/components/dashboard/AffiliatesCount'
import EmployeesCount from '@/app/components/dashboard/EmployeesCount'
import CompanyCount from '@/app/components/dashboard/CompanyCount'
import SavingCount from '@/app/components/dashboard/SavingCount'
import CreditCount from '@/app/components/dashboard/CreditCount'
import dynamic from 'next/dynamic'
import CardSkeleton from '@/app/components/skeletons/CardSkeleton'
import TableRowSkeleton from '@/app/components/skeletons/TableSkeleton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/api/auth/[...nextauth]/options'
import { signIn, signOut } from 'next-auth/react'

const ChartCredit = dynamic(
  () => import('@/app/components/dashboard/StatisticsCredit'),
  {
    ssr: false
  }
)

const ChartContribution = dynamic(
  () => import('@/app/components/dashboard/StatisticsContributions'),
  {
    ssr: false
  }
)

export const revalidate = 0
export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  signOut({ callbackUrl: '/auth/login' })
  if (session?.user?.exit) {
    signIn()
  }

  return (
    <div className="  w-full h-full overflow-scroll mx-2 md:mx-0  md:m-0 my-2 flex  flex-col gap-2">
      <div className="2xl:flex grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:flex-row  gap-2 ">
        <Suspense fallback={<CardSkeleton />}>
          <ThirdsCount token={session?.user.token} />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <CompanyCount token={session?.user.token} />
        </Suspense>

        <Suspense fallback={<CardSkeleton />}>
          <AffliatesCount token={session?.user.token} />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <EmployeesCount token={session?.user.token} />
        </Suspense>

        <Suspense fallback={<CardSkeleton />}>
          <SavingCount token={session?.user.token} />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <CreditCount token={session?.user.token} />
        </Suspense>
      </div>
      <div className="flex flex-grow h-full w-full flex-col  lg:flex-row gap-2 ">
        <Suspense fallback={<div>afsdfds</div>}>
          <ChartCredit token={session?.user.token} />
        </Suspense>
      </div>
      <div className="flex h-full w-full flex-col  lg:flex-row gap-2 ">
        <div className="lg:w-1/2">
          <Suspense fallback={<div>afsdfds</div>}>
            <ChartContribution token={session?.user.token} />
          </Suspense>
        </div>
        <div className="lg:w-1/2">
          <Suspense fallback={<TableRowSkeleton size={4} key={3} />}>
            <StatisticsClassAccount token={session?.user.token} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
