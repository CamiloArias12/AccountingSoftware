'use client'

import TableCredits from '@/app/components/forms/credit/TableCredit'
import { Credit } from '@/lib/utils/credit/types'

export const revalidate = 0

function Credits({ credits }: { credits: Credit[] }) {
  return (
    <div className="flex flex-col w-screen md:h-full  md:w-full  ">
      <TableCredits credits={credits} />
    </div>
  )
}

export default Credits
