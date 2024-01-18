'use client'
import FormThirdNatural from '@/app/components/forms/thirds/FormThirdNatural'
import AlertModalError from '@/app/components/modal/AlertModalError'
import AlertModalSucces from '@/app/components/modal/AlertModalSucces'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const CREATE_USER = gql`
  mutation (
    $createAffiiate: InputAffiliateCreate
    $createUserInput: UserInput!
    $createEmployee: InputEmployeeCreate
    $createProvider: Boolean
  ) {
    createUser(
      createUserInput: $createUserInput
      createAffiiate: $createAffiiate
      createEmployee: $createEmployee
      createProvider: $createProvider
    ) {
      state
      message
    }
  }
`

function CreateThirdNatural({ countries }: { countries: any }) {
  const [
    createUser,
    { data: userData, loading: loadingUser, error: errorUser }
  ] = useMutation(CREATE_USER)

  const route = useRouter()

  const [showWarning, setShowWarning] = useState(false)

  const handleCreate = async (
    generalInformation: any,
    checkedAffiliate: boolean,
    affiliate: any,
    checkedEmployee: boolean,
    credential: any,
    checkedProvider: boolean
  ) => {
    setShowWarning(true)
    createUser({
      variables: {
        createUserInput: generalInformation,
        createAffiiate: checkedAffiliate ? affiliate : null,
        createEmployee: checkedEmployee ? credential : null,
        createProvider: checkedProvider ? true : null
      }
    })
  }

  useEffect(() => {
    if (userData) {
      const timeout = setTimeout(() => {
        setShowWarning(false)
      }, 2000) // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [userData, errorUser])

  if (userData?.createUser && !showWarning) {
    route.push('/dashboard/parametrization/thirds')
    route.refresh()
  }

  return (
    <>
      <FormThirdNatural
        countries={countries}
        title={'Crear tercero'}
        onClick={handleCreate}
        loading={loadingUser}
      />
      {userData?.createUser.state && showWarning ? (
        <AlertModalSucces value={userData.createUser.message} />
      ) : userData?.createUser.state === false && showWarning ? (
        <AlertModalError value={userData.createUser.message} />
      ) : (
        errorUser && showWarning && <AlertModalError value="Error" />
      )}
    </>
  )
}

export default CreateThirdNatural
