'use client'
import TypeCreditForm from '@/app/components/forms/type-credit/TypeCreditInformation'
import TableTypeSaving from '@/app/components/forms/type-saving/TableTypeSaving'
import TypeSavingCreate from '@/app/components/forms/type-saving/TypeSavingCreate'
import TypeSavingForm from '@/app/components/forms/type-saving/TypeSavingInformation'
import Modal from '@/app/components/modal/Modal'
import { TypeSaving } from '@/lib/utils/type-saving/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

function TypeSavings({ typeSavings }: { typeSavings: TypeSaving[] }) {
  console.log('tipos de credito', typeSavings)

  const searchParams = useSearchParams()
  const search = searchParams.get('create')
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
  const route = useRouter()
  useEffect(() => {
    if (search) {
      setShowModalCreate(true)
    }
  }, [search])
  return (
    <div className="flex flex-col w-screen md:h-full  md:w-full  ">
      {showModalCreate && (
        <TypeSavingCreate setShowModalCreate={setShowModalCreate} />
      )}
      <TableTypeSaving
        typeSavings={typeSavings}
        setShowModalCreate={setShowModalCreate}
      />
    </div>
  )
}

export default TypeSavings
