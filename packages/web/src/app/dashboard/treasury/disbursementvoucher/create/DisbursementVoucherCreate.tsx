'use client'
import FormMovement from '@/app/components/forms/credit/movement/FormMovement'
import TableCreditPayment from '@/app/components/forms/credit/movement/TableCreditPayment'
import TableNotePayment from '@/app/components/forms/credit/movement/TableNotesPayment'
import Button from '@/app/components/input/Button'
import InputCalendar from '@/app/components/input/Calendar'
import SelectField from '@/app/components/input/SelectField'
import AlertModalError from '@/app/components/modal/AlertModalError'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import { Token } from '@/app/hooks/TokenContext'
import { FieldRequired } from '@/lib/utils/FieldValidation'
import { DisbursementOptions, EnumMovement } from '@/lib/utils/movement/types'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
const DISBURSEMENT_CREDIT_GET = gql`
  mutation ($date: Date!) {
    findCreditByDatePayment(date: $date) {
      id
      identification
      name
      lastName
      creditValue
      nameCredit
      state
      discountDate
      startDate
      interest
    }
  }
`

const DISBURSEMENT_CREDIT_CREATE = gql`
  mutation ($data: CreditDisbursementInput!) {
    createDisbursementPayment(data: $data)
  }
`
const DISBURSEMENT_NOTE_GET = gql`
  query ($startDate: Date!, $endDate: Date!) {
    getNotesPayment(
      startDate: $startDate
      endDate: $endDate
      type: "COMPROBANTE DE EGRESO"
    ) {
      concept
      date
      id
      noteId
    }
  }
`

const NOTE_DISBURSEMENT_CREATE = gql`
  mutation ($data: NotePayment!) {
    createNoteDisbursement(data: $data)
  }
`

function DisbursementVoucherCreate({ accounts }: { accounts?: any }) {
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
  const [rowSelection, setRowSelection] = useState({})
  const { context } = Token()
  const [
    creditDisbursement,
    { data: creditData, loading: creditLoading, error: creditError }
  ] = useMutation(DISBURSEMENT_CREDIT_GET)
  const [
    creditDisbursementPayment,
    {
      data: disbursementPayment,
      loading: disbrsementPaymentLoading,
      error: disbrsementPaymentError
    }
  ] = useMutation(DISBURSEMENT_CREDIT_CREATE)
  const [notes, { data: noteData, loading: noteLoading, error: noteError }] =
    useLazyQuery(DISBURSEMENT_NOTE_GET)
  const [
    noteCreateDisburment,
    { data: dataCashNote, loading: loadingCashNote, error: errorNote }
  ] = useMutation(NOTE_DISBURSEMENT_CREATE)

  const [showWarning, setShowWarning] = useState(false)
  const [showWarningCreate, setShowWarningCreate] = useState(false)
  const route = useRouter()
  const [dispatch, setDispatch] = useState(false)
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
    if (creditData || creditError || noteData || noteError) {
      const timeout = setTimeout(() => {
        setShowWarningCreate(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [showWarningCreate, creditData, creditError, noteData, noteError])

  const handleCreateMovement = () => {
    console.log(Object.keys(rowSelection).length, rowSelection)
    if (Object.keys(rowSelection).length > 0) {
      setShowForm(true)
    } else {
      setShowWarning(true)
    }
  }

  const handleCreateDisbursementPayment = data => {
    setShowWarningCreate(true)
    if (getValues('type') === EnumMovement.CREDIT) {
      const credits = []
      for (const key in rowSelection) {
        if (rowSelection.hasOwnProperty(key)) {
          credits.push(creditData.findCreditByDatePayment[Number(key)].id)
        }
      }
      creditDisbursementPayment({
        variables: {
          data: {
            credits: credits,
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
    } else if (getValues('type') === EnumMovement.OTHER) {
      const notes = []
      for (const key in rowSelection) {
        if (rowSelection.hasOwnProperty(key)) {
          notes.push(noteData.getNotesPayment[Number(key)].noteId)
        }
      }

      noteCreateDisburment({
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
  if (
    (disbursementPayment?.createDisbursementPayment ||
      dataCashNote?.createNoteDisbursement) &&
    !showWarningCreate
  ) {
    route.push('/dashboard/treasury/disbursementvoucher')
    route.refresh()
  }

  return (
    <>
      {showForm && (
        <FormMovement
          key={1}
          account
          accounts={accounts}
          control={control}
          setValue={setValue}
          unregister={unregister}
          informationMovement={informationMovement}
          errors={errors}
          onAccept={handleCreateDisbursementPayment}
          handleSubmit={handleSubmit}
          loading={disbrsementPaymentLoading}
          setShowModal={setShowForm}
        />
      )}
      <div className=" max-h-full h-full w-full overflow-scroll">
        <div className="flex justify-between ">
          <h1 className=" hidden md:block font-bold px-4 item-center  bg-white pt-2">
            Crear comprobante
          </h1>
        </div>
        <div className="bg-white flex flex-col  h-full w-full gap-4 px-2 md:px-4 md:py-10">
          <form
            className="flex  flex-col md:flex-row md:items-end justify-between gap-2 md:py-2 md:bg-[#FBFBFB] md:px-4  md:shadow-inner  rounded-lg  "
            onSubmit={handleGet(data => {
              if (getValues('type') === EnumMovement.CREDIT) {
                creditDisbursement({
                  variables: { date: data.date },
                  context
                })
              } else if (getValues('type') === EnumMovement.OTHER) {
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
              options={DisbursementOptions}
              control={controlGet}
              setValue={setValue}
              required
              rules={FieldRequired}
              error={errorsGet.type}
              setDispatch={setDispatch}
            />

            {getValues('type') === EnumMovement.CREDIT && (
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
            {getValues('type') === EnumMovement.OTHER && (
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
              background="bg-[#10417B] h-[30px] text-white"
            />
          </form>
          <div className="flex flex-col gap-2">
            {creditData?.findCreditByDatePayment.length > 0 &&
              getValues('type') === EnumMovement.CREDIT && (
                <TableCreditPayment
                  credits={creditData.findCreditByDatePayment}
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
                />

              {(creditData?.findCreditByDatePayment.length > 0 ||
                noteData?.getNotesPayment.length > 0) && (
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
            (disbursementPayment?.createDisbursementPayment ||
              dataCashNote?.createNoteDisbursement) && (
              <AlertModalSucces value="Se ha creado el comprobante de egreso" />
            )}
        </div>
      </div>
    </>
  )
}

export default DisbursementVoucherCreate
