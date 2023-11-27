'use client';

import { gql, useQuery} from '@apollo/client';
import Modal from '../../modal/Modal';
import SplashScreen from '../../splash/Splash';
import GeneralInformationView from './GeneralInformationView';

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

function ViewThird({
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
  return (
    <Modal
      size="h-[90%] w-[90%]"
      title="Tercero"
      onClick={() => setShow(false)}
    >
      <>{loading && <SplashScreen />}</>
      {data && <GeneralInformationView generalInformation={data?.getUser} />}
    </Modal>
  );
}

export default ViewThird;
