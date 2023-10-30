'use client';

import { gql, useQuery, useSuspenseQuery } from '@apollo/client';
import { Suspense, useState } from 'react';
import Modal from '../../modal/Modal';
import SplashScreen from '../../splash/Splash';
import FormThirdNatural from '@/app/dashboard/parametrization/thirds/create/CreateThird';

const GET_USER = gql`
  query ($id: Int!) {
    getUser(id: $id) {
      typeIdentification
      identification
      name
      lastName
      expeditionDate
      expeditionCity
      birthDate
      countryBirth
      stateBirth
      cityBirth
      gender
      statusCivil
      addressResidence
      countryResidence
      stateResidence
      cityResidence
      phone
      landLine
      email
      housingType
      studies
      profession
      foreignOperations
      publicResources
      publicRecognition
      publicPower
      status
      affiliate {
        company
        addreesCompany
        emailJob
        salary
        bank
        jobTitle
        phone
        incomeCompany
        typeAccount
        numberAccount
        beneficiaries {
          percentage
          beneficiary {
            idDocument
            name
          }
        }
      }
      employee {
        username
        password
      }
      provider {
        idProvider
      }
    }

    getCountry {
      id
      name
      iso2
    }
  }
`;

function UpdateThird({
  thirdIdentification,
  setShow,
}: {
  thirdIdentification: number;
  setShow: any;
}) {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: thirdIdentification },
  });

  if (error) {
    return (
      <Modal
        size="h-[100px] w-[300px]"
        title="Error"
        onClick={() => setShow(false)}
      ></Modal>
    );
  }
  console.log(data?.getUser?.affiliate?.beneficiaries);
  return (
    <Modal
      size="min-h-[700px] w-[90%]"
      title="Actualizar tercero"
      onClick={() => setShow(false)}
    >
      <>
        {loading && <SplashScreen />}
        {data && (
          <FormThirdNatural
            countries={data.getCountry}
            informationUser={data?.getUser}
            informationAffilate={data?.getUser?.affiliate}
            informationEmployee={data?.getUser?.employee}
            isProvider={data?.getUser?.provider}
          />
        )}
      </>
    </Modal>
  );
}

export default UpdateThird;
