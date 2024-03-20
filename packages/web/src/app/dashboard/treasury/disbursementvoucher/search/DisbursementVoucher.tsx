'use client'
import TableMovements from '@/app/components/forms/accounting/TableMovements'
import TableDisburment from '@/app/components/forms/disbursement/TableDisburment'
import { Movement } from '@/lib/utils/accounting/types'
import { useState } from 'react'

function DisbursementVoucher({ movements }: { movements: Movement[] }) {
  const [rowSelection, setRowSelection] = useState({})
  console.log(movements)
  return (
    <div className="flex flex-col flex-grow mx-4 ">
      <div className="flex flex-grow flex-col pt-10 bg-white rounded-tr-[20px] rounded-b-[20px] ">
        <TableDisburment
          disbursement={movements}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      </div>
    </div>
  )
}

export default DisbursementVoucher
