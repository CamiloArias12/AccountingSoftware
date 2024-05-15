'use client'
import { useEffect, useState } from 'react'
import InputField from '@/app/components/input/InputField'
import { gql, useMutation, useQuery } from '@apollo/client'
import Select from '../../input/Select'
import Button from '../../input/Button'
import { AddSvg } from '../../logo/Add'
import Modal from '../../modal/Modal'
import { useRouter } from 'next/navigation'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import { useTypeCredit } from '@/app/hooks/type-credit/TypeCreditInput'
import { TypeCreditSavingAcounts } from '@/lib/utils/type-account/types'
import InputFieldBeneficiary from '../../input/InputBeneficiary'
import SelectField from '../../input/SelectField'
import { optionsNature } from '@/lib/utils/type-account/options'
import SelectOptions from '../../input/SelectOptions'
import InputNumber from '../../input/InputNumber'
import { NumberFormatValues } from 'react-number-format'
import TypeCreditForm from './TypeCreditInformation'
import { Token } from '@/app/hooks/TokenContext'

const CREATE_TYPE_CREDIT = gql`
  mutation ($data: CreateTypeCreditDto!) {
    createTypeCredit(data: $data)
  }
`

export function TypeCreditCreate({
  setShowModalCreate
}: {
  setShowModalCreate: any
}) {
  const { context } = Token()
  const [
    createTypeCredit,
    { data: dataCreate, loading: loadingCreate, error: errorCreate }
  ] = useMutation(CREATE_TYPE_CREDIT)
  const route = useRouter()
  const [showWarning, setShowWarning] = useState(false)

  const [showView, setShowView] = useState(false)

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

  const handleCreateTypeCredit = (
    typeCredit: any,
    accounts: any,
    accountsInterest: any
  ) => {
    setShowWarning(true)
    createTypeCredit({
      variables: {
        data: {
          ...typeCredit,
          accounts: accounts,
          accountsInterest: accountsInterest
        }
      },
      context
    })
  }
  if (dataCreate?.createTypeCredit && !showWarning) {
    setShowModalCreate(false)
    route.refresh()
  }

  return (
    <Modal
      size=" lg:w-[850px] bg-white lg:h-[700px]"
      title="Crear tipo de crédito"
      onClick={() => {
        setShowModalCreate(false)
      }}
    >
      <TypeCreditForm
        onClickAccept={handleCreateTypeCredit}
        onClickCancel={() => {
          setShowModalCreate(false)
        }}
      />
      {dataCreate?.createTypeCredit && showWarning ? (
        <AlertModalSucces value={`El tipo de crédito ha sido creado`} />
      ) : dataCreate?.createTypeCredit === false && showWarning ? (
        <AlertModalError value={`No se ha podido crear el tipo de crédito`} />
      ) : (
        errorCreate && showWarning && <AlertModalError value="Error" />
      )}
    </Modal>
  )
}

export default TypeCreditCreate
