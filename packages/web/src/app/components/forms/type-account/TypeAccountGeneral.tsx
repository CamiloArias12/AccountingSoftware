import { useTypeAccount } from '@/app/hooks/type-account/TypeAccountInput'
import { useEffect, useState } from 'react'
import {
  TypeAccountEnum,
  optionsAccounts,
  optionsNature
} from '@/lib/utils/type-account/options'
import { gql, useMutation, useQuery } from '@apollo/client'
import Select from '../../input/Select'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import Modal from '../../modal/Modal'
import { useRouter } from 'next/navigation'
import TypeAccountForm from './TypeAccountInformation'
import { useForm } from 'react-hook-form'
import { FieldRequired } from '@/lib/utils/FieldValidation'

import { Token } from '@/app/hooks/TokenContext'
const GET_CLASS = gql`
  query {
    getClassAccountAll {
      type
      typeAccount {
        code
        name
        nature
        state
      }
    }
  }
`
const GET_ACCOUNT = gql`
  query ($code: Float!) {
    getAccountsByGroup(code: $code) {
      typeAccount {
        code
        name
      }
    }
  }
`
const GET_SUBACCOUNT = gql`
  query ($code: Float!) {
    getSubAccountByAccount(code: $code) {
      typeAccount {
        code
        name
      }
    }
  }
`
const GET_GROUP = gql`
  query ($code: Float!) {
    getGroupByClass(code: $code) {
      typeAccount {
        code
        name
      }
    }
  }
`
const CREATE_TYPE_ACCOUNT = gql`
  mutation ($create: TypeAccountInput!, $type: String!, $reference: Float) {
    createAccount(
      createTypeAccount: $create
      type: $type
      referenceTypeAccount: $reference
    )
  }
`
function TypeAccountGeneral({
  setShowModalCreate
}: {
  setShowModalCreate: any
}) {
  const { context } = Token()
  const [indexForm, setIndexForm] = useState('')
  const [type, setType] = useState<TypeAccountEnum>()
  const [typeReference, setTypeReference] = useState<TypeAccountEnum>()
  const [typeCode, setTypeCode] = useState<number>(NaN)
  const { data, refetch } = useQuery(GET_CLASS, { context })
  const { data: dataGroup, refetch: queryGroup } = useQuery(GET_GROUP, {
    context
  })
  const { data: dataAccount, refetch: queryAccount } = useQuery(GET_ACCOUNT, {
    context
  })
  const [dispatch, setDispatch] = useState(null)
  const [dispatchValue, setDispatchValue] = useState(null)
  const { data: dataSubAccount, refetch: querySubAccount } = useQuery(
    GET_SUBACCOUNT,
    { context }
  )
  const {
    register: informationAccount,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })
  const { typeAccount } = useTypeAccount()
  const [values, setValues] = useState<number[]>([NaN, NaN, NaN, NaN, NaN])
  const [
    createTypeAccount,
    { data: typeData, loading: loadingType, error: errorType }
  ] = useMutation(CREATE_TYPE_ACCOUNT)
  const route = useRouter()
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    if (data) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [typeData, errorType])
  const changeElement = (index: number, value: number) => {
    console.log(index, value)
    const updateValues = [...values]
    updateValues[index] = value
    setValues(updateValues)
  }

  const handleCreate = () => {
    console.log(getValues())
    setShowWarning(true)
    if (typeCode === 0) {
      console.log(type, typeCode)
      createTypeAccount({
        variables: {
          create: {
            code: getValues('code'),
            name: getValues('name'),
            nature: getValues('nature')
          },
          type: type
        }
      })
    }
    if (typeCode >= 1) {
      console.log(values[typeCode - 1])
      createTypeAccount({
        variables: {
          create: {
            code: getValues('code'),
            name: getValues('name'),
            nature: getValues('nature')
          },
          type: type,
          reference: getValues(typeReference)
        },
        context
      })
    }
  }
  if (typeData?.createAccount && !showWarning) {
    setShowModalCreate(false)
    route.push('/dashboard/parametrization/typeaccount')
    route.refresh()
  }
  console.log(getValues())

  useEffect(() => {
    if (dispatchValue === TypeAccountEnum.CLASS) {
      setValue(TypeAccountEnum.GROUP, '')
      setValue(TypeAccountEnum.ACCOUNT, '')
      setValue(TypeAccountEnum.SUBACCOUNT, '')
    }
    if (dispatchValue === TypeAccountEnum.GROUP) {
      setValue(TypeAccountEnum.ACCOUNT, '')
      setValue(TypeAccountEnum.SUBACCOUNT, '')
    }
    if (dispatchValue === TypeAccountEnum.ACCOUNT) {
      setValue(TypeAccountEnum.SUBACCOUNT, '')
    }
  }, [dispatch])
  console.log(errors)
  return (
    <Modal
      size="  md:h-auto bg-white md:min-w-[550px]  md:w-[600px]"
      title="Crear tipo de cuenta"
      onClick={() => {
        setShowModalCreate(false)
        route.push('/dashboard/parametrization/typeaccount')
      }}
    >
      <div className="overflow-y-scroll flex-grow  flex h-full w-full flex-col p-2 ">
        <div className="overflow-x-scroll w-screen h-10 md:w-auto flex flex-row items-center bg-[#F2F6F8] mt-3  rounded-lg ">
          {optionsAccounts.map((option, index) => (
            <div
              key={option.id}
              className="flex flex-row w-full items-center justify-center text-sm "
              onClick={() => {
                setIndexForm(option.name)
                setType(option.name)
                setTypeCode(option.id)

                index !== 0 && setTypeReference(optionsAccounts[index - 1].name)
              }}
            >
              <div
                className={`h-5 w-5  rounded-[50%] border-2 border-[#10417B] ${
                  option.name === indexForm ? 'bg-[#10417B]' : 'bg-white'
                }`}
              />
              <label className="ml-2 mr-4">{option.name}</label>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit(handleCreate)}
          className="flex flex-col mt-4"
        >
          {(indexForm === TypeAccountEnum.GROUP ||
            indexForm === TypeAccountEnum.ACCOUNT ||
            indexForm === TypeAccountEnum.SUBACCOUNT ||
            indexForm === TypeAccountEnum.AUXILIARY) && (
            <Select
              label="Clase"
              options={data?.getClassAccountAll}
              setValue={setValue}
              name={TypeAccountEnum.CLASS}
              required
              control={control}
              dispatch={dispatch}
              setDispatchValue={setDispatchValue}
              setDispatch={setDispatch}
              rules={FieldRequired}
              error={errors?.Clase}
            />
          )}

          {(indexForm === TypeAccountEnum.ACCOUNT ||
            indexForm === TypeAccountEnum.SUBACCOUNT ||
            indexForm === TypeAccountEnum.AUXILIARY) && (
            <Select
              label="Grupo"
              required
              options={dataGroup?.getGroupByClass}
              setValue={setValue}
              name={TypeAccountEnum.GROUP}
              control={control}
              handleQuery={() => {
                queryGroup({
                  code: getValues(TypeAccountEnum.CLASS),
                  context
                })
              }}
              dispatch={dispatch}
              setDispatchValue={setDispatchValue}
              setDispatch={setDispatch}
              rules={FieldRequired}
              error={errors?.Grupo}
            />
          )}

          {(indexForm === TypeAccountEnum.SUBACCOUNT ||
            indexForm === TypeAccountEnum.AUXILIARY) && (
            <Select
              label="Cuenta"
              required
              options={dataAccount?.getAccountsByGroup}
              setValue={setValue}
              name={TypeAccountEnum.ACCOUNT}
              control={control}
              handleQuery={() => {
                queryAccount({
                  code: getValues(TypeAccountEnum.GROUP)
                })
              }}
              dispatch={dispatch}
              setDispatchValue={setDispatchValue}
              setDispatch={setDispatch}
              rules={FieldRequired}
              error={errors?.Cuenta}
            />
          )}

          {indexForm === TypeAccountEnum.AUXILIARY && (
            <Select
              label="Subcuenta"
              required
              options={dataSubAccount?.getSubAccountByAccount}
              setValue={setValue}
              name={TypeAccountEnum.SUBACCOUNT}
              control={control}
              dispatch={dispatch}
              setDispatchValue={setDispatchValue}
              handleQuery={() => {
                querySubAccount({
                  code: getValues(TypeAccountEnum.ACCOUNT)
                })
              }}
              rules={FieldRequired}
              error={errors?.Subcuenta}
            />
          )}
          <TypeAccountForm
            informationAccount={informationAccount}
            errors={errors}
            control={control}
            setValue={setValue}
            handleClicckCancel={() => {
              setShowModalCreate(false)
            }}
          />
        </form>
      </div>

      {typeData?.createAccount && showWarning ? (
        <AlertModalSucces value={`la ${type} ha sido creada`} />
      ) : typeData?.createAccount === false && showWarning ? (
        <AlertModalError value={`El codigo  ya existe con otra cuenta`} />
      ) : (
        errorType && showWarning && <AlertModalError value="Error" />
      )}
    </Modal>
  )
}

export default TypeAccountGeneral
