'use client'
import FormNoteMovement from '@/app/components/forms/notes/FormNoteMovement'
import AlertModalError from '@/app/components/modal/AlertModalError'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import { Token } from '@/app/hooks/TokenContext'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const NOTES_MOVEMENT_CREATE = gql`
  mutation CreateNote($data: NoteMovementInput!) {
    createNote(data: $data) {
      state
      message
    }
  }
`

function NoteCreate({
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
    unregister,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })

  const [
    createNote,
    { data: dataCreate, loading: loadingCreate, error: errorCreate }
  ] = useMutation(NOTES_MOVEMENT_CREATE)

  const { context } = Token()
  const route = useRouter()
  const [showWarning, setShowWarning] = useState(false)
  const [showWarningCreate, setShowWarningCreate] = useState(false)

  useEffect(() => {
    if (showWarning) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 2000)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [showWarning])
  useEffect(() => {
    if (dataCreate || errorCreate) {
      const timeout = setTimeout(() => {
        setShowWarningCreate(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [showWarningCreate, errorCreate, dataCreate])

  if (dataCreate?.createNote && !showWarningCreate) {
    route.push('/dashboard/accounting/notes')
    route.refresh()
  }

  return (
    <div className=" max-h-full h-full w-full">
      <div className="flex justify-between ">
        <h1 className="hidden md:block font-bold px-4 item-center  bg-white pt-2">
          Crear nota
        </h1>
      </div>

      <div className="bg-white flex flex-col overflow-scroll  h-full w-full gap-4 px-2 md:px-4 md:py-10">
        <FormNoteMovement
          accounts={accounts}
          setValue={setValue}
          users={users}
          errors={errors}
          control={control}
          loading
          companys={companys}
          onAccept={data => {
            const accounts = []
            setShowWarningCreate(true)
            for (const account of data.accounts) {
              accounts.push({
                user: account.user,
                company: account.company,
                account: account.account,
                nature: account.nature,
                value: account.value
              })
            }
            createNote({
              variables: {
                data: {
                  accounts: accounts,
                  concept: data.concept,
                  date: data.date,
                  type: data.type
                }
              },
              context
            })
          }}
          unregister={unregister}
          handleSubmit={handleSubmit}
          informationMovement={informationMovement}
        />

        <div className="flex flex-col gap-2"></div>
        {showWarning && <AlertModalError value="No hay filas seleccionadas" />}
        {showWarningCreate && dataCreate?.createNote.state && (
          <AlertModalSucces value={dataCreate.createNote.message} />
        )}
      </div>
    </div>
  )
}

export default NoteCreate
