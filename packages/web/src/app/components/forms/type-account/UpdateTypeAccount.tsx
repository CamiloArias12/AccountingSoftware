import { useRouter } from 'next/navigation'
import Modal from '../../modal/Modal'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useTypeAccount } from '@/app/hooks/type-account/TypeAccountInput'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import SplashScreen from '../../splash/Splash'
import TypeAccountForm from './TypeAccountInformation'
import ModalSkeleton from '../../skeletons/ModalSkeleton'
import TypeAccountSkeleton from '../../skeletons/TypeAccount'
import { useForm } from 'react-hook-form'
const UPDATE_ACCOUNT = gql`
  mutation ($updateTypeAccount: TypeAccountInput!, $code: Float!) {
    updateAccount(updateTypeAccount: $updateTypeAccount, code: $code)
  }
`

const GET_ACCOUNT = gql`
  query ($code: Float!) {
    getAccountById(code: $code) {
      code
      name
      nature
    }
  }
`

function UpdateTypeAccount({
  typeAccountSelected,
  setUpdate
}: {
  typeAccountSelected: number
  setUpdate: any
}) {
  const route = useRouter()

  const [showWarningUpdate, setShowWarningUpdate] = useState(false)
  const [
    updateAccount,
    { data: updateData, loading: loadingUpdate, error: errorUpdate }
  ] = useMutation(UPDATE_ACCOUNT)

  const { data, error, loading, refetch } = useQuery(GET_ACCOUNT, {
    variables: { code: typeAccountSelected }
  })
  const {
    register: informationAccount,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm({
    mode: 'all'
  })

  useEffect(() => {
    if (data) {
      setValue('code', data.getAccountById.code)
      setValue('name', data.getAccountById.name)
      setValue('nature', data.getAccountById.nature)
    }
  }, [data])
  useEffect(() => {
    if (updateData) {
      console.log('update')
      const timeout = setTimeout(() => {
        setShowWarningUpdate(false)
      }, 3000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [updateData, errorUpdate])

  const updateAccountHandle = () => {
    setShowWarningUpdate(true)
    updateAccount({
      variables: {
        updateTypeAccount: {
          code: getValues('code'),
          name: getValues('name'),
          nature: getValues('nature')
        },
        code: typeAccountSelected
      }
    }).then(() => {
      refetch()
    })
  }

  if (updateData?.updateAccount && !showWarningUpdate) {
    setUpdate(false)
    route.refresh()
  }

  return (
    <>
      <Modal
        size="min-w-[550px] w-[600px] bg-white"
        title="Actualizar cuenta"
        onClick={() => {
          setUpdate(false)
          route.push('/dashboard/parametrization/typeaccount')
        }}
      >
        {loading ? (
          <TypeAccountSkeleton />
        ) : (
          data && (
            <form
              onSubmit={handleSubmit(updateAccountHandle)}
              className="flex-grow"
            >
              <TypeAccountForm
                informationAccount={informationAccount}
                errors={errors}
                control={control}
                setValue={setValue}
                handleClicckCancel={() => {}}
              />
            </form>
          )
        )}
      </Modal>
      {updateData?.updateAccount === true && showWarningUpdate ? (
        <AlertModalSucces value="Se han actualizado los datos" />
      ) : updateData?.updateAccount === false && showWarningUpdate ? (
        <AlertModalError value="Los datos no se pueden actualizar" />
      ) : (
        errorUpdate && showWarningUpdate && <AlertModalError value="Error" />
      )}
    </>
  )
}

export default UpdateTypeAccount
