'use client'
import TableNote from '@/app/components/forms/notes/TableNotes'
import { Movement } from '@/lib/utils/accounting/types'
import { useState } from 'react'

function Notes({ movements }: { movements: Movement[] }) {
  const [rowSelection, setRowSelection] = useState({})
  console.log(movements)
  return (
    <div className="flex flex-col flex-grow mx-4 ">
      <div className="flex flex-grow flex-col pt-10 bg-white rounded-tr-[20px] rounded-b-[20px] ">
        <TableNote
          notes={movements}
          rowSelection={rowSelection}
          setRowSelection={setRowSelection}
        />
      </div>
    </div>
  )
}

export default Notes
