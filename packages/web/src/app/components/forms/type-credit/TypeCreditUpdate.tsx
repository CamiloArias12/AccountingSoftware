'use client'
import { gql, useMutation, useQuery } from '@apollo/client'
import Modal from '../../modal/Modal'
import { useRouter } from 'next/navigation'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import { TypeCreditSavingAcounts } from '@/lib/utils/type-account/types'
import TypeCreditForm from './TypeCreditInformation'
import { useEffect, useState } from 'react'
import { Token } from '@/app/hooks/TokenContext'

const GET_TYPE_CREDIT = gql`
  query ($id: Int!) {
    getTypeCredit(id: $id) {
      id
      name
      interest

      auxiliaries {
        idAccount
        nature
        typeAccount
      }
    }
  }
`
const UPDATE_TYPE_CREDIT = gql`
  mutation ($data: CreateTypeCreditDto!, $id: Float!) {
    updateTypeCredit(data: $data, id: $id)
  }
`

export function TypeCreditUpdate({
  setShowModal,
  idTypeCredit
}: {
  setShowModal: any
  idTypeCredit?: number
}) {
  const { context } = Token()
  const { data, loading, error, refetch } = useQuery(GET_TYPE_CREDIT, {
    variables: { id: idTypeCredit },
    context
  })
  const [
    updateTypeCredit,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate }
  ] = useMutation(UPDATE_TYPE_CREDIT)
  const route = useRouter()
  const [showWarning, setShowWarning] = useState(false)

  const handleUpdate = (
    typecredit: any,
    accounts: TypeCreditSavingAcounts,
    accountsInterest: TypeCreditSavingAcounts
  ) => {
    setShowWarning(true)
    updateTypeCredit({
      variables: {
        data: {
          ...typecredit,
          accounts: accounts,
          accountsInterest: accountsInterest
        },
        id: idTypeCredit
      },
      context
    })
  }
  useEffect(() => {
    if (dataUpdate) {
      if (dataUpdate?.updateTypeCredit) {
        route.refresh()
        refetch()
      }

      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 5000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dataUpdate, errorUpdate])

  return (
    <Modal
      size=" lg:h-auto lg:w-[850px] bg-white"
      title="Editar tipo de crédito"
      onClick={() => {
        setShowModal(false)
      }}
    >
      <TypeCreditForm
        dataTypeCredit={data?.getTypeCredit}
        onClickCancel={() => {
          setShowModal(false)
        }}
        onClickAccept={handleUpdate}
      />
      {dataUpdate?.updateTypeCredit && showWarning ? (
        <AlertModalSucces value={`El tipo de crédito ha sido actualizado`} />
      ) : dataUpdate?.updateTypeCredit === false && showWarning ? (
        <AlertModalError
          value={`No se ha podido actualizar el tipo de crédito`}
        />
      ) : (
        errorUpdate && showWarning && <AlertModalError value="Error" />
      )}
    </Modal>
  )
}

export default TypeCreditUpdate
