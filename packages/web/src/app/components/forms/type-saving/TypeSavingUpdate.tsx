'use client'
import { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import Modal from '../../modal/Modal'
import TypeSavingForm from './TypeSavingInformation'
import { Token } from '@/app/hooks/TokenContext'

const UPDATE_TYPE_SAVING = gql`
  mutation ($data: CreateTypeSavingDto!, $id: Float!) {
    updateTypeSaving(data: $data, id: $id)
  }
`
const GET_TYPE_SAVING = gql`
  query ($id: Int!) {
    getTypeSaving(id: $id) {
      id
      name
      auxiliaries {
        nature
        percentage
        idAccount
      }
    }
  }
`

export function TypeSavingUpdate({
  setShow,
  idTypeSaving
}: {
  setShow: any
  idTypeSaving: number
}) {
  const { context } = Token()
  const { data, loading, error, refetch } = useQuery(GET_TYPE_SAVING, {
    variables: { id: idTypeSaving },
    context
  })

  const [
    updateTypeSaving,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate }
  ] = useMutation(UPDATE_TYPE_SAVING)
  const route = useRouter()
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (dataUpdate) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 3000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dataUpdate, errorUpdate])

  if (dataUpdate?.updateTypeSaving && !showWarning) {
    setShow(false)
    route.push('/dashboard/parametrization/typesaving')
    refetch()
    route.refresh()
  }

  const handleUpdateTypeSaving = (typeSaving, accounts) => {
    setShowWarning(true)
    updateTypeSaving({
      variables: {
        data: {
          name: typeSaving.name,
          accounts: accounts
        },
        id: idTypeSaving
      },
      context
    })
  }

  return (
    <Modal
      size="  lg:h-auto lg:w-[850px] bg-white"
      title="Editar tipo de ahorro"
      onClick={() => {
        setShow(false)
        route.push('/dashboard/parametrization/typesaving')
      }}
    >
      <div className="flex flex-col   w-full h-full">
        {data && (
          <TypeSavingForm
            dataTypeSaving={data?.getTypeSaving}
            onClickCancel={() => {
              setShow(false)
            }}
            onClickAccept={handleUpdateTypeSaving}
          />
        )}
        {dataUpdate?.updateTypeSaving && showWarning ? (
          <AlertModalSucces value={`El tipo de ahorro ha sido actualizado`} />
        ) : (
          dataUpdate?.updateTypeSaving === false &&
          showWarning &&
          errorUpdate &&
          showWarning && <AlertModalError value="Error" />
        )}
      </div>
    </Modal>
  )
}

export default TypeSavingUpdate
