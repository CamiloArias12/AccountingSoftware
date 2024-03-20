'use client'
import FormMovement from '@/app/components/forms/credit/movement/FormMovement'
import TableInstallmentPayment from '@/app/components/forms/credit/movement/TableInstallmentPayment'
import TableSavingPayment from '@/app/components/forms/credit/movement/TableSavingPayment'
import Button from '@/app/components/input/Button'
import InputCalendarRange from '@/app/components/input/CalendaRange'
import InputCalendar from '@/app/components/input/Calendar'
import SelectField from '@/app/components/input/SelectField'
import AlertModalError from '@/app/components/modal/AlertModalError'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import { Token } from '@/app/hooks/TokenContext'
import { usePaymentCredit } from '@/app/hooks/payment-credit/PaymentCreditInput'
import { FieldRequired } from '@/lib/utils/FieldValidation'
import { DeferredOptions, EnumMovement } from '@/lib/utils/movement/types'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { stringify } from 'querystring'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
const DEFERRED_SAVING = gql`
  query ($date: Date!) {
    getSavingDeferred(date: $date) {
      id
      identification
      lastName
      name
      qoutaValue
      startDate
      state
      nameSaving
    }
  }
`
const DEFERRED_SAVING_CREATE = gql`
  mutation ($data: SavingPayment!) {
    createDeferredSaving(data: $data) {
      state
      message
    }
  }
`

const DEFERRED_CREDIT = gql`
  query ($startDate: Date!, $endDate: Date!) {
    getAllInstallmentsPaymentInterest(
      startDate: $startDate
      endDate: $endDate
    ) {
      installmentNumber
      credit
      paymentDate
      scheduledPayment
      interest
      finalBalance
      identification
      name
      lastName
      typeCredit
      extraPayment
      totalPayment
      capital
      interestPayment
    }
  }
`
const DEFERRED_INTEREST_CREATE = gql`
  mutation ($data: PaymentInstallmentInput!) {
    createPaymentDeferredInterestInstallment(data: $data) {
      state
      message
    }
  }
`

function DeferredCreate() {
  const [
    installmentDeferred,
    {
      data: installmentsData,
      loading: installmentLoading,
      error: installmentError
    }
  ] = useLazyQuery(DEFERRED_CREDIT)
  const [
    installmentCreateDeferred,
    {
      data: createDataCredit,
      loading: loadingCreateDataCredit,
      error: errorCreateDataCredit
    }
  ] = useMutation(DEFERRED_INTEREST_CREATE)

  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date()
  })
  const [
    savingDeferred,
    { data: savingsData, loading: savingLoading, error: savingError }
  ] = useLazyQuery(DEFERRED_SAVING)
  const [
    savingCreateDeferred,
    {
      data: createDataSaving,
      loading: loadingCreateDataSaving,
      error: errorCreateDataSaving
    }
  ] = useMutation(DEFERRED_SAVING_CREATE)

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
  const {
    register: informationGet,
    handleSubmit: handleGet,
    setValue: dataSet,
    getValues,
    unregister: unregisterGet,
    control: controlGet,
    formState: { errors: errorsGet }
  } = useForm({
    mode: 'all',
    defaultValues: {
      date: null,
      startDate: null,
      endDate: null,
      type: null
    }
  })

  const { context } = Token()
  const [rowSelection, setRowSelection] = useState({})
  const [dispatch, setDispatch] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const route = useRouter()
  const [showWarningCreate, setShowWarningCreate] = useState(false)
  useEffect(() => {
    if (showWarning) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [showWarning])
  useEffect(() => {
    if (createDataSaving || errorCreateDataSaving) {
      const timeout = setTimeout(() => {
        setShowWarningCreate(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
    if (createDataCredit || errorCreateDataCredit) {
      const timeout = setTimeout(() => {
        setShowWarningCreate(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [
    showWarningCreate,
    errorCreateDataSaving,
    createDataSaving,
    createDataCredit,
    errorCreateDataCredit
  ])

  useEffect(() => {
    setRowSelection({})
  }, [dispatch])

  const handleCreateMovement = () => {
    console.log(Object.keys(rowSelection).length, rowSelection)
    if (Object.keys(rowSelection).length > 0) {
      setShowForm(true)
    } else {
      setShowWarning(true)
    }
  }

  const handleCreateDeferred = paymentDeferred => {
    if (getValues('type') === EnumMovement.INTEREST) {
      const installments = []
      for (const key in rowSelection) {
        if (rowSelection.hasOwnProperty(key)) {
          installments.push(
            installmentsData.getAllInstallmentsPaymentInterest[Number(key)]
          )
        }
      }
      if (installments.length > 0) {
        setShowWarningCreate(true)
        const installmentSend = []
        for (let i = 0; i < installments.length; i++) {
          if (
            !installmentSend.find(
              data => data.credit === installments[i].credit
            )
          ) {
            const installmentCredit = []
            for (let j = 0; j < installments.length; j++) {
              if (installments[i].credit === installments[j].credit) {
                installmentCredit.push(installments[j].installmentNumber)
              }
            }
            installmentSend.push({
              credit: installments[i].credit,
              installments: installmentCredit
            })
          }
        }

        installmentCreateDeferred({
          variables: {
            data: {
              installments: installmentSend,
              concept: paymentDeferred.concept,
              date: paymentDeferred.date
            }
          },
          context
        })
      }
    } else {
      const savings = []
      for (const key in rowSelection) {
        if (rowSelection.hasOwnProperty(key)) {
          savings.push(savingsData.getSavingDeferred[Number(key)].id)
        }
      }
      if (savings.length !== 0) {
        setShowWarningCreate(true)

        savingCreateDeferred({
          variables: {
            data: {
              savings: savings,
              dateMovement: paymentDeferred.date,
              datePayment: getValues('date'),
              concept: paymentDeferred.concept
            }
          },
          context
        })
      } else {
        setShowWarning(true)
      }
    }
  }

  if (
    (createDataCredit?.createPaymentDeferredInterestInstallment.state ||
      createDataSaving?.createDeferredSaving.state) &&
    !showWarningCreate
  ) {
    route.push('/dashboard/wallet/deferred')
    route.refresh()
  }

  return (
    <>
      {showForm && (
        <FormMovement
          key={1}
          control={control}
          setValue={setValue}
          unregister={unregister}
          informationMovement={informationMovement}
          errors={errors}
          onAccept={handleCreateDeferred}
          handleSubmit={handleSubmit}
          loading={showWarningCreate}
          setShowModal={setShowForm}
        />
      )}
      <div className=" max-h-full h-full w-full overflow-scroll">
        <div className="flex justify-between ">
          <h1 className=" hidden md:block font-bold px-4 item-center  bg-white pt-2">
            Crear diferido
          </h1>
        </div>
        <div className="bg-white flex flex-col  h-full w-full gap-4 px-2 md:px-4 md:py-10">
          <form
            className="flex  flex-col md:flex-row md:items-end justify-between gap-2 md:py-2 md:bg-[#FBFBFB] md:px-4  md:shadow-inner  rounded-lg  "
            onSubmit={handleGet(data => {
              if (getValues('type') === EnumMovement.SAVING) {
                savingDeferred({
                  variables: { date: data.date },
                  context,
                  fetchPolicy: 'network-only', // Used for first execution
                  nextFetchPolicy: 'network-only'
                })
              } else {
                installmentDeferred({
                  variables: {
                    startDate: data.startDate,
                    endDate: data.endDate
                  },
                  context
                })
              }
            })}
          >
            <SelectField
              name="type"
              label="Tipo"
              options={DeferredOptions}
              control={controlGet}
              setValue={setValue}
              required
              rules={FieldRequired}
              error={errorsGet.type}
              setDispatch={setDispatch}
            />

            {getValues('type') === EnumMovement.SAVING && (
              <InputCalendar
                name="date"
                label="Mes"
                control={controlGet}
                showMonthYearPicker
                required
                rules={FieldRequired}
                error={errorsGet.date}
              />
            )}
            {getValues('type') === EnumMovement.INTEREST && (
              <>
                <InputCalendar
                  name="startDate"
                  label="Fecha inicio"
                  control={controlGet}
                  required
                  rules={FieldRequired}
                  error={errorsGet.startDate}
                />

                <InputCalendar
                  name="endDate"
                  label="Fecha final "
                  control={controlGet}
                  rules={FieldRequired}
                  required
                  error={errorsGet.endDate}
                />
              </>
            )}
            <Button
              name="Buscar"
              type={'submit'}
              loading={installmentLoading || savingLoading}
              background="bg-[#10417B] text-white"
            />
          </form>

          <div className="gap-2 flex flex-col">
            {savingsData?.getSavingDeferred.length > 0 &&
              getValues('type') === EnumMovement.SAVING && (
                <TableSavingPayment
                  savings={savingsData.getSavingDeferred}
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                />
              )}

            {installmentsData?.getAllInstallmentsPaymentInterest.length > 0 &&
              getValues('type') === EnumMovement.INTEREST && (
                <>
                  <TableInstallmentPayment
                    installmentPayment={
                      installmentsData.getAllInstallmentsPaymentInterest
                    }
                    rowSelection={rowSelection}
                    setRowSelection={setRowSelection}
                  />
                </>
              )}
            <div className="flex flex-col md:pt-4 md:flex-row justify-end gap-2">
              <Button
                name="Cancelar"
                background="border border-[#10417B] text-[#10417B]"
                route="/dashboard/wallet/deferred"
              />
              {(installmentsData?.getAllInstallmentsPaymentInterest.length >
                0 ||
                savingsData?.getSavingDeferred.length > 0) && (
                <Button
                  name="Aceptar"
                  background="bg-[#10417B] text-white"
                  loading={loadingCreateDataCredit || loadingCreateDataSaving}
                  onClick={handleCreateMovement}
                />
              )}
            </div>
          </div>
          {showWarning && (
            <AlertModalError value="No hay filas seleccionadas" />
          )}
          {showWarningCreate &&
            createDataCredit?.createPaymentDeferredInterestInstallment && (
              <AlertModalSucces value="Se ha creado el diferido" />
            )}
          {showWarningCreate &&
            createDataSaving?.createDeferredSaving.state && (
              <AlertModalSucces
                value={createDataSaving.createDeferredSaving.message}
              />
            )}
        </div>
      </div>
    </>
  )
}
export default DeferredCreate
