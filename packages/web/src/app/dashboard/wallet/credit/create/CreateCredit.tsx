'use client'

import InputField from '@/app/components/input/InputField'
import SelectAffiliate from '@/app/components/input/SelectAffiliate'
import { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Button from '@/app/components/input/Button'
import Logo from '@/app/components/logo/Logo'
import TableAmortization from '@/app/components/forms/credit/TableAmortization'
import { AmortizationTable } from '@/lib/utils/credit/types'
import {
  PaymentMethods,
  optionsCredit,
  optionsMethod
} from '@/lib/utils/credit/options'
import { useCredit } from '@/app/hooks/credit/CreditInput'
import { useRouter } from 'next/navigation'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import AlertModalError from '@/app/components/modal/AlertModalError'
import InputCalendar from '@/app/components/input/Calendar'
import InputNumber from '@/app/components/input/InputNumber'
import { Controller, useForm } from 'react-hook-form'
import { FieldRequired } from '@/lib/utils/FieldValidation'
import SelectField from '@/app/components/input/SelectField'
import { LabeTitle } from '@/app/components/input/LabelTitle'
import { set } from 'date-fns'
import { Token } from '@/app/hooks/TokenContext'

const GENERATE_TABLE_AMORTIZATION = gql`
  mutation (
    $dateCredit: Date!
    $datePayment: Date
    $paymentMethod: String!
    $creditValue: Float!
    $interest: Float!
    $installments: Int
  ) {
    amortizationTableGenerate(
      dateCredit: $dateCredit
      datePayment: $datePayment
      creditValue: $creditValue
      paymentMethod: $paymentMethod
      interest: $interest
      installments: $installments
    ) {
      installmentNumber
      paymentDate
      initialBalance
      scheduledPayment
      extraPayment
      totalPayment
      capital
      interest
      finalBalance
    }
  }
`
const GENERATE_TABLE_AMORTIZATION_TWO = gql`
  mutation (
    $date: Date!
    $interest: Float!
    $paymentMethod: String!
    $installments: Int!
    $scheduledPayment: Float!
  ) {
    amortizationTableGenerateTwo(
      Date: $date
      scheduledPayment: $scheduledPayment
      paymentMethod: $paymentMethod
      interest: $interest
      installments: $installments
    ) {
      installmentNumber
      paymentDate
      initialBalance
      scheduledPayment
      extraPayment
      totalPayment
      capital
      interest
      finalBalance
    }
  }
`

const GENERATE_TABLE_AMORTIZATION_THREE = gql`
  mutation (
    $date: Date!
    $creditValue: Float!
    $interest: Float!
    $paymentMethod: String!
    $scheduledPayment: Float!
  ) {
    amortizationTableGenerateThree(
      Date: $date
      creditValue: $creditValue
      paymentMethod: $paymentMethod
      interest: $interest
      scheduledPayment: $scheduledPayment
    ) {
      installmentNumber
      paymentDate
      initialBalance
      scheduledPayment
      extraPayment
      totalPayment
      capital
      interest
      finalBalance
    }
  }
`
const CREATE_CREDIT = gql`
  mutation ($create: CreateCreditInput!) {
    createCredit(createCreditInput: $create)
  }
`
const GENERATE_TABLE_AMORTIZATION_CHANGE = gql`
  mutation ($table: ChangeAmortization!) {
    amortizationTableChange(tableAmortization: $table) {
      installmentNumber
      paymentDate
      initialBalance
      scheduledPayment
      extraPayment
      totalPayment
      capital
      interest
      finalBalance
    }
  }
`
export const revalidate = 0
function FormCredit({
  affiliates,
  creditType
}: {
  affiliates: any
  creditType: any
  accounts?: any
}) {
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
  const [data, setData] = useState<AmortizationTable[]>([])
  const [option, setOption] = useState<number>(0)
  const [button, setButton] = useState<number>(0)
  const [methodPayment, setMethodPayment] = useState<string>()
  const [
    generateAmortizationTable,
    {
      data: dataAmortization,
      loading: loadingAmortization,
      error: errorAmortization
    }
  ] = useMutation(GENERATE_TABLE_AMORTIZATION)
  const [
    generateAmortizationTableTwo,
    {
      data: dataAmortizationTwo,
      loading: loadingAmortizationTwo,
      error: errorAmortizationTwo
    }
  ] = useMutation(GENERATE_TABLE_AMORTIZATION_TWO)
  const [
    generateAmortizationTableThree,
    {
      data: dataAmortizationThree,
      loading: loadingAmortizationThree,
      error: errorAmortizationThree
    }
  ] = useMutation(GENERATE_TABLE_AMORTIZATION_THREE)
  const [
    createCredit,
    { data: dataCreate, loading: loadingCreate, error: errorCreate }
  ] = useMutation(CREATE_CREDIT)
  const [showWarning, setShowWarning] = useState(false)
  const route = useRouter()

  const handleCreateCredit = () => {
    const create = {
      creditValue: getValues('creditValue'),
      interest: getValues('interest'),
      startDate: getValues('startDate'),
      discountDate: getValues('dateCredit'),
      affiliateId: getValues('identification'),
      idTypeCredit: getValues('idTypeCredit'),
      installments: data,
      concept: getValues('concept'),
      methodPayment: getValues('paymentMethod')
    }
    createCredit({
      variables: {
        create: create
      },
      context
    })
  }

  const handleGenerateTable = () => {
    setShowWarning(true)
    setData([])
    if (option === 0) {
      generateAmortizationTable({
        variables: {
          dateCredit: getValues('dateCredit'),
          datePayment: getValues('datePayment'),
          paymentMethod: getValues('paymentMethod'),
          creditValue: getValues('creditValue'),
          interest: getValues('interest'),
          installments: getValues('installments')
        },
        context
      })
    }
    if (option === 1) {
      console.log(getValues('paymentMethod'))
      generateAmortizationTableTwo({
        variables: {
          scheduledPayment: getValues('scheduledPayment'),
          date: getValues('dateCredit'),
          interest: getValues('interest'),
          installments: getValues('installments'),
          paymentMethod: getValues('paymentMethod')
        },
        context
      })
    }

    if (option === 2) {
      generateAmortizationTableThree({
        variables: {
          scheduledPayment: getValues('scheduledPayment'),
          date: getValues('dateCredit'),
          creditValue: getValues('creditValue'),
          interest: getValues('interest'),
          paymentMethod: getValues('paymentMethod')
        },
        context
      })
    }
  }
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

  const [
    generateAmortizationChange,
    {
      data: dataAmortizationChange,
      loading: loadingAmortizationChange,
      error: errorAmortizationChange
    }
  ] = useMutation(GENERATE_TABLE_AMORTIZATION_CHANGE)

  useEffect(() => {
    if (dataAmortizationChange && data.length === 0) {
      setData([...dataAmortizationChange.amortizationTableChange])
      setValue(
        'installments',
        dataAmortizationChange.amortizationTableChange.length
      )
    }
  }, [dataAmortizationChange])

  useEffect(() => {
    if (dataAmortization && data.length === 0) {
      setData([...dataAmortization.amortizationTableGenerate])
      setValue(
        'installments',
        dataAmortization.amortizationTableGenerate.length
      )
    }
  }, [dataAmortization])

  useEffect(() => {
    if (dataAmortizationTwo && data.length === 0) {
      setData([...dataAmortizationTwo.amortizationTableGenerateTwo])
      setValue(
        'installments',
        dataAmortizationTwo.amortizationTableGenerateTwo.length
      )
      setValue(
        'creditValue',
        dataAmortizationTwo.amortizationTableGenerateTwo[0].initialBalance
      )
    }
  }, [dataAmortizationTwo])

  useEffect(() => {
    if (dataAmortizationThree && data.length === 0) {
      setData([...dataAmortizationThree.amortizationTableGenerateThree])
      setValue(
        'installments',
        dataAmortizationThree.amortizationTableGenerateThree.length
      )
    }
  }, [dataAmortizationThree])

  useEffect(() => {
    if (data) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dataCreate, errorCreate])

  useEffect(() => {
    setData([])
    if (methodPayment === PaymentMethods.singlePayment) {
      setOption(0)
      unregister('installments')
    }
  }, [methodPayment])

  if (dataCreate?.createCredit && !showWarning) {
    route.push('/dashboard/wallet/credit')
    route.refresh()
  }

  return (
    <div className=" max-h-full h-full w-full flex flex-col  md:overflow-scroll  ">
      <div className="flex justify-between ">
        <h1 className="hidden md:flex font-bold px-4 item-center  bg-white pt-2">
          Crear crédito
        </h1>
        <div className=" flex  flex-row gap-2 mt-3 pl-4 py-2   md:pt-2 md:bg-white bg-sky-50 overflow-scroll">
          {methodPayment !== PaymentMethods.singlePayment && (
            <>
              {optionsCredit.map(opt => (
                <div
                  key={opt.id}
                  className="flex flex-row  items-center justify-center text-sm "
                  onClick={() => {
                    setOption(opt.id)
                    setData([])
                  }}
                >
                  <div
                    className={`h-5 w-5 cursor-pointer rounded-[50%] border-2 border-[#10417B] ${
                      opt.id === option ? 'bg-[#10417B]' : 'bg-white'
                    }`}
                  />
                  <span className="ml-2 mr-4 min-w-[150px]">{opt.name}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(
          button === 2
            ? handleCreateCredit
            : button === 1 && handleGenerateTable
        )}
        className="  flex h-full h-max-full justify-between-between overflow-scroll flex-col bg-white md:p-4 p-2 gap-2"
      >
        <section className="flex  flex-col gap-2">
          <div className="flex   flex-col  rounded-sm ">
            <div className=" flex-grow  flex-col flex 2xl:flex-row gap-2">
              <div className="flex-grow flex flex-col md:pr-2 ">
                <LabeTitle value="Afiliado" />
                <div className=" flex flex-grow gap-2  flex-col md:flex-row">
                  <SelectAffiliate
                    label="Identificación"
                    name="identification"
                    options={affiliates}
                    setValue={setValue}
                    control={control}
                    rules={FieldRequired}
                    required
                    onClick={(option: any) => {
                      console.log(option)
                      setValue('identification', option.user.identification)
                      setValue(
                        'nameThird',
                        `${option.user.name} ${option.user.lastName}`
                      )
                    }}
                    error={errors?.identification?.message}
                  />
                  <InputField
                    label="Nombres"
                    onlyRead={true}
                    props={{
                      ...informationCredit('nameThird')
                    }}
                  />
                </div>
              </div>
              <div className="flex-grow flex flex-col  md:px-2 gap-2 2xl:gap-0 ">
                <LabeTitle value="Tipo de crédito" />

                <div className=" gap-2  xl:flex xl:flex-row md:grid grid-cols-1 md:grid-cols-2">
                  <SelectAffiliate
                    label="Nombre"
                    name="typeCredit"
                    options={creditType}
                    setValue={setValue}
                    control={control}
                    rules={FieldRequired}
                    error={errors?.typeCredit?.message}
                    onClick={(option: any) => {
                      setValue('interest', option.interest)
                      setValue('interestAnual', option.interest * 12)
                      setValue('typeCredit', option.name)
                      setValue('idTypeCredit', option.id)
                    }}
                    required
                  />
                  <InputNumber
                    label="Interés"
                    name="interest"
                    suffix=" %"
                    thousandSeparator=","
                    control={control}
                    readonly
                  />

                  <InputNumber
                    label="Interés anual"
                    name="interestAnual"
                    suffix=" %"
                    thousandSeparator=","
                    control={control}
                    readonly
                  />

                  <SelectField
                    name="paymentMethod"
                    control={control}
                    label="Forma de pago"
                    options={optionsMethod}
                    setValue={setValue}
                    required
                    rules={FieldRequired}
                    error={errors?.paymentMethod}
                    setDispatch={setMethodPayment}
                  />
                </div>
              </div>
            </div>
            <div className="flex-grow flex flex-col mt-2  ">
              <LabeTitle value="Informacion crédito" />
              <div className=" gap-2 xl:grid-cols-4  2xl:flex 2xl:flex-row md:grid grid-cols-1 md:grid-cols-2">
                <InputCalendar
                  name="startDate"
                  label="Fecha de creación"
                  control={control}
                  required
                  rules={FieldRequired}
                  error={errors.startDate}
                />

                <InputCalendar
                  name="dateCredit"
                  label="Fecha de descuento"
                  control={control}
                  required
                  rules={FieldRequired}
                  error={errors.dateCredit}
                />

                {(option === 0 || option === 2) && (
                  <InputNumber
                    label="Valor"
                    name="creditValue"
                    prefix="$ "
                    thousandSeparator=","
                    control={control}
                    required
                    rules={FieldRequired}
                    error={errors.creditValue}
                  />
                )}

                {(option === 0 || option === 1) &&
                  methodPayment !== PaymentMethods.singlePayment && (
                    <InputNumber
                      label="Número de coutas"
                      name="installments"
                      control={control}
                      rules={FieldRequired}
                      error={errors.installments}
                    />
                  )}

                {(option === 2 || option === 1) && (
                  <InputNumber
                    label="Valor couta"
                    name="scheduledPayment"
                    control={control}
                    prefix="$ "
                    thousandSeparator=","
                    required
                    rules={FieldRequired}
                    error={errors.scheduledPayment}
                  />
                )}
                {methodPayment === PaymentMethods.singlePayment && (
                  <InputCalendar
                    name="datePayment"
                    label="Fecha de pago"
                    control={control}
                    required
                    rules={FieldRequired}
                    error={errors.datePayment}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="pt-2 flex flex-col md:flex-row  gap-2 justify-end mr-4 ">
            <InputField
              label="Concepto"
              name="concept"
              required
              props={{
                ...informationCredit('concept', FieldRequired)
              }}
              error={errors?.concept}
            />
            <button
              className="flex flex-row items-center gap-2 rounded-sm bg-[#F2FFA5] p-2 "
              type="submit"
              onClick={() => {
                setButton(1)
              }}
            >
              <img src="/generate.svg" height={15} width={15} />
              <span className="font-bold text-sm">Generar tabla</span>
            </button>
          </div>
        </section>
        {(loadingAmortization ||
          loadingAmortizationTwo ||
          loadingAmortizationThree ||
          loadingAmortizationChange) && <Logo />}

        {data?.length > 0 ? (
          <div className="flex flex-grow flex-col min-h-[500px] md:h-max-[300px]  md:overflow-scroll">
            <TableAmortization
              isChange={
                methodPayment !== PaymentMethods.singlePayment ? true : false
              }
              data={data}
              setData={setData}
              setSelected={true}
              handleAmortizationTable={handleAmortizationTable}
            />
          </div>
        ) : (
          <div />
        )}

        <div className=" flex  flex-col md:flex-row  justify-end gap-2">
          <Button
            name="Cancelar"
            background="border border-[#10417B] text-[#10417B]"
            route="/dashboard/wallet/credit"
          />
          {data?.length > 0 && (
            <Button
              name="Aceptar"
              type={'submit'}
              background="bg-[#10417B] 
	      
			   text-white"
              onClick={() => {
                setButton(2)
              }}
            />
          )}
        </div>
        {dataCreate?.createCredit && showWarning ? (
          <AlertModalSucces value="El  crédito ha sido registrado" />
        ) : dataCreate?.createCredit === false && showWarning ? (
          <AlertModalError value="El credit ya existe" />
        ) : (
          errorCreate && showWarning && <AlertModalError value="Error" />
        )}
      </form>
    </div>
  )
}

export default FormCredit
