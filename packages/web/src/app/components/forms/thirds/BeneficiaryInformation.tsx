import React, { useEffect, useState } from 'react'
import InputField from '../../input/InputField'
import { AddSvg } from '../../logo/Add'
import InputNumberBeneficiary from '../../input/InputNumberBeneficiary'
import { useFieldArray } from 'react-hook-form'
import {} from '@/lib/utils/FieldValidation'

export function BeneficiaryInformation({
  control,
  beneficiaryInformation,
  errors,
  setValue
}: {
  control: any
  beneficiaryInformation: any
  errors: any
  setValue: any
}) {
  const { fields, append, remove } = useFieldArray({
    name: 'beneficiaries',
    control,
    rules: {
      required: 'Please append at least 1 item'
    }
  })
  return (
    <>
      <div className="flex flex-row  mt-4 justify-between ">
        <label className="text-sm font-bold">Beneficiarios</label>
        <button
          className=" w-24  flex flex-end items-center  hover:bg-[#F5F2F2] hover:rounded-[20px] group p-1"
          onClick={() => {
            append({
              beneficiary: {
                idDocument: '',
                name: ''
              },
              percentage: ''
            })
          }}
          type="button"
        >
          <div className="flex group-hover:text-blue items-center justify-center rounded-[50%] h-6 w-6 bg-[#10417B] ">
            <AddSvg color="#ffffff" />
          </div>
          <label className="pl-2 hidden group-hover:block text-[12px]">
            Agregar
          </label>
        </button>
      </div>

      <div className="flex flex-col gap-2 ">
        {fields.map((field, index) => (
          <section key={field.id} className="flex flex-row gap-2">
            <InputField
              type="text"
              name={`beneficiaries.${index}.beneficiary.name`}
              label={index === 0 && 'Nombres'}
              required
              value={''}
              props={{
                ...beneficiaryInformation(
                  `beneficiaries.${index}.beneficiary.name`
                )
              }}
              error={
                errors?.beneficiaries &&
                errors?.beneficiaries[index]?.beneficiary?.name &&
                errors?.beneficiaries[index]?.beneficiary?.name
              }
            />
            <InputNumberBeneficiary
              name={`beneficiaries.${index}.beneficiary.idDocument`}
              label={index === 0 && 'Identificacion'}
              control={control}
              required
              error={
                errors?.beneficiaries &&
                errors?.beneficiaries[index]?.beneficiary?.idDocument &&
                errors?.beneficiaries[index]?.beneficiary?.idDocument
              }
              setValue={setValue}
            />
            <InputNumberBeneficiary
              name={`beneficiaries.${index}.percentage`}
              label={index === 0 && 'Porcentaje'}
              control={control}
              required
              error={
                errors?.beneficiaries &&
                errors?.beneficiaries[index]?.percentage &&
                errors?.beneficiaries[index]?.percentage
              }
              setValue={setValue}
            />

            <button
              type="button"
              className="flex items-end justify-center h-8 w-8"
              onClick={() => {
                remove(index)
              }}
            >
              <img src="/delete.svg" />
            </button>
          </section>
        ))}
      </div>
    </>
  )
}

export default BeneficiaryInformation
