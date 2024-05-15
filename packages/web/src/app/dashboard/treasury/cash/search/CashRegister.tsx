'use client'
import TableMovements from '@/app/components/forms/accounting/TableMovements'
import TableCashRegister from '@/app/components/forms/cash-register/TableCashRegister'
import TableDisburment from '@/app/components/forms/disbursement/TableDisburment'
import { Movement } from '@/lib/utils/accounting/types'
import { useState } from 'react'

function CashRegister({ cash }: { cash: Movement[] }) {
  const [rowSelection, setRowSelection] = useState({})
  console.log(cash)
  return (
    <div className="flex flex-col flex-grow mx-4 ">
      <div className="flex flex-grow flex-col pt-8 bg-white rounded-tr-[20px] rounded-b-[20px] ">
        <TableCashRegister
          cash={cash}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      </div>
    </div>
  )
}

export default CashRegister
