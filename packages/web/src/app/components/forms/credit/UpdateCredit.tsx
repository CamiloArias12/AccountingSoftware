'use client'
import { useQuery, gql, useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { AmortizationTable } from '@/lib/utils/credit/types'
import UpdateTableAmortization from './UpdateTableAmortization'
import { useCredit } from '@/app/hooks/credit/CreditInput'
import InputField from '../../input/InputField'
import InputCalendar from '../../input/Calendar'
import Button from '../../input/Button'
import AlertModalError from '../../modal/AlertModalError'
import AlertModalSucces from '../../modal/AlertModalSucces'
import { useForm } from 'react-hook-form'

const GENERATE_TABLE_AMORTIZATION_CHANGE = gql`
  mutation ($table: ChangeAmortization!) {
    amortizationTableChangeUpdate(tableAmortization: $table) {
      installmentNumber
      paymentDate
      initialBalance
      scheduledPayment
      extraPayment
      totalPayment
      capital
      interest
      finalBalance
      state
    }
  }
`

const UPDATE_CREDIT = gql`
  mutation ($data: UpdateCreditInput!) {
    updateCredit(data: $data)
  }
`
function UpdateCredit({
  idCredit,
  dataCredit
}: {
  idCredit: number
  dataCredit: any
}) {
  const {
    credit,
    setCredit,
    handleCreditNumber,
    handleCreditSelect,
    handleCredit
  } = useCredit()
  const {
    register: informationCredit,
    unregister,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })

  const [showWarningUpdate, setShowWarningUpdate] = useState(false)
  const [data, setData] = useState<AmortizationTable[]>([
    ...dataCredit.installments
  ])
  const [generateAmortizationChange, { data: dataNew, loading: loadingNew }] =
    useMutation(GENERATE_TABLE_AMORTIZATION_CHANGE)
  const [
    updateCredit,
    { data: updateData, loading: updateLoading, error: errorUpdate }
  ] = useMutation(UPDATE_CREDIT)

  const handleAmortizationTable = () => {
    setData([])
    const table = {
      tableAmortization: data
    }
    generateAmortizationChange({
      variables: {
        table: table
      }
    })
  }

  const handleUpdateCredit = () => {
    setShowWarningUpdate(true)
    updateCredit({
      variables: {
        data: {
          idCredit: idCredit,
          installments: data
        }
      }
    })
  }

  useEffect(() => {
    setCredit({
      identification: dataCredit.affiliate?.user?.identification,
      creditValue: dataCredit.creditValue,
      discountDate: new Date(dataCredit.discountDate),
      startDate: new Date(dataCredit.startDate),
      installments: dataCredit.installments.length,
      interestAnual: String(dataCredit.interest * (12 / 100) * 100),
      nameAffiliate: `${dataCredit.affiliate?.user?.name} ${dataCredit?.affiliate?.user?.lastName}`,
      typeCredit: dataCredit.typeCredit?.name,
      scheduledPayment: dataCredit.installments[0].scheduledPayment,
      idTypeCredit: dataCredit.typeCredit?.id,
      interest: dataCredit.interest,
      newBalance: '',
      previewBalance: '',
      concept: '',
      methodPayment: dataCredit.methodPayment
    })
  }, [dataCredit])

  useEffect(() => {
    if (dataNew) {
      setData(dataNew.amortizationTableChangeUpdate)
      setCredit({
        ...credit,
        installments: dataNew.amortizationTableChangeUpdate.length
      })
    }
  }, [dataNew])

  console.log(dataCredit.methodPayment)

  return (
    <div className="flex flex-col  flex-grow">
      <label className="font-bold px-4 item-center  bg-white pt-2">
        Actualizar crédito
      </label>

      <div className="  flex h-full overflow-scroll h-max-full justify-between-between flex-col bg-white p-4">
        <div className="  flex flex-row gap-2">
          <div className="flex-grow flex flex-col gap-2">
            <label className="text-center text-white  bg-[#10417B] text-input font-bold mb-2">
              Afliliado
            </label>
            <div className=" flex flex-grow  gap-2 flex-row">
              <InputField
                label="Identificación"
                name="identification"
                value={credit.identification}
                onlyRead={true}
              />
              <InputField
                label="Nombres"
                value={credit.nameAffiliate}
                onlyRead={true}
              />
            </div>
          </div>
          <div className="flex-grow flex flex-col   ">
            <label className="text-center text-white  bg-[#10417B] text-input font-bold mb-2">
              Tipo de credito
            </label>
            <div className="flex flex-grow gap-2  flex-row">
              <InputField
                label="Nombre"
                name="typeCredit"
                value={credit.typeCredit}
              />
              <div className="flex flex-grow flex-row items-end">
                <label className="text-input pr-6">
                  {' '}
                  Interes {credit.interest}%
                </label>
                <label className="text-input">Interés anual: 16.56% </label>
                <InputField
                  label="Forma de pago"
                  name="methodPayment"
                  value={credit.methodPayment}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col mt-2  ">
          <label className="text-center text-white  bg-[#10417B]   text-input font-bold mb-2">
            Datos credito
          </label>
          <div className="flex-grow flex flex-row gap-2 ">
            <InputCalendar
              name="startDate"
              label="Fecha de creación"
              value={credit.startDate}
              onChange={handleCreditSelect}
            />
            <InputCalendar
              name="discountDate"
              label="Fecha de descuento"
              value={credit.discountDate}
              onChange={handleCreditSelect}
            />
            <InputField
              label="Valor"
              value={credit.creditValue}
              onlyRead={true}
            />
            <InputField
              label="Número de coutas"
              value={credit.installments}
              onBlur={handleCreditNumber}
              onlyRead={true}
            />
            <InputField
              label="Valor couta"
              value={credit.scheduledPayment}
              onlyRead={true}
            />
          </div>
        </div>
        {data.length > 0 && (
          <UpdateTableAmortization
            data={data}
            setData={setData}
            handleAmortizationTable={handleAmortizationTable}
          />
        )}
        <div className="pt-10 flex justify-end">
          <div className="pr-4">
            <Button
              name="Cancelar"
              background="border border-[#10417B] text-[#10417B]"
            />
          </div>
          <Button
            name="Aceptar"
            background="bg-[#10417B] text-white"
            onClick={handleUpdateCredit}
            loading={updateLoading}
          />
        </div>
      </div>
      {updateData?.updateCredit === true && showWarningUpdate ? (
        <AlertModalSucces value="Se han actualizado los datos" />
      ) : updateData?.updateCredit === false && showWarningUpdate ? (
        <AlertModalError value="Los datos no se pueden actualizar" />
      ) : (
        errorUpdate && showWarningUpdate && <AlertModalError value="Error" />
      )}
    </div>
  )
}

export default UpdateCredit
