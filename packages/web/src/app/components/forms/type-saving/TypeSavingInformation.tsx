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
  const { data, loading, error } = useQuery(AUXLILIARIES)
  const [accounts, setAccounts] = useState<TypeSavingAcounts[]>([])

  const { typeSaving, setTypeSaving, handleTypeSaving } = useTypeSaving()
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
      for (const auxiliary of dataTypeSaving.auxiliaries) {
        accountInput.push({
          account: auxiliary.idAccount,
          nature: auxiliary.nature,
          percentage: auxiliary.percentage
        })
      }

      setValue('accounts', accountInput)
    }
  }, [dataTypeSaving])

  console.log(errors)
  return (
    <form
      onSubmit={handleSubmit(() => {
        onClickAccept({ name: getValues('name') }, getValues().accounts)
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
            <div className="flex-grow w-4/5">
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
            </div>
            <SelectField
              label={index === 0 && 'Naturaleza'}
              name={`accounts.${index}.nature`}
              options={optionsNature}
              control={control}
              setValue={setValue}
              required
              error={errors?.accounts && errors?.accounts[index]?.nature}
            />
            <InputNumber
              name={`accounts.${index}.percentage`}
              label={index === 0 && 'Porcentaje'}
              suffix="  %"
              control={control}
              required
              error={errors?.accounts && errors?.accounts[index]?.percentage}
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
      </div>
      <div className="pt-10 flex justify-end">
        <div className="pr-4">
          <Button
            name="Cancelar"
            background="border border-[#10417B] text-[#10417B]"
          />
        </div>
        <div className="pr-4">
          <Button
            name="Aceptar"
            background="bg-[#10417B] text-white"
            onClick={() => {}}
          />
        </div>
      </div>
    </form>
  )
}

export default TypeSavingForm
