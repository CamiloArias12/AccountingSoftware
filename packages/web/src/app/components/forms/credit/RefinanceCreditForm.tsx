'use client'
import InputField from '@/app/components/input/InputField'
import { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Button from '@/app/components/input/Button'
import Logo from '@/app/components/logo/Logo'
import TableAmortization from '@/app/components/forms/credit/TableAmortization'
import { AmortizationTable, RefinanceCredit } from '@/lib/utils/credit/types'
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
import { useForm } from 'react-hook-form'
import { FieldRequired } from '@/lib/utils/FieldValidation'
import InputNumber from '../../input/InputNumber'
import SelectField from '../../input/SelectField'
import { LabeTitle } from '../../input/LabelTitle'
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

const REFINANCE_CREDIT = gql`
  mutation ($id: Float!, $create: CreateCreditInput!) {
    refinanceCreditCreate(id: $id, createCreditInput: $create)
  }
`

export const revalidate = 0
function RefinanceCreditForm({
  dataCredit,
  id
}: {
  id: number
  dataCredit: RefinanceCredit
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
  const [methodPayment, setMethodPayment] = useState<string>()
  const [data, setData] = useState<AmortizationTable[]>([])
  const [option, setOption] = useState<number>(0)
  const [button, setButton] = useState<number>(0)
  const [
    generateAmortizationTable,
    {
      data: dataAmortization,
      loading: loadingAmortization,
      error: errorAmortization
    }
  ] = useMutation(GENERATE_TABLE_AMORTIZATION)
  const [
    generateAmortizationTableThree,
    {
      data: dataAmortizationThree,
      loading: loadingAmortizationThree,
      error: errorAmortizationThree
    }
  ] = useMutation(GENERATE_TABLE_AMORTIZATION_THREE)
  const [
    refinaceCredit,
    { data: dataRefinace, loading: loadingRefinace, error: errorRefinace }
  ] = useMutation(REFINANCE_CREDIT)
  const [showWarning, setShowWarning] = useState(false)
  const route = useRouter()
  const [
    generateAmortizationChange,
    {
      data: dataAmortizationChange,
      loading: loadingAmortizationChange,
      error: errorAmortizationChange
    }
  ] = useMutation(GENERATE_TABLE_AMORTIZATION_CHANGE)

  const handleRefinaceCredit = () => {
    setShowWarning(true)

    refinaceCredit({
      variables: {
        create: {
          creditValue: getValues('creditValue'),
          valuePrevius: getValues('previewBalance'),
          interest: getValues('interest'),
          startDate: getValues('startDate'),
          discountDate: getValues('dateCredit'),
          affiliateId: getValues('idAffiliate'),
          idTypeCredit: getValues('idTypeCredit'),
          installments: data,
          concept: getValues('concept'),
          methodPayment: getValues('paymentMethod')
        },
        id: id
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
          creditValue: getValues('total'),
          interest: getValues('interest'),
          installments: getValues('installments')
        },
        context
      })
    }

    if (option === 2) {
      generateAmortizationTableThree({
        variables: {
          scheduledPayment: getValues('scheduledPayment'),
          date: getValues('dateCredit'),
          creditValue: getValues('total'),
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

  useEffect(() => {
    if (data) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dataRefinace, errorRefinace])

  if (dataRefinace?.refinanceCreditCreate && !showWarning) {
    route.push('/dashboard/wallet/credit')
    route.refresh()
  }

  useEffect(() => {
    setValue('idAffiliate', dataCredit.identification)
    setValue('interest', dataCredit.interest)
    setValue('interestAnual', dataCredit.interest * 12)
    setValue('nameThird', dataCredit.nameAffiliate)
    setValue('typeCredit', dataCredit.typeCredit)
    setValue('idTypeCredit', dataCredit.idTypeCredit)
    setValue('previewBalance', dataCredit.previewBalance)
    setValue('creditValue', 0)
    setValue('total', dataCredit.previewBalance)
  }, [])

  useEffect(() => {
    setData([])
    if (methodPayment === PaymentMethods.singlePayment) {
      setOption(0)
      unregister('installments')
    }
  }, [methodPayment])
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
    }
  }, [dataAmortization])

  useEffect(() => {
    if (dataAmortizationThree && data.length === 0) {
      setData([...dataAmortizationThree.amortizationTableGenerateThree])
    }
  }, [dataAmortizationThree])

  return (
    <div className=" max-h-full h-full w-full flex flex-col  overflow-scroll  ">
      <div className="flex justify-between ">
        <h1 className="hidden md:flex font-bold px-4 item-center  bg-white pt-2">
          Refinaciar crédito
        </h1>
        <div className=" flex  flex-row  mt-3 pl-4 p-2 md:p-0 md:pt-2 md:bg-white bg-sky-50 overflow-scroll">
          {methodPayment !== PaymentMethods.singlePayment && (
            <>
              {optionsCredit.map(opt => (
                <>
                  {opt.id !== 1 && (
                    <>
                      <div
                        key={opt.id}
                        className="flex flex-grow flex-row  items-center justify-center text-sm "
                        onClick={() => {
                          setOption(opt.id)
                          setData([])
                          console.log('option', option)
                        }}
                      >
                        <div
                          className={`h-5 w-5  rounded-[50%] border-2 border-[#10417B] ${
                            opt.id === option ? 'bg-[#10417B]' : 'bg-white'
                          }`}
                        />
                        <label className="ml-2 mr-4">{opt.name}</label>
                      </div>
                    </>
                  )}
                </>
              ))}
            </>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(
          button === 2
            ? handleRefinaceCredit
            : button === 1 && handleGenerateTable
        )}
        className="  flex h-full h-max-full justify-between-between md:overflow-scroll flex-col bg-white md:p-4 p-2 gap-2"
      >
        <section className="flex  flex-col gap-2">
          <div className="flex   flex-col  rounded-sm ">
            <div className=" flex-grow  flex-col flex 2xl:flex-row gap-2">
              <div className="flex-grow flex flex-col md:pr-2 ">
                <LabeTitle value="Afiliado" />
                <div className=" flex flex-grow  flex-col md:flex-row">
                  <InputField
                    label="Identificación"
                    name="idAffiliate"
                    onlyRead
                    props={{
                      ...informationCredit('idAffiliate')
                    }}
                  />
                  <InputField
                    label="Nombres"
                    onlyRead
                    props={{
                      ...informationCredit('nameThird')
                    }}
                  />
                </div>
              </div>
              <div className="flex-grow flex flex-col  md:px-2 gap-2 2xl:gap-0 ">
                <LabeTitle value="Tipo de crédito" />

                <div className=" gap-2  xl:flex xl:flex-row md:grid grid-cols-1 md:grid-cols-2">
                  <InputField
                    label="Nombre"
                    name="typeCredit"
                    props={{
                      ...informationCredit('typeCredit')
                    }}
                  />
                  <InputNumber
                    label="Interes"
                    name="interest"
                    suffix=" %"
                    thousandSeparator=","
                    control={control}
                    readonly
                  />

                  <InputNumber
                    label="Interes anual"
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
              <div className=" gap-2  xl:flex xl:flex-row md:grid grid-cols-1 md:grid-cols-3">
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

                <InputNumber
                  label="Saldo anterior"
                  name="previewBalance"
                  prefix="$ "
                  thousandSeparator=","
                  control={control}
                  readonly
                />
                <InputNumber
                  label="Valor crédito"
                  name="creditValue"
                  prefix="$ "
                  thousandSeparator=","
                  control={control}
                  handleChange={(value: number) => {
                    setValue('total', getValues('previewBalance') + value)
                  }}
                  error={errors.creditValue}
                  rules={FieldRequired}
                  required
                />

                {(option === 0 || option === 2) && (
                  <InputNumber
                    label="Valor"
                    name="total"
                    prefix="$ "
                    thousandSeparator=","
                    control={control}
                    readonly
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
          <div className="pt-2 gap-2  flex-col flex md:flex-row justify-end mr-4 ">
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
          loadingAmortizationThree ||
          loadingAmortizationChange) && <Logo />}

        {(loadingAmortization || loadingAmortizationThree) && <Logo />}

        <>
          {data.length > 0 && (
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
          )}
          <div className="pt-10 flex gap-2 flex-col md:flex-row justify-end">
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
        </>
        {dataRefinace?.refinanceCreditCreate && showWarning ? (
          <AlertModalSucces value="El crédito ha sido refinanciado" />
        ) : dataRefinace?.refinanceCreditCreate === false && showWarning ? (
          <AlertModalError value="Error" />
        ) : (
          errorRefinace && showWarning && <AlertModalError value="Error" />
        )}
      </form>
    </div>
  )
}

export default RefinanceCreditForm
