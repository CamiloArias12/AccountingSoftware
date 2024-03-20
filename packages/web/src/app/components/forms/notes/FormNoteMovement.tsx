import { useEffect, useState } from 'react'
import { optionsNature } from '@/lib/utils/type-account/options'
import InputField from '@/app/components/input/InputField'
import SelectAffiliate from '@/app/components/input/SelectAffiliate'
import Select from '@/app/components/input/Select'
import InputCalendar from '@/app/components/input/Calendar'
import { FieldRequired } from '@/lib/utils/FieldValidation'
import SelectField from '@/app/components/input/SelectField'
import { ThirdsType } from '@/lib/utils/thirds/OptionsThirds'
import Modal from '@/app/components/modal/Modal'
import Button from '@/app/components/input/Button'
import { useFieldArray } from 'react-hook-form'
import { NoteOptions } from '@/lib/utils/movement/types'
import InputNumber from '../../input/InputNumber'
import { AddSvg } from '../../logo/Add'
import ButtonAdd from '../../input/ButtonAdd'
import { LabeTitle } from '../../input/LabelTitle'

function FormNoteMovement({
  companys,
  accounts,
  control,
  informationMovement,
  setValue,
  unregister,
  errors,
  onAccept,
  loading,
  handleSubmit,
  users,
  thirdsType,
  getValues
}: {
  users: any
  companys: any
  accounts: any
  control: any
  informationMovement: any
  setValue: any
  unregister: any
  onAccept: any
  handleSubmit: any
  loading: boolean
  thirdsType?: number[]
  errors: any
  getValues?: any
}) {
  const { fields, append, remove } = useFieldArray({
    name: 'accounts',
    control,
    rules: {
      required: 'Please append at least 1 item'
    }
  })
  console.log(thirdsType)
  const [third, setThird] = useState<number[]>(thirdsType || [])
  const [indexChange, setIndexChange] = useState({ index: 0, option: 0 })
  useEffect(() => {
    console.log(third, indexChange, 'incex')
    third.map((third, index) => {
      if (third === 1 && index === indexChange.index) {
        unregister(`accounts.${index}.company`)
        setValue(`accounts.${index}.user`, '')
        setValue(`accounts.${index}.nameThird`, '')
      }
      if (third === 2 && index === indexChange.index) {
        unregister(`accounts.${index}.user`)
        setValue(`accounts.${index}.company`, '')
        setValue(`accounts.${index}.nameThird`, '')
      }
    })
  }, [indexChange])

  const handleThird = (id: number, value: number) => {
    setThird(
      third.map((t, index) => {
        if (index === id) {
          return value
        } else {
          return t
        }
      })
    )
  }
  const deleteThird = (id: number) => {
    setThird(third.filter((t: any, index) => index !== id))
  }

  const addThird = () => {
    setThird([...third, 1])
  }
  return (
    <form
      className="flex  flex-col p-2 gap-2 "
      onSubmit={handleSubmit(onAccept)}
    >
      <div className={`flex flex-grow flex-col md:flex-row  pt-2 gap-2 `}>
        <SelectField
          name="type"
          label="Tipo de movimiento"
          options={NoteOptions}
          control={control}
          rules={FieldRequired}
          required
          error={errors.type}
          setValue={setValue}
        />

        <InputCalendar
          name="date"
          label="Fecha"
          control={control}
          required
          rules={FieldRequired}
          error={errors.date}
        />
      </div>

      <InputField
        name="concept"
        label="Concepto"
        required
        props={{
          ...informationMovement('concept', FieldRequired)
        }}
        error={errors?.concept}
      />

      <ButtonAdd
        onClick={() => {
          append({})
          addThird()
        }}
      />
      <LabeTitle value="Movimiento cuentas" />

      <section className="flex  flex-col p-2 gap-2  min-h-[300px]  overflow-scroll">
        {fields.map((field, index) => (
          <div key={field.id} className="flex  flex-row gap-4 pb-2 border-b-2">
            <div className="flex-col flex gap-2  ">
              <LabeTitle
                className={`${index !== 0 && 'hidden'}`}
                value="Tercero"
              />

              <div className="flex flex-row  xl:items-end xl:flex-row gap-2">
                <div className="flex w-[280px] flex-row gap-2 items-end">
                  {ThirdsType.map(option => (
                    <div
                      key={option.id}
                      className={`flex  ${
                        index === 0
                          ? 'flex-col justify-between gap-6'
                          : 'flex-row  justify-center'
                      } items-center  text-sm w-[170px]`}
                      onClick={() => {
                        setIndexChange({ index: index, option: option.id })
                        handleThird(index, option.id)
                      }}
                    >
                      <span
                        className={`${
                          index !== 0
                            ? 'hidden'
                            : 'font-bold text-center text-input-medium 2xl:text-input'
                        } ml-2 mr-4`}
                      >
                        {option.name}
                      </span>
                      <div
                        className={`h-4 w-4  rounded-[50%] border-2 border-[#10417B] 
		    ${option.id === third[index] ? 'bg-[#10417B]' : 'bg-white'}

		    `}
                      />
                    </div>
                  ))}
                </div>
                <SelectAffiliate
                  options={third[index] === 1 ? users : companys}
                  name={
                    third[index] === 1
                      ? `accounts.${index}.user`
                      : `accounts.${index}.company`
                  }
                  label={index === 0 && 'Identificacion'}
                  setValue={setValue}
                  control={control}
                  rules={FieldRequired}
                  className="  h-[30px] "
                  indexArray={`accounts.${index}`}
                  error={
                    errors?.accounts &&
                    (third[index] === 1
                      ? errors?.accounts[index]?.user?.message
                      : errors?.accounts[index]?.company?.message)
                  }
                  required
                />
                <InputField
                  name={`accounts.${index}.nameThird`}
                  label={index === 0 && 'Nombre/Razon social'}
                  className="h-[30px] "
                  props={{
                    ...informationMovement(`accounts.${index}.nameThird`)
                  }}
                  onlyRead
                />
              </div>
            </div>
            <div className="flex-grow flex flex-col gap-2">
              <LabeTitle
                className={`${index !== 0 && 'hidden'}`}
                value="Cuenta"
              />

              <div className="flex flex-row  xl:items-end xl:flex-grow xl:flex-row gap-2">
                <Select
                  name={`accounts.${index}.account`}
                  label={index === 0 && 'Codigo/Nombre'}
                  setValue={setValue}
                  options={accounts}
                  control={control}
                  className="h-[30px] "
                  required
                  rules={FieldRequired}
                  error={errors?.accounts && errors?.accounts[index]?.account}
                  value={getValues && getValues(`accounts.${index}.account`)}
                />
                <SelectField
                  name={`accounts.${index}.nature`}
                  label={index === 0 && 'Naturaleza'}
                  options={optionsNature}
                  setValue={setValue}
                  className="  h-[30px] "
                  required
                  rules={FieldRequired}
                  control={control}
                  error={errors?.accounts && errors?.accounts[index]?.nature}
                />
                <InputNumber
                  name={`accounts.${index}.value`}
                  label={index === 0 && 'Valor'}
                  control={control}
                  prefix="$ "
                  className="h-[30px] "
                  thousandSeparator=","
                  rules={FieldRequired}
                  required
                  error={errors?.accounts && errors?.accounts[index]?.value}
                />
                <button
                  type="button"
                  className="flex items-end justify-center h-8 w-8"
                  onClick={() => {
                    remove(index)
                    deleteThird(index)
                  }}
                >
                  <img src="/delete.svg" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
      <div className="pt-10 flex gap-2 flex-col md:flex-row justify-end">
        <Button
          name="Cancelar"
          background="border border-[#10417B] text-[#10417B]"
          type={'button'}
          route="/dashboard/accounting/notes"
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

export default FormNoteMovement
