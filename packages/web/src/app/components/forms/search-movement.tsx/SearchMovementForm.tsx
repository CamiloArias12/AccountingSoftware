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
import { LabeTitle } from '../../input/LabelTitle'

function SearchFormMovement({
  users,
  companys,
  accounts,
  searchRoute,
  createRoute
}: {
  users: any
  companys: any
  accounts: any
  searchRoute: string
  createRoute?: string
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
  const route = useRouter()

  return (
    <div className=" w-full h-auto  overflow-scroll ">
      <form
        className="flex  flex-col p-2 lg:p-4 gap-2 bg-white md:shadow-md "
        onSubmit={handleSubmit(data => {
          unregister('nameThird')
          const queryString = new URLSearchParams({
            user: data.user,
            company: data.company ? data.company : '',
            concept: data.concept,
            name: data.name,
            idAccount: data.account ? data.account : '',
            startDate: data.startDate.toISOString(),
            endDate: data.endDate.toISOString()
          }).toString()
          route.push(`${searchRoute}?${queryString}`)
        })}
      >
        <div className="flex  flex-col sm:grid sm:grid-cols-2 md:grid-cols-4 gap-2 ">
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
          <InputField
            name="concept"
            label="Concepto"
            props={{
              ...informationMovement('concept')
            }}
          />
          <InputField
            name="name"
            label="Identificador"
            props={{
              ...informationMovement('name')
            }}
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

            <div className="flex  flex-col gap-2  md:flex-row">
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
              label="Código/Nombre"
              setValue={setValue}
              options={accounts}
              control={control}
            />
          </div>
        </div>
        <div className="flex flex-col pt-4 md:flex-row justify-end gap-2">
          {createRoute && (
            <Button
              name="Crear"
              background="bg-[#10417B] text-white md:w-28 "
              image="/add.svg"
              route={createRoute}
            />
          )}
          <Button
            name="Buscar"
            background="bg-[#10417B] text-white md:w-28 "
            image="/search-white.svg"
            type={'submit'}
          />
        </div>
      </form>
    </div>
  )
}

export default SearchFormMovement
