'use client'

import { useEffect, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import AlertModalError from '@/app/components/modal/AlertModalError'
import Modal from '../../modal/Modal'
import FormRole from './FormRoles'
import { Token } from '@/app/hooks/TokenContext'

const GET_ROLE = gql`
  query ($id: Int!) {
    role(id: $id) {
      id
      name
      third
      credit
      saving
      type_account
      type_saving
      type_credit
      movement
      deferred
      cash
      roles
      disbursementvoucher
      note
      book_auxiliary
    }
  }
`

const CREATE_SAVING = gql`
  mutation UpdateRole($data: UpdateRoleInput!) {
    updateRole(updateRoleInput: $data)
  }
`
export const revalidate = 0
function UpdateRole({
  setShowModalUpdate,
  id
}: {
  setShowModalUpdate: any
  id: any
}) {
  const { context } = Token()
  const {
    data: dataRole,
    loading,
    error,
    refetch
  } = useQuery(GET_ROLE, { variables: { id: id }, context })

  const [
    updateRole,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate }
  ] = useMutation(CREATE_SAVING)
  const [showWarning, setShowWarning] = useState(false)
  const route = useRouter()

  const handleUpdateRole = role => {
    setShowWarning(true)
    updateRole({
      variables: {
        data: {
          ...role
        }
      },
      context
    })
  }

  useEffect(() => {
    if (dataUpdate) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [dataUpdate, errorUpdate])

  if (dataUpdate?.updateRole && !showWarning) {
    setShowModalUpdate(false)
    route.refresh()
    refetch()
  }
  return (
    <Modal
      size="lg:w-[650px] lg:h-auto bg-white overflow-scroll "
      title="Editar rol"
      onClick={() => {
        setShowModalUpdate(false)
      }}
    >
      <>
        {dataRole && (
          <FormRole
            onCancel={() => setShowModalUpdate(false)}
            onClick={handleUpdateRole}
            data={dataRole.role}
          />
        )}
        {dataUpdate?.updateRole && showWarning ? (
          <AlertModalSucces value="El rol ha sido actualizado" />
        ) : dataUpdate?.updateRole === false && showWarning ? (
          <AlertModalError value="No se ha podido actualizar" />
        ) : (
          errorUpdate && showWarning && <AlertModalError value="Error" />
        )}
      </>
    </Modal>
  )
}

export default UpdateRole
