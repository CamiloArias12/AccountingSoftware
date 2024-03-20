'use client'

import { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import AlertModalError from '@/app/components/modal/AlertModalError'
import Modal from '../../modal/Modal'
import FormRole from './FormRoles'
import { Token } from '@/app/hooks/TokenContext'

const CREATE_SAVING = gql`
  mutation CreateRole($data: CreateRoleInput!) {
    createRole(createRoleInput: $data)
  }
`
export const revalidate = 0
function CreateRole({ setShowModalCreate }: { setShowModalCreate: any }) {
  const [
    createRole,
    { data: dataCreate, loading: loadingCreate, error: errorCreate }
  ] = useMutation(CREATE_SAVING)
  const [showWarning, setShowWarning] = useState(false)
  const route = useRouter()

  const { context } = Token()
  const handleCreateRole = role => {
    setShowWarning(true)
    createRole({
      variables: {
        data: {
          ...role
        }
      },
      context
    })
  }

  useEffect(() => {
    if (dataCreate) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dataCreate, errorCreate])

  if (dataCreate?.createRole && !showWarning) {
    setShowModalCreate(false)
    route.refresh()
  }
  return (
    <Modal
      size="lg:w-[650px] lg:h-auto bg-white overflow-scroll "
      title="Crear rol"
      onClick={() => {
        setShowModalCreate(false)
      }}
    >
      <>
        <FormRole
          onCancel={() => setShowModalCreate(false)}
          onClick={handleCreateRole}
        />
        {dataCreate?.createRole && showWarning ? (
          <AlertModalSucces value="El rol ha sido creado" />
        ) : dataCreate?.createRole === false && showWarning ? (
          <AlertModalError value="No se ha podido actualizar" />
        ) : (
          errorCreate && showWarning && <AlertModalError value="Error" />
        )}
      </>
    </Modal>
  )
}

export default CreateRole
