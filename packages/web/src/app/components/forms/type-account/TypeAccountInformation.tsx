'use client'
import React from 'react'
import InputField from '@/app/components/input/InputField'
import Button from '../../input/Button'
import { optionsNature } from '@/lib/utils/type-account/options'
import SelectField from '../../input/SelectField'
import { useForm } from 'react-hook-form'
import { FieldRequired } from '@/lib/utils/FieldValidation'
import InputNumber from '../../input/InputNumber'

export function TypeAccountForm({
  informationAccount,
  errors,
  control,
  setValue,
  handleClicckCancel
}: {
  informationAccount: any
  errors: any
  control: any
  setValue: any
  handleClicckCancel: any
}) {
  return (
    <div className="flex flex-col gap-2 ">
      <label className="text-center text-white  bg-[#10417B] text-input font-bold">
        Información cuenta
      </label>
      <InputNumber
        name="code"
        label="Código"
        control={control}
        rules={FieldRequired}
        required
        error={errors?.code}
      />

      <InputField
        name="name"
        label="Nombre"
        required
        props={{ ...informationAccount('name', FieldRequired) }}
        error={errors?.name}
      />
      <SelectField
        name="nature"
        options={optionsNature}
        label="Naturaleza"
        control={control}
        setValue={setValue}
        required
        error={errors.nature}
        rules={FieldRequired}
      />

      <div className="pt-10 flex gap-2 flex-col md:flex-row justify-end">
        <Button
          name="Cancelar"
          type={'button'}
          background="border border-[#10417B] text-[#10417B]"
          onClick={handleClicckCancel}
        />
        <Button
          type={'submit'}
          name="Aceptar"
          background="bg-[#10417B] text-white"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}
export default TypeAccountForm
