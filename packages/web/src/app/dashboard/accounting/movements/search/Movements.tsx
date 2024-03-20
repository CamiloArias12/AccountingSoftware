'use client'
import TableMovements from '@/app/components/forms/accounting/TableMovements'
import { Movement } from '@/lib/utils/accounting/types'
import { useState } from 'react'

export const revalidate = 0
function Movements({ movements }: { movements: Movement[] }) {
  console.log("asdfksd movementes",movements)
  return (
    <div className="flex flex-col w-screen md:h-full  md:w-full  ">
      <TableMovements movements={movements} />
    </div>
  )
}

export default Movements
