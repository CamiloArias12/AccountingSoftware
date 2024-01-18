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
      }
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
        }
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
        }
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
      }
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
    <div className=" flex-grow flex flex-col  ">
      <div className="flex justify-between ">
        <label className="font-bold px-4 item-center  bg-white pt-2">
          Refinaciar credito
        </label>
        <div className="flex  flex-row bg-white mt-3 pl-4  pt-2">
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
        className="  flex h-full overflow-scroll h-max-full justify-between-between flex-col bg-white p-4"
      >
        <section className="flex  flex-col gap-2">
          <div className="flex   flex-col  rounded-sm ">
            <div className=" flex-grow flex flex-row">
              <div className="flex-grow flex flex-col pr-2 ">
                <label className="text-center text-white  bg-[#3C7ac2] text-input font-bold mb-2">
                  Afliliado
                </label>
                <div className=" flex flex-grow gap-2  flex-row">
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
              <div className="flex-grow flex flex-col px-2  ">
                <label className="text-center text-white  bg-[#3C7ac2] text-input font-bold mb-2">
                  Tipo de credito
                </label>
                <div className="flex flex-grow  gap-2 flex-row">
                  <InputField
                    label="Nombre"
                    name="typeCredit"
                    props={{
                      ...informationCredit('typeCredit')
                    }}
                  />
                  <div className="flex flex-grow flex-row gap-2 items-end">
                    <label className="text-input pb-2 ">
                      {' '}
                      Interes {dataCredit.interest}%
                    </label>
                    <label className="text-input pb-2">
                      {dataCredit.interest * 12} %
                    </label>
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
            </div>
            <div className="flex-grow flex flex-col mt-2  ">
              <label className="text-center text-white  bg-[#3C7ac2]   text-input font-bold mb-2">
                Datos credito
              </label>
              <div className="flex-grow flex flex-row gap-2">
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
                  label="Valor credito"
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
          <div className="pt-2 flex justify-end mr-4 ">
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

        <div className="flex-grow h-full">
          {(loadingAmortization || loadingAmortizationThree) && <Logo />}

          {data.length > 0 && (
            <>
              <TableAmortization
                isChange={
                  methodPayment !== PaymentMethods.singlePayment ? true : false
                }
                data={data}
                setData={setData}
                setSelected={true}
                handleAmortizationTable={handleAmortizationTable}
              />

              <div className=" flex flex-row  justify-end gap-2">
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
                <Button
                  name="Cancelar"
                  background="border border-[#10417B] text-[#10417B]"
                  route="/dashboard/wallet/credit/all"
                />
              </div>
            </>
          )}
        </div>
        {dataRefinace?.refinanceCreditCreate && showWarning ? (
          <AlertModalSucces value="El  credito ha sido refinanciado" />
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
