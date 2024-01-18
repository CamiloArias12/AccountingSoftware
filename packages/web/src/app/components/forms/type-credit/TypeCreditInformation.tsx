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
import { useFieldArray, useForm } from 'react-hook-form'
import { FieldRequired } from '@/lib/utils/FieldValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaTypeCredit } from '@/lib/utils/ValidationYup'

const AUXLILIARIES = gql`
  query {
    getAuxilaryAll {
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

let renderCount = 0

export function TypeCreditForm({
  dataTypeCredit,
  onClickAccept,
  onClickCancel
}: {
  dataTypeCredit?: any
  onClickAccept: any
  onClickCancel: any
}) {
  const { data, loading, error } = useQuery(AUXLILIARIES)
  const [accounts, setAccounts] = useState<TypeCreditSavingAcounts[]>([])
  const [accountsInterest, setAccountsInterest] = useState<
    TypeCreditSavingAcounts[]
  >([])

  const { typeCredit, setTypeCredit, handleTypeCredit } = useTypeCredit()
  const {
    register: informationCredit,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all',
    // @ts-ignore
    resolver: yupResolver(schemaTypeCredit)
  })
  const { fields, append, remove } = useFieldArray({
    name: 'accounts',
    control,
    rules: {
      required: 'Please append at least 1 item'
    }
  })
  const {
    fields: fieldsInterest,
    append: appendInterest,
    remove: removeInterest
  } = useFieldArray({
    name: 'accountsInterest',
    control,
    rules: {
      required: 'Please append at least 1 item'
    }
  })

  useEffect(() => {
    if (dataTypeCredit) {
      console.log(dataTypeCredit)
      setValue('interest', dataTypeCredit.interest)
      setValue('name', dataTypeCredit.name)

      const accountInput: TypeCreditSavingAcounts[] = []
      const accountInterestInput: TypeCreditSavingAcounts[] = []
      for (const auxiliary of dataTypeCredit.auxiliaries) {
        if (auxiliary.typeAccount === 'Capital') {
          accountInput.push({
            account: auxiliary.idAccount,
            nature: auxiliary.nature
          })
        }
        if (auxiliary.typeAccount === 'Interes') {
          accountInterestInput.push({
            account: auxiliary.idAccount,
            nature: auxiliary.nature
          })
        }
      }
      console.log(accountInput)

      setValue('accounts', accountInput)
      setValue('accountsInterest', accountInterestInput)
    }
  }, [dataTypeCredit])

  renderCount++

  console.log('renders tiasdf', renderCount)

  return (
    <form
      onSubmit={handleSubmit(() => {
        onClickAccept(
          { name: getValues('name'), interest: getValues('interest') },
          getValues().accounts,
          getValues().accountsInterest
        )
      })}
      className="flex flex-col   w-full h-full"
    >
      <div className="flex flex-col space-y-4 w-full max-w-3xl p-4">
        {/* InputFields */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <InputField
            name="name"
            label="Nombre"
            required
            props={{
              ...informationCredit('name')
            }}
            error={errors?.name}
          />

          <InputNumber
            name="interest"
            label="Interés"
            control={control}
            required
            error={errors?.interest}
            suffix=" %"
          />
        </div>
        <div className="flex flex-grow flex-col">
          <label className="text-center text-white  bg-[#10417B] text-input font-bold my-2">
            Cuentas
          </label>
          <div className="flex  flex-grow flex-row justify-between">
            <label className="font-semibold text-input">Capital</label>
            <div
              className="flex flex-row items-center justify-between hover:bg-[#F5F2F2] hover:rounded-[20px] group p-1"
              onClick={() => {
                append({
                  account: '',
                  nature: ''
                })
              }}
            >
              <div className="flex group-hover:text-blue items-center justify-center rounded-[50%] h-6 w-6 bg-[#10417B] ">
                <AddSvg color="#ffffff" />
              </div>
              <label className="pl-2 hidden group-hover:block text-[12px]">
                Agregar
              </label>
            </div>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className=" gap-2 flex flex-grow w-full my-2  flex-row"
            >
              <Select
                name={`accounts.${index}.account`}
                label={index === 0 && 'Cuenta'}
                options={data.getAuxilaryAll}
                setValue={setValue}
                control={control}
                required
                error={errors?.accounts && errors?.accounts[index]?.account}
                value={getValues(`accounts.${index}.account`)}
              />
              <SelectField
                label={index === 0 && 'Naturaleza'}
                name={`accounts.${index}.nature`}
                options={optionsNature}
                control={control}
                setValue={setValue}
                required
                error={errors?.accounts && errors?.accounts[index]?.nature}
              />
              <div className="flex items-end">
                <button
                  type="button"
                  className="flex items-end justify-center h-8 w-8"
                  onClick={() => {
                    remove(index)
                  }}
                >
                  <img src="/delete.svg" />
                </button>
              </div>
            </div>
          ))}
          <div className="flex  flex-grow flex-row justify-between">
            <label className="font-semibold text-input">Interés</label>
            <div
              className="flex flex-row items-center justify-between hover:bg-[#F5F2F2] hover:rounded-[20px] group p-1"
              onClick={() => {
                appendInterest({
                  account: '',
                  nature: ''
                })
              }}
            >
              <div className="flex group-hover:text-blue items-center justify-center rounded-[50%] h-6 w-6 bg-[#10417B] ">
                <AddSvg color="#ffffff" />
              </div>
              <label className="pl-2 hidden group-hover:block text-[12px]">
                Agregar
              </label>
            </div>
          </div>

          {fieldsInterest.map((field, index) => (
            <div
              key={field.id}
              className=" gap-2 flex flex-grow w-full my-2  flex-row"
            >
              <Select
                name={`accountsInterest.${index}.account`}
                label={index === 0 && 'Cuenta'}
                options={data.getAuxilaryAll}
                setValue={setValue}
                control={control}
                required
                value={getValues(`accountsInterest.${index}.account`)}
                error={
                  errors?.accountsInterest &&
                  errors?.accountsInterest[index]?.account
                }
              />
              <SelectField
                label={index === 0 && 'Naturaleza'}
                name={`accountsInterest.${index}.nature`}
                options={optionsNature}
                control={control}
                setValue={setValue}
                required
                error={
                  errors?.accountsInterest &&
                  errors?.accountsInterest[index]?.nature
                }
              />
              <div className="flex items-end">
                <button
                  type="button"
                  className="flex items-end justify-center h-8 w-8"
                  onClick={() => {
                    removeInterest(index)
                  }}
                >
                  <img src="/delete.svg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-10 flex justify-end">
        <div className="pr-4">
          <Button
            name="Cancelar"
            background="border border-[#10417B] text-[#10417B]"
            onClick={onClickCancel}
          />
        </div>
        <div className="pr-4">
          <Button
            name="Aceptar"
            background="bg-[#10417B] text-white"
            type={'submit'}
          />
        </div>
      </div>
    </form>
  )
}

export default TypeCreditForm
