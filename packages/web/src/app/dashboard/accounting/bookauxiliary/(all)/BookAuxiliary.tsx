'use client'

import FormBook from '@/app/components/forms/accounting/BookAuxiliaryForm'

function BookAuxiliary({
  accounts,
  users,
  companys
}: {
  accounts?: any
  users: any
  companys: any
}) {
  return (
    <>
      <div className="bg-white flex flex-col h-full w-full gap-4 px-4 py-10">
        <FormBook
          accounts={accounts}
          users={users}
          companys={companys}
          searchRoute="/dashboard/accounting/bookauxiliary/search"
        />
      </div>
    </>
  )
}

export default BookAuxiliary
