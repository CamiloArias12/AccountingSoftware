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

function FormMovement({
  account,
  users,
  companys,
  accounts,
  control,
  informationMovement,
  setValue,
  unregister,
  errors,
  thirdShow,
  onAccept,
  loading,
  setShowModal,
  handleSubmit
}: {
  account?: boolean
  thirdShow?: boolean
  users?: any
  companys?: any
  accounts?: any
  control: any
  informationMovement: any
  setValue: any
  unregister: any
  setShowModal: any
  onAccept: any
  handleSubmit: any
  loading: boolean
  errors: any
}) {
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
  return (
    <Modal
      onClick={() => {
        setShowModal(false)
      }}
      size=" lg:w-[500px] bg-white lg:h-[90%]"
      title="Información movimiento"
    >
      <div className="flex flex-col py-2   ">
        <form
          className="flex  flex-col p-2 gap-2 "
          onSubmit={handleSubmit(onAccept)}
        >
          <div className="flex flex-grow flex-col  ">
            {companys && users && (
              <div className="flex flex-grow flex-col  gap-2">
                <label className="text-center text-white  bg-[#10417B] text-input font-bold">
                  Tercero
                </label>

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
                <SelectAffiliate
                  options={third === 1 ? users : companys}
                  name={third === 1 ? 'user' : 'company'}
                  label="Identificación"
                  setValue={setValue}
                  control={control}
                  rules={FieldRequired}
                  required
                  error={
                    third === 1
                      ? errors?.user?.message
                      : errors?.company?.message
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
            )}
            {account && (
              <div className="flex justify-center flex-grow flex-col  gap-2 my-2">
                <label className="text-center text-white  bg-[#10417B] text-input font-bold">
                  Cuenta
                </label>

                <Select
                  name="account"
                  label="Codigo/Nombre"
                  setValue={setValue}
                  options={accounts}
                  control={control}
                  required
                  rules={FieldRequired}
                  error={errors?.account}
                />
                <SelectField
                  name="nature"
                  label={'Naturaleza'}
                  options={optionsNature}
                  setValue={setValue}
                  required
                  error={errors?.nature}
                  rules={FieldRequired}
                  control={control}
                />
              </div>
            )}
            <div
              className={`flex flex-grow flex-col  border-[#10417B]  border-t-4 pt-2 gap-2 `}
            >
              <div>
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
            </div>
          </div>
          <div className="flex flex-row justify-end gap-2">
            <Button
              name="Cancelar"
              background="border border-[#10417B] text-[#10417B]"
              type={'button'}
              onClick={() => {
                setShowModal(false)
              }}
            />

            <Button
              name="Aceptar"
              background="bg-[#10417B] text-white"
              loading={loading}
              type={'submit'}
            />
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default FormMovement
