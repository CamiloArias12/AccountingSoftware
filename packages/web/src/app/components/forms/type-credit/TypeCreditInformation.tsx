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
import ButtonAdd from '../../input/ButtonAdd'
import { Token } from '@/app/hooks/TokenContext'

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

export function TypeCreditForm({
  dataTypeCredit,
  onClickAccept,
  onClickCancel
}: {
  dataTypeCredit?: any
  onClickAccept: any
  onClickCancel: any
}) {
  const { context } = Token()
  const { data, loading, error } = useQuery(AUXLILIARIES, { context })

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
      setValue('interest', dataTypeCredit?.interest)
      setValue('name', dataTypeCredit?.name)

      const accountInput: TypeCreditSavingAcounts[] = []
      const accountInterestInput: TypeCreditSavingAcounts[] = []
      dataTypeCredit?.auxiliaries.map((auxiliary: any) => {
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
      })
      setValue('accounts', accountInput)
      setValue('accountsInterest', accountInterestInput)
    }
  }, [dataTypeCredit])

  return (
    <form
      onSubmit={handleSubmit(() => {
        onClickAccept(
          { name: getValues('name'), interest: getValues('interest') },
          getValues().accounts,
          getValues().accountsInterest
        )
      })}
      className="flex flex-col py-2 w-full    "
    >
      <div className="flex-grow gap-4 mt-8">
        {/* InputFields */}
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
        <div className="flex flex-grow flex-col gap-2">
          <label className="text-center text-white  bg-[#10417B] text-input font-bold my-2">
            Cuentas
          </label>
          <div className="flex  flex-grow flex-row justify-between">
            <label className="font-semibold text-input">Capital</label>
            <ButtonAdd
              onClick={() => {
                append({
                  account: '',
                  nature: ''
                })
              }}
            />
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className=" gap-2 flex  w-full my-2 flex-col  p-4 lg:p-0  rounded-sm border-2 md:border-none shadow-xm lg:shadow-none lg:flex-row"
            >
              <span className="md:hidden font-bold items-center ">
                No {index + 1}
              </span>
              <Select
                name={`accounts.${index}.account`}
                label={'Cuenta'}
                options={data?.getAuxilaryAll}
                setValue={setValue}
                control={control}
                required
                error={errors?.accounts && errors?.accounts[index]?.account}
                value={getValues(`accounts.${index}.account`)}
              />
              <SelectField
                label={'Naturaleza'}
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
            <ButtonAdd
              onClick={() => {
                appendInterest({
                  account: '',
                  nature: ''
                })
              }}
            />
          </div>

          {fieldsInterest.map((field, index) => (
            <div
              key={field.id}
              className=" gap-2 flex  w-full my-2 flex-col  p-4 lg:p-0  rounded-sm border-2 md:border-none shadow-xm lg:shadow-none lg:flex-row"
            >
              <span className="md:hidden font-bold items-center ">
                No {index + 1}
              </span>
              <Select
                name={`accountsInterest.${index}.account`}
                label={'Cuenta'}
                options={data?.getAuxilaryAll}
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
                label={'Naturaleza'}
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
      <div className="pt-10 flex gap-2 flex-col md:flex-row justify-end">
        <Button
          name="Cancelar"
          background="border border-[#10417B] text-[#10417B]"
          type={'button'}
          onClick={onClickCancel}
        />
        <Button
          name="Aceptar"
          background="bg-[#10417B] text-white"
          type={'submit'}
        />
      </div>
    </form>
  )
}

export default TypeCreditForm
