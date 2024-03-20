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
import InputNumber from '../../input/InputNumber'
import { LabeTitle } from '../../input/LabelTitle'
import { Token } from '@/app/hooks/TokenContext'
import { useRouter } from 'next/navigation'

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

  const { context } = Token()
  const [showWarningUpdate, setShowWarningUpdate] = useState(false)
  const [data, setData] = useState<AmortizationTable[]>([
    ...dataCredit.installments
  ])

  const route = useRouter()
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
      },
      context
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
      },
      context
    })
  }
  useEffect(() => {
    if (updateData) {
      const timeout = setTimeout(() => {
        setShowWarningUpdate(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [updateData, errorUpdate])

  useEffect(() => {
    const date = dataCredit.startDate.split('-', 3)
    const date2 = dataCredit.discountDate.split('-', 3)

    setCredit({
      identification: dataCredit.affiliate?.user?.identification,
      creditValue: dataCredit.creditValue,
      discountDate: new Date(
        Number(date2[0]),
        Number(date2[1]) - 1,
        Number(date2[2].split('T', 1))
      ),
      startDate: new Date(
        Number(date[0]),
        Number(date[1]) - 1,
        Number(date[2].split('T', 1))
      ),
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

  if (updateData?.updateCredit && !showWarningUpdate) {
    route.push('/dashboard/wallet/credit')
    route.refresh()
  }

  return (
    <div className=" max-h-full h-full w-full flex flex-col  md:overflow-scroll  ">
      <div className="flex justify-between ">
        <h1 className="hidden md:flex font-bold px-4 item-center  bg-white pt-2">
          Editar crédito
        </h1>
      </div>
      <div className="  flex h-full h-max-full justify-between-between overflow-scroll flex-col bg-white md:p-4 p-2 gap-2">
        <div className=" flex-grow  flex-col flex 2xl:flex-row gap-2">
          <div className="flex-grow flex flex-col md:pr-2 ">
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
          <div className="flex-grow flex flex-col  md:px-2 gap-2 2xl:gap-0 ">
            <LabeTitle value="Tipo de crédito" />

            <div className=" gap-2  xl:flex xl:flex-row md:grid grid-cols-1 md:grid-cols-2">
              <InputField
                label="Nombre"
                name="typeCredit"
                value={credit.typeCredit}
                onlyRead
              />
              <InputNumber
                label="Interés"
                value={credit.interest}
                readonly
                suffix=" %"
              />
              <InputNumber
                label="Interés anual"
                value={Number(credit.interest) * 12}
                readonly
                suffix=" %"
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
        <div className="flex-grow flex flex-col mt-2  ">
          <LabeTitle value="Informacion crédito" />
          <div className=" gap-2  xl:flex xl:flex-row md:grid grid-cols-1 md:grid-cols-2">
            <InputCalendar
              name="startDate"
              label="Fecha de creación"
              value={credit.startDate}
              onlyRead
            />
            <InputCalendar
              name="discountDate"
              label="Fecha de descuento"
              value={credit.discountDate}
              onlyRead
            />
            <InputNumber
              label="Valor"
              value={credit.creditValue}
              readonly
              prefix="$ "
              thousandSeparator=","
            />
            <InputNumber
              label="Número de coutas"
              value={credit.installments}
              readonly
            />
            <InputNumber
              label="Valor couta"
              value={credit.scheduledPayment}
              prefix="$ "
              thousandSeparator=","
              readonly
            />
          </div>
        </div>
        {data.length > 0 && (
          <div className="flex flex-grow flex-col min-h-[500px] md:h-max-[300px]  md:overflow-scroll">
            <UpdateTableAmortization
              data={data}
              setData={setData}
              handleAmortizationTable={handleAmortizationTable}
            />
          </div>
        )}
        <div className="flex flex-col pt-4 md:flex-row justify-end gap-2">
          <Button
            name="Cancelar"
            background="border border-[#10417B] text-[#10417B]"
            route="/dashboard/wallet/credit/"
          />
          <Button
            name="Aceptar"
            background="bg-[#10417B] text-white"
            onClick={handleUpdateCredit}
            loading={updateLoading}
          />
        </div>
      </div>
      {updateData?.updateCredit === true && showWarningUpdate ? (
        <AlertModalSucces value="El crédito ha sido actualizado" />
      ) : updateData?.updateCredit === false && showWarningUpdate ? (
        <AlertModalError value="El crédito no ha sido actualizado" />
      ) : (
        errorUpdate && showWarningUpdate && <AlertModalError value="Error" />
      )}
    </div>
  )
}

export default UpdateCredit
