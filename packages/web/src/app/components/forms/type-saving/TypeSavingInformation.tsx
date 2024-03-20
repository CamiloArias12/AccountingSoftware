'use client'
import { useEffect, useState } from 'react'
import InputField from '@/app/components/input/InputField'
import { gql, useMutation, useQuery } from '@apollo/client'
import Select from '../../input/Select'
import Button from '../../input/Button'
import { AddSvg } from '../../logo/Add'
import { useRouter } from 'next/navigation'
import { TypeSavingAcounts } from '@/lib/utils/type-saving/types'
import SelectOptions from '../../input/SelectOptions'
import { optionsNature } from '@/lib/utils/type-account/options'
import InputNumber from '../../input/InputNumber'
import { NumberFormatValues } from 'react-number-format'
import { useTypeSaving } from '@/app/hooks/type-saving/TypeSavingInput'
import { useFieldArray, useForm } from 'react-hook-form'
import SelectField from '../../input/SelectField'
import { FieldRequired } from '@/lib/utils/FieldValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { schemaTypeSaving } from '@/lib/utils/ValidationYup'
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

export function TypeSavingForm({
  dataTypeSaving,
  onClickAccept,
  onClickCancel
}: {
  dataTypeSaving?: any
  onClickAccept: any
  onClickCancel: any
}) {
  const { context } = Token()
  const { data, loading, error } = useQuery(AUXLILIARIES, { context })
  const [accounts, setAccounts] = useState<TypeSavingAcounts[]>([])

  const {
    register: informationSaving,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all',
    // @ts-ignore
    resolver: yupResolver(schemaTypeSaving)
  })
  const { fields, append, remove } = useFieldArray({
    name: 'accounts',
    control,
    rules: {
      required: { value: true, message: 'Agrega al menos 3 cuentas' },
      minLength: { value: 3, message: 'Agrega al menos 3 cuentas' }
    }
  })

  useEffect(() => {
    if (dataTypeSaving) {
      setValue('name', dataTypeSaving.name)
      const accountInput: TypeSavingAcounts[] = []
      dataTypeSaving.auxiliaries.map((auxiliary: any) => {
        accountInput.push({
          account: auxiliary.idAccount,
          nature: auxiliary.nature,
          percentage: auxiliary.percentage
        })
      })

      setValue('accounts', accountInput)
    }
  }, [dataTypeSaving])

  return (
    <form
      onSubmit={handleSubmit(() => {
        onClickAccept({ name: getValues('name') }, getValues().accounts)
      })}
      className="flex flex-col py-2 w-full    "
    >
      {/* InputFields */}
      <div className="flex-grow gap-4 md:mt-8">
        <InputField
          name="name"
          label="Nombre"
          required
          props={{
            ...informationSaving('name')
          }}
          error={errors?.name}
        />
      </div>
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

          <div className="flex-grow lg:w-4/5">
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
          </div>
          <SelectField
            label={'Naturaleza'}
            name={`accounts.${index}.nature`}
            options={optionsNature}
            control={control}
            setValue={setValue}
            required
            error={errors?.accounts && errors?.accounts[index]?.nature}
          />
          <InputNumber
            name={`accounts.${index}.percentage`}
            label={'Porcentaje'}
            suffix="  %"
            control={control}
            required
            error={errors?.accounts && errors?.accounts[index]?.percentage}
          />

          <div className="md:flex md:items-end">
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

export default TypeSavingForm
