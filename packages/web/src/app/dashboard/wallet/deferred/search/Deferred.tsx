'use client'
import TableMovements from '@/app/components/forms/accounting/TableMovements'
import TableDeferred from '@/app/components/forms/deferred/TableDeferred'
import { Movement } from '@/lib/utils/accounting/types'
import { useState } from 'react'

function Deferred({ deferreds }: { deferreds: Movement[] }) {
  const [rowSelection, setRowSelection] = useState({})
  return (
    <div className="flex flex-col w-screen md:h-full  md:w-full  ">
      <TableDeferred
        deferreds={deferreds}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </div>
  )
}

export default Deferred
