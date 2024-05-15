'use client'

import { gql, useMutation, useQuery, useSuspenseQuery } from '@apollo/client'
import Modal from '../../modal/Modal'
import SplashScreen from '../../splash/Splash'
import FormThirdNatural from './FormThirdNatural'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { get } from 'http'
import AlertModalSucces from '../../modal/AlertModalSucces'
import AlertModalError from '../../modal/AlertModalError'
import { Token } from '@/app/hooks/TokenContext'

const UPDATE_USER = gql`
  mutation (
    $identification: Float!
    $inputAffiliate: InputAffiliateCreate
    $inputUser: UserInput!
    $inputEmployee: InputEmployeeCreate
    $provider: Boolean
  ) {
    updateUser(
      identification: $identification
      createUserInput: $inputUser
      createAffiiate: $inputAffiliate
      createEmployee: $inputEmployee
      createProvider: $provider
    ) {
      state
      message
    }
  }
`

function UpdateThird({
  dataUser,
  countries,
  thirdIdentification
}: {
  dataUser: any
  countries: any
  thirdIdentification: number
}) {
  const { context } = Token()
  const [
    updateUser,
    { data: userData, loading: loadingUser, error: errorUser }
  ] = useMutation(UPDATE_USER)

  const [showWarning, setShowWarning] = useState(false)

  const route = useRouter()
  const [user, setUser] = useState()
  const [identification, setIdentification] = useState()
  const [employee, setEmployee] = useState()

  const handleUpdate = async (
    generalInformation: any,
    checkedAffiliate: boolean,
    affiliate: any,
    checkedEmployee: boolean,
    credential: any,
    checkedProvider: boolean
  ) => {
    console.log(credential)
    setShowWarning(true)
    setIdentification(generalInformation.identification)
    updateUser({
      variables: {
        identification: thirdIdentification,
        inputUser: generalInformation,
        inputAffiliate: checkedAffiliate ? affiliate : null,
        inputEmployee: checkedEmployee ? credential : null,
        provider: checkedProvider ? true : null
      },
      context
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
  useEffect(() => {
    if (userData?.updateUser.state && !showWarning) {
      route.refresh()
    }
  }, [userData])

  return (
    <>
      <FormThirdNatural
        countries={countries}
        informationUser={dataUser}
        loading={loadingUser}
        onClick={handleUpdate}
        update
        title={'Editar tercero'}
      />
      {userData?.updateUser.state && showWarning ? (
        <AlertModalSucces value={userData.updateUser.message} />
      ) : userData?.updateUser.state === false && showWarning ? (
        <AlertModalError value={userData.updateUser.message} />
      ) : (
        errorUser && showWarning && <AlertModalError value="Error" />
      )}
    </>
  )
}

export default UpdateThird
