'use client'
import { useEffect, useState } from 'react'
import { AmortizationTable } from '@/lib/utils/credit/types'
import { useCredit } from '@/app/hooks/credit/CreditInput'
import InputField from '../../input/InputField'
import InputCalendar from '../../input/Calendar'
import Button from '../../input/Button'
import { useForm } from 'react-hook-form'
import ViewTableAmortization from './ViewTableAmortization'
import { LabeTitle } from '../../input/LabelTitle'

function ViewCredit({
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

  const [showWarningView, setShowWarningUpdate] = useState(false)
  const [data, setData] = useState<AmortizationTable[]>([
    ...dataCredit.installments
  ])

  useEffect(() => {
    setCredit({
      identification: dataCredit.affiliate?.user?.identification,
      creditValue: `$ ${dataCredit.creditValue.toLocaleString()}`,
      discountDate: new Date(dataCredit.discountDate),
      startDate: new Date(dataCredit.startDate),
      installments: dataCredit.installments.length,
      interestAnual: String(dataCredit.interest * (12 / 100) * 100 + ' %'),
      nameAffiliate: `${dataCredit.affiliate?.user?.name} ${dataCredit?.affiliate?.user?.lastName}`,
      typeCredit: dataCredit.typeCredit?.name,
      scheduledPayment: `$ ${dataCredit.installments[0].scheduledPayment.toLocaleString()}`,
      idTypeCredit: dataCredit.typeCredit?.id,
      interest: String(dataCredit.interest + ' %'),
      newBalance: '',
      previewBalance: '',
      concept: '',
      methodPayment: dataCredit.methodPayment
    })
  }, [dataCredit])

  return (
    <div className=" md:w-full bg-white overflow-scroll gap-2 p-2 md:p-4">
      <div className="  flex flex-col 2xl:flex-row gap-2">
        <div className=" flex flex-grow flex-col gap-2">
          <LabeTitle value="Afiliado" />
          <div className=" flex flex-grow  gap-2 flex-col md:flex-row">
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
        <div className="flex flex-grow flex-col   ">
          <LabeTitle value="Tipo de crédito" />
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:flex flex-grow gap-2  flex-row">
            <InputField
              label="Nombre"
              name="typeCredit"
              value={credit.typeCredit}
            />
            <InputField
              label="Interés"
              name="interest"
              value={credit.interest}
            />
            <InputField
              label="Interés anual"
              name="interest"
              value={credit.interestAnual}
            />

            <InputField
              label="Forma de pago"
              name="methodPayment"
              value={credit.methodPayment}
              onlyRead
            />
          </div>
        </div>
      </div>
      <div className=" flex flex-col mt-2  gap-2 ">
        <LabeTitle value="Datos crédito" />
        <div className=" gap-2  xl:flex xl:flex-row md:grid grid-cols-1 md:grid-cols-3">
          <InputCalendar
            name="startDate"
            label="Fecha de creación"
            value={credit.startDate}
            onChange={handleCreditSelect}
            onlyRead
          />
          <InputCalendar
            name="discountDate"
            label="Fecha de descuento"
            value={credit.discountDate}
            onChange={handleCreditSelect}
            onlyRead
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
      <div className="mt-2 overflow-x-scroll">
        {data.length > 0 && <ViewTableAmortization data={data} />}
      </div>
      <div className="pt-10 flex flex-col md:flex-row justify-end">
        <Button
          name="Regresar"
          background="border border-[#10417B] text-[#10417B]"
          route="/dashboard/wallet/credit/"
        />
      </div>
    </div>
  )
}

export default ViewCredit
