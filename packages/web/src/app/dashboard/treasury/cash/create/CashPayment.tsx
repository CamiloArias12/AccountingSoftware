'use client'
import FormMovement from '@/app/components/forms/credit/movement/FormMovement'
import TableInstallmentPayment from '@/app/components/forms/credit/movement/TableInstallmentPayment'
import TableNotePayment from '@/app/components/forms/credit/movement/TableNotesPayment'
import TableSavingPayment from '@/app/components/forms/credit/movement/TableSavingPayment'
import Button from '@/app/components/input/Button'
import InputCalendar from '@/app/components/input/Calendar'
import SelectField from '@/app/components/input/SelectField'
import AlertModalError from '@/app/components/modal/AlertModalError'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import { Token } from '@/app/hooks/TokenContext'
import { FieldRequired } from '@/lib/utils/FieldValidation'
import { CashOptions, EnumMovement } from '@/lib/utils/movement/types'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const CASH_CREDIT_GET = gql`
  mutation ($startDate: Date!, $endDate: Date!) {
    getAllInstallments(startDate: $startDate, endDate: $endDate) {
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
      idTypeCredit
    }
  }
`

const CASH_NOTE_GET = gql`
  query ($startDate: Date!, $endDate: Date!) {
    getNotesPayment(
      startDate: $startDate
      endDate: $endDate
      type: "RECIBO DE CAJA"
    ) {
      concept
      date
      id
      noteId
    }
  }
`

const CASH_SAVING_GET = gql`
  mutation ($date: Date!) {
    getSavingCash(date: $date) {
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
const CASH_SAVING_CREATE = gql`
  mutation ($data: SavingPayment!) {
    createPaymentSaving(data: $data)
  }
`
const INSTALLMENT_CREDIT_CASH_CREATE = gql`
  mutation ($data: PaymentInstallmentInput!) {
    createPaymentInstallment(data: $data)
  }
`

const NOTE_CASH_CREATE = gql`
  mutation CreateNoteCash($data: NotePayment!) {
    createNoteCash(data: $data)
  }
`

function CashCreate({
  accounts,
  users,
  companys
}: {
  accounts?: any
  users: any
  companys: any
}) {
  const {
    register: informationMovement,
    handleSubmit,
    setValue,
    getValues: valuesCreate,
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
  //query
  const [notes, { data: noteData, loading: noteLoading, error: noteError }] =
    useLazyQuery(CASH_NOTE_GET)

  const [
    installmentCash,
    {
      data: installmentsData,
      loading: installmentLoading,
      error: installmentError
    }
  ] = useMutation(CASH_CREDIT_GET)
  const [
    savingCash,
    { data: savingsData, loading: savingLoading, error: savingError }
  ] = useMutation(CASH_SAVING_GET)

  //mutation
  const [
    createInstallmentCash,
    { data: dataCashCredit, loading: loadingCashCredit, error: errorCashCredit }
  ] = useMutation(INSTALLMENT_CREDIT_CASH_CREATE)
  const [
    savingCreateCash,
    { data: dataCashSaving, loading: loadingCashSaving, error: errorCashSaving }
  ] = useMutation(CASH_SAVING_CREATE)

  const [
    noteCreateCash,
    { data: dataCashNote, loading: loadingCashNote, error: errorNote }
  ] = useMutation(NOTE_CASH_CREATE)

  const handleCreateMovement = () => {
    console.log(Object.keys(rowSelection).length, rowSelection)
    if (Object.keys(rowSelection).length > 0) {
      setShowForm(true)
    } else {
      setShowWarning(true)
    }
  }

  const handleCreateInstallmentCash = data => {
    setShowWarningCreate(true)
    if (getValues('type') === EnumMovement.CREDIT) {
      const installments = []
      for (const key in rowSelection) {
        if (rowSelection.hasOwnProperty(key)) {
          installments.push(installmentsData.getAllInstallments[Number(key)])
        }
      }
      const installmentSend = []

      for (let i = 0; i < installments.length; i++) {
        if (
          !installmentSend.find(data => data.credit === installments[i].credit)
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

      createInstallmentCash({
        variables: {
          data: {
            installments: installmentSend,
            idAccount: data.account,
            user: data.user === '' ? null : data.user,
            company: data.company === '' ? null : data.company,
            concept: data.concept,
            date: data.date,
            nature: data.nature
          }
        },
        context
      })
    } else if (getValues('type') === EnumMovement.SAVING) {
      const savings = []
      for (const key in rowSelection) {
        if (rowSelection.hasOwnProperty(key)) {
          savings.push(savingsData.getSavingCash[Number(key)].id)
        }
      }

      savingCreateCash({
        variables: {
          data: {
            savings: savings,
            idAccount: data.account,
            user: data.user === '' ? null : data.user,
            company: data.company === '' ? null : data.company,
            concept: data.concept,
            dateMovement: data.date,
            datePayment: getValues().date,
            nature: data.nature
          }
        },
        context
      })
    } else if (getValues('type') === EnumMovement.OTHER) {
      const notes = []
      for (const key in rowSelection) {
        if (rowSelection.hasOwnProperty(key)) {
          notes.push(noteData.getNotesPayment[Number(key)].noteId)
        }
      }

      noteCreateCash({
        variables: {
          data: {
            notes: notes,
            idAccount: data.account,
            user: data.user === '' ? null : data.user,
            company: data.company === '' ? null : data.company,
            concept: data.concept,
            dateMovement: data.date,
            nature: data.nature
          }
        },
        context
      })
    }
  }

  const [rowSelection, setRowSelection] = useState({})
  const [showWarning, setShowWarning] = useState(false)
  const [showWarningCreate, setShowWarningCreate] = useState(false)
  const [dispatch, setDispatch] = useState(false)
  const route = useRouter()
  const [showForm, setShowForm] = useState(false)
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
    if (
      dataCashCredit ||
      errorCashCredit ||
      dataCashNote ||
      dataCashSaving ||
      errorCashSaving
    ) {
      const timeout = setTimeout(() => {
        setShowWarningCreate(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [
    showWarningCreate,
    dataCashCredit,
    dataCashSaving,
    dataCashNote,
    errorCashSaving,
    errorNote,
    errorCashCredit
  ])
  useEffect(() => {
    setRowSelection({})
  }, [dispatch])

  if (
    (dataCashCredit?.createPaymentInstallment ||
      dataCashSaving?.createPaymentSaving ||
      dataCashNote?.createNoteCash) &&
    !showWarningCreate
  ) {
    route.push('/dashboard/treasury/cash')
    route.refresh()
  }
  return (
    <>
      {showForm && (
        <FormMovement
          key={1}
          account
          thirdShow
          accounts={accounts}
          users={users}
          companys={companys}
          control={control}
          setValue={setValue}
          unregister={unregister}
          informationMovement={informationMovement}
          errors={errors}
          onAccept={handleCreateInstallmentCash}
          handleSubmit={handleSubmit}
          loading={loadingCashCredit}
          setShowModal={setShowForm}
        />
      )}

      <div className=" max-h-full h-full w-full overflow-scroll">
        <div className="flex justify-between ">
          <h1 className=" hidden md:block font-bold px-4 item-center  bg-white pt-2">
            Crear recibo de caja
          </h1>
        </div>

        <div className="bg-white flex flex-col overflow-scroll  h-full w-full gap-4 px-2 md:px-4 md:py-10">
          <form
            className="flex  flex-col md:flex-row md:items-end justify-between gap-2 md:py-2 md:bg-[#FBFBFB] md:px-4  md:shadow-inner  rounded-lg  "
            onSubmit={handleGet(data => {
              if (getValues('type') === EnumMovement.SAVING) {
                savingCash({
                  variables: { date: data.date },
                  context
                })
              } else if (getValues('type') === EnumMovement.CREDIT) {
                installmentCash({
                  variables: {
                    startDate: data.startDate,
                    endDate: data.endDate
                  },
                  context
                })
              } else {
                notes({
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
              options={CashOptions}
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
            {getValues('type') !== EnumMovement.SAVING && (
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
            {installmentsData?.getAllInstallments.length > 0 &&
              getValues('type') === EnumMovement.CREDIT && (
                <TableInstallmentPayment
                  installmentPayment={installmentsData.getAllInstallments}
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                />
              )}
            {savingsData?.getSavingCash.length > 0 &&
              getValues('type') === EnumMovement.SAVING && (
                <TableSavingPayment
                  savings={savingsData.getSavingCash}
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                />
              )}

            {noteData?.getNotesPayment.length > 0 &&
              getValues('type') === EnumMovement.OTHER && (
                <TableNotePayment
                  notes={noteData.getNotesPayment}
                  rowSelection={rowSelection}
                  setRowSelection={setRowSelection}
                />
              )}

            <div className="flex flex-col md:pt-4 md:flex-row justify-end gap-2">
              <Button
                name="Cancelar"
                background="border border-[#10417B] text-[#10417B]"
                route="/dashboard/treasury/cash"
              />

              {(installmentsData?.getAllInstallments.length > 0 ||
                noteData?.getNotesPayment.length > 0 ||
                savingsData?.getSavingCash.length > 0) && (
                <Button
                  name="Aceptar"
                  background="bg-[#10417B] text-white"
                  onClick={handleCreateMovement}
                />
              )}
            </div>
          </div>
          {showWarning && (
            <AlertModalError value="No hay filas seleccionadas" />
          )}
          {showWarningCreate &&
            (dataCashCredit?.createPaymentInstallment ||
              dataCashSaving?.createPaymentSaving ||
              dataCashNote?.createNoteCash) && (
              <AlertModalSucces value="Se ha creado el recibo de caja" />
            )}
        </div>
      </div>
    </>
  )
}

export default CashCreate
