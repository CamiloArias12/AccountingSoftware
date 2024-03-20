'use client'
import FormNoteMovement from '@/app/components/forms/notes/FormNoteMovement'
import AlertModalError from '@/app/components/modal/AlertModalError'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import { Token } from '@/app/hooks/TokenContext'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const NOTES_MOVEMENT_UPDATE = gql`
  mutation UpdateNote($data: NoteMovementInput!, $idMovement: String!) {
    updateNote(data: $data, idMovement: $idMovement) {
      state
      message
    }
  }
`

function NoteUpdate({
  accounts,
  users,
  companys,
  noteMovement
}: {
  accounts?: any
  users: any
  companys: any
  noteMovement: any
}) {
  const {
    register: informationMovement,
    handleSubmit,
    setValue,
    getValues,
    unregister,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })

  const { context } = Token()
  const [
    updateNote,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate }
  ] = useMutation(NOTES_MOVEMENT_UPDATE)

  const [showWarning, setShowWarning] = useState(false)

  const [showWarningUpdate, setShowWarningUpdate] = useState(false)

  useEffect(() => {
    if (noteMovement) {
      setValue('date', new Date(noteMovement.movement.date))
      setValue('concept', noteMovement.movement.concept)
      setValue('type', noteMovement.type)
      const accounts = []
      const thirdValue = []
      noteMovement.account_movement.map((value: any) => {
        if (value.user) {
          thirdValue.push(1)
        } else {
          thirdValue.push(2)
        }
        const nameThird = value.user
          ? users.find((user: any) => user.identification === value.user)
          : companys.find(
              (company: any) => company.identification === value.company
            )
        accounts.push({
          account: value.account,
          user: value.user,
          company: value.company,
          value: value.value,
          nature: value.nature,
          nameThird: value.user
            ? `${nameThird?.name} ${nameThird?.lastName}`
            : nameThird?.name
        })
      })
      setValue('accounts', accounts)
    }
  }, [])

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
    if (dataUpdate || errorUpdate) {
      const timeout = setTimeout(() => {
        setShowWarningUpdate(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [showWarningUpdate, errorUpdate, dataUpdate])
  return (
    <>
      <div className=" max-h-full h-full w-full">
        <div className="flex justify-between ">
          <h1 className=" hidden md:block font-bold px-4 item-center  bg-white pt-2">
            Editar nota
          </h1>
        </div>

        <div className="bg-white flex flex-col  h-full w-full gap-4  px-2 md:px-4 md:py-10">
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
              for (const account of data.accounts) {
                accounts.push({
                  user: account.user,
                  company: account.company,
                  account: account.account,
                  nature: account.nature,
                  value: account.value
                })
              }
              updateNote({
                variables: {
                  idMovement: noteMovement.movement.id,
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
            getValues={getValues}
            thirdsType={noteMovement.account_movement.map((value: any) =>
              value.user ? 1 : 2
            )}
          />

          {showWarning && (
            <AlertModalError value="No hay filas seleccionadas" />
          )}
          {showWarningUpdate && dataUpdate?.updateNote.state && (
            <AlertModalSucces value="Se ha creado el combrobante de egreso" />
          )}
        </div>
      </div>
    </>
  )
}

export default NoteUpdate
