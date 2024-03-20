'use client'

import InputField from '@/app/components/input/InputField'
import Button from '@/app/components/input/Button'
import { useForm } from 'react-hook-form'
import CheckBoxField from '../../input/CheckboxField'
import CheckBoxFieldRole from '../../input/CheckBoxFieldRole'

export const revalidate = 0
function FormRole({
  onClick,
  onCancel,
  data
}: {
  onClick: any
  onCancel: any
  data?: any
}) {
  const {
    register: informationRole,
    handleSubmit,
    getValues,

    control,
    formState: { errors }
  } = useForm({
    mode: 'all',
    defaultValues: data
      ? data
      : {
          name: null,
          third: false,
          credit: false,
          saving: false,
          type_account: false,
          type_saving: false,
          type_credit: false,
          movement: false,
          deferred: false,
          cash: false,
          roles: false,
          disbursementvoucher: false,
          note: false,
          book_auxiliary: false
        }
  })

  return (
    <>
      <form
        className=" flex-grow flex flex-col bg-white h-full m-2  gap-2"
        onSubmit={handleSubmit(onClick)}
      >
        <InputField
          name="name"
          label="Nombre"
          props={{
            ...informationRole('name', { required: true })
          }}
          error={errors?.name}
          required
        />
        <div className="flex-grow flex flex-col bg-[#F8FAFF] p-4">
          {' '}
          <label className="text-center text-white  bg-[#10417B] text-input font-bold my-2">
            {' '}
            Permisos
          </label>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
            <CheckBoxFieldRole
              name="third"
              label="Terceros"
              control={control}
            />
            <CheckBoxFieldRole
              name="credit"
              label="Creditos"
              control={control}
            />
            <CheckBoxFieldRole
              name="saving"
              label="Ahorros"
              control={control}
            />
            <CheckBoxFieldRole
              name="type_account"
              label="Plan de cuentas"
              control={control}
            />
            <CheckBoxFieldRole
              name="type_saving"
              label="Tipos de ahorro"
              control={control}
            />
            <CheckBoxFieldRole
              name="type_credit"
              label="Tipos de credito"
              control={control}
            />
            <CheckBoxFieldRole
              name="movement"
              label="Movimientos"
              control={control}
            />
            <CheckBoxFieldRole
              name="deferred"
              label="Diferidos"
              control={control}
            />
            <CheckBoxFieldRole
              name="cash"
              label="Recibos de caja"
              control={control}
            />
            <CheckBoxFieldRole
              name="disbursementvoucher"
              label="Comprobantes de egreso"
              control={control}
            />
            <CheckBoxFieldRole name="roles" label="Roles" control={control} />
            <CheckBoxFieldRole
              name="note"
              label="Notas contables"
              control={control}
            />
            <CheckBoxFieldRole
              name="book_auxiliary"
              label="Libro auxiliar"
              control={control}
            />
          </div>
        </div>
        <div className="mt-8 flex gap-2 flex-col md:flex-row justify-end">
          <Button
            name="Cancelar"
            background="border border-[#10417B] text-[#10417B]"
            onClick={onCancel}
          />

          <Button
            name="Aceptar"
            type={'submit'}
            background="bg-[#10417B] text-white"
          />
        </div>
      </form>
    </>
  )
}

export default FormRole
