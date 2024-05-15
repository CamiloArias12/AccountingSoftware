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
import { Token } from '@/app/hooks/TokenContext'
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

  const { context } = Token()
  const [showWarningUpdate, setShowWarningUpdate] = useState(false)
  const [
    updateAccount,
    { data: updateData, loading: loadingUpdate, error: errorUpdate }
  ] = useMutation(UPDATE_ACCOUNT)

  const { data, error, loading, refetch } = useQuery(GET_ACCOUNT, {
    variables: { code: typeAccountSelected },
    context
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
      },
      context
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
        size="  md:h-auto bg-white md:min-w-[550px]  md:w-[600px]"
        title="Editar cuenta"
        onClick={() => {
          setUpdate(false)
          route.push('/dashboard/parametrization/typeaccount')
        }}
      >
        {data && (
          <form
            onSubmit={handleSubmit(updateAccountHandle)}
            className="flex flex-col mt-4 py-2"
          >
            <TypeAccountForm
              informationAccount={informationAccount}
              errors={errors}
              control={control}
              setValue={setValue}
              handleClicckCancel={() => {}}
            />
          </form>
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
