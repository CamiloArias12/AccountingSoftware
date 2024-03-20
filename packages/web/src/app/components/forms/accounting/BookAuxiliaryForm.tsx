'use client'
import { useEffect, useState } from 'react'
import InputField from '@/app/components/input/InputField'
import SelectAffiliate from '@/app/components/input/SelectAffiliate'
import Select from '@/app/components/input/Select'
import InputCalendar from '@/app/components/input/Calendar'
import { FieldRequired } from '@/lib/utils/FieldValidation'
import { ThirdsType } from '@/lib/utils/thirds/OptionsThirds'
import Button from '@/app/components/input/Button'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { downloadBook } from '@/lib/axios/uploadFiles'
import { LabeTitle } from '../../input/LabelTitle'
import { Token } from '@/app/hooks/TokenContext'

function FormBook({
  users,
  companys,
  accounts,
  searchRoute
}: {
  users: any
  companys: any
  accounts: any
  searchRoute: string
}) {
  const {
    register: informationMovement,
    handleSubmit,
    setValue,
    unregister,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })
  const [third, setThird] = useState(1)
  const [button, setButton] = useState(null)
  useEffect(() => {
    if (third === 1) {
      unregister('company')
      setValue('user', '')
      setValue('nameThird', '')
    } else {
      unregister('user')
      setValue('company', '')
      setValue('nameThird', '')
    }
  }, [third])
  const { context } = Token()
  const route = useRouter()
  return (
    <form
      className="flex flex-col p-4 gap-2 bg-white shadow "
      onSubmit={handleSubmit(async data => {
        if (button === 1) {
          await downloadBook(
            {
              user: data.user ? data.user : null,
              company: data.company ? data.company : null,
              idAccount: data.account ? data.account : '',
              startDate: data.startDate,
              endDate: data.endDate
            },
            context.headers.Authorization
          )
        } else {
          const queryString = new URLSearchParams({
            user: data.user,
            company: data.company ? data.company : '',
            //idAccount: data.account ? data.account : '',
            startDate: data.startDate.toISOString(),
            endDate: data.endDate.toISOString()
          }).toString()
          route.push(`${searchRoute}?${queryString}`)
        }
      })}
    >
      <div className="flex flex-grow flex-col sm:flex-row gap-2 ">
        <InputCalendar
          name="startDate"
          label="Fecha inicio"
          control={control}
          required
          rules={FieldRequired}
          error={errors.startDate}
        />
        <InputCalendar
          name="endDate"
          label="Fecha final"
          control={control}
          required
          rules={FieldRequired}
          error={errors.endDate}
        />
      </div>
      <div className="flex flex-grow  flex-col lg:flex-row  gap-2 ">
        <div className="flex flex-grow flex-col  gap-2">
          <LabeTitle value="Tercero" />

          <div className="flex  flex-row">
            {ThirdsType.map(option => (
              <div
                key={option.id}
                className="flex flex-row w-full items-center justify-center text-sm "
                onClick={() => {
                  setThird(option.id)
                }}
              >
                <div
                  className={`h-5 w-5  rounded-[50%] border-2 border-[#10417B] ${
                    option.id === third ? 'bg-[#10417B]' : 'bg-white'
                  }`}
                />
                <label className="ml-2 mr-4">{option.name}</label>
              </div>
            ))}
          </div>

          <div className="flex  flex-col gap-2 md:flex-row">
            <SelectAffiliate
              options={third === 1 ? users : companys}
              name={third === 1 ? 'user' : 'company'}
              label="Identificación"
              setValue={setValue}
              control={control}
              error={
                third === 1 ? errors?.user?.message : errors?.company?.message
              }
            />
            <InputField
              name="nameThird"
              label={third === 1 ? 'Nombre' : 'Razon social'}
              props={{
                ...informationMovement('nameThird')
              }}
              onlyRead
            />
          </div>
        </div>

        <div className="flex md:justify-between  justify-center flex-grow flex-col  gap-2 ">
          <LabeTitle value="Cuenta" />
          <Select
            name="account"
            label="Codigo/Nombre"
            setValue={setValue}
            options={accounts}
            control={control}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-end gap-2">
        <Button
          name="Buscar"
          background="bg-[#10417B] text-white md:w-28 "
          image="/search-white.svg"
          type={'submit'}
          onClick={() => {
            setButton(0)
          }}
        />
        <Button
          name="Descargar"
          background="bg-[#10417B] text-white md:w-28 "
          image="/download-white.svg"
          type={'submit'}
          onClick={() => {
            setButton(1)
          }}
        />
      </div>
    </form>
  )
}

export default FormBook
