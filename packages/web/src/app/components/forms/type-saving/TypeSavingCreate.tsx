'use client'
import { useEffect, useState } from 'react'
import InputField from '@/app/components/input/InputField'
import { gql, useMutation, useQuery } from '@apollo/client'
import Select from '../../input/Select'
import Button from '../../input/Button'
import { AddSvg } from '../../logo/Add'
import { useRouter } from 'next/navigation'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import Modal from '../../modal/Modal'
import { useTypeSaving } from '@/app/hooks/type-saving/TypeSavingInput'
import TypeSavingForm from './TypeSavingInformation'
import { Token } from '@/app/hooks/TokenContext'

const CREATE_TYPE_SAVING = gql`
  mutation ($data: CreateTypeSavingDto!) {
    createTypeSaving(data: $data) {
      name
    }
  }
`

export function TypeSavingCreate({
  setShowModalCreate
}: {
  setShowModalCreate: any
}) {
  const { context } = Token()
  const [
    createTypeSaving,
    { data: dataCreate, loading: loadingCreate, error: errorCreate }
  ] = useMutation(CREATE_TYPE_SAVING)

  const route = useRouter()
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (dataCreate) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 3000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dataCreate, errorCreate])

  if (dataCreate?.createTypeSaving && !showWarning) {
    setShowModalCreate(false)
    route.push('/dashboard/parametrization/typesaving')
    route.refresh()
  }

  const handleCreateTypeSaving = (typeSaving, accounts) => {
    setShowWarning(true)
    createTypeSaving({
      variables: {
        data: {
          name: typeSaving.name,
          accounts: accounts
        }
      },
      context
    })
  }

  return (
    <Modal
      size=" lg:h-auto lg:w-[850px] bg-white"
      title="Crear tipo de ahorro"
      onClick={() => {
        setShowModalCreate(false)
        route.push('/dashboard/parametrization/typesaving')
      }}
    >
      <TypeSavingForm
        onClickAccept={handleCreateTypeSaving}
        onClickCancel={() => {
          setShowModalCreate(false)
        }}
      />
      <div>
        {dataCreate?.createTypeSaving && showWarning ? (
          <AlertModalSucces value={`El tipo de ahorro ha sido creado`} />
        ) : (
          dataCreate?.createTypeSaving === false &&
          showWarning &&
          errorCreate &&
          showWarning && <AlertModalError value="Error" />
        )}
      </div>
    </Modal>
  )
}

export default TypeSavingCreate
