'use client';
import { data } from '@/app/components/chart/Chart';
import BeneficiaryInformation from '@/app/components/forms/thirds/BeneficiaryInformation';
import CredentialsForm from '@/app/components/forms/thirds/Credentials';
import GeneralInformation from '@/app/components/forms/thirds/GeneralInformation';
import PersonalInformation from '@/app/components/forms/thirds/PersonalInformation';
import WorkingInformtaion from '@/app/components/forms/thirds/WorkingInformation';
import Button from '@/app/components/input/Button';
import CheckBoxThirds from '@/app/components/input/CheckBoxThirds';
import ListChange from '@/app/components/list-change/ListChange';
import AlertModalError from '@/app/components/modal/AlertModalError';
import AlertModalSucces from '@/app/components/modal/AlertModalSucces';
import { FormCredential } from '@/app/hooks/thirds/CredentialInput';
import { FormGeneralInformation } from '@/app/hooks/thirds/GeneralInput';
import { FormWorkingInformation } from '@/app/hooks/thirds/WorkingInput';
import { OptionsThirds } from '@/lib/utils/thirds/OptionsThirds';
import { Beneficiaries } from '@/lib/utils/thirds/types';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    )
  }
`;

function FormThirdNatural({
  countries,
  informationUser,
  informationAffilate,
  informationEmployee,
  isProvider,
}: {
  isProvider?: any;
  countries: any;
  informationUser?: any;
  informationAffilate?: any;
  provider?: any;
  informationEmployee?: any;
}) {
  const {
    generalInformation,
    handleGeneralInformation,
    handleChangeGeneralInformation,
    setGeneralInformation,
    handleGeneralNumber,
  } = FormGeneralInformation();
  const {
    workingInformation,
    handleChangeWorkingInformation,
    setWorkingInformation,
    handleWorkingNumber,
    handleWorkingInformation,
  } = FormWorkingInformation();
  const [beneficiaryInformation, setBeneficiaryInformation] = useState<
    Beneficiaries[]
  >([]);
  const { credential, setCredential, handleChangeCredential } =
    FormCredential();
  const [indexForm, setIndexForm] = useState<number>(1);
  const [checkedAffiliate, setCheckedAffiliate] = useState<boolean>(false);
  const [checkedEmployee, setCheckedEmployee] = useState<boolean>(false);
  const [checkedProvider, setCheckedProvider] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState(false);
  const [list, setList] = useState(OptionsThirds);
  const [
    createUser,
    { data: userData, loading: loadingUser, error: errorUser },
  ] = useMutation(CREATE_USER);

  const route = useRouter();
  useEffect(() => {
    if (informationUser) {
      setGeneralInformation({
        ...informationUser,
        expeditionDate: new Date(informationUser.expeditionDate),
        birthDate: new Date(informationUser.birthDate),
      });
    }
    if (informationAffilate) {
      setWorkingInformation({
        ...informationAffilate,
        incomeCompany: new Date(informationAffilate.incomeCompany),
      });
      setBeneficiaryInformation(informationAffilate.beneficiaries);
      setCheckedAffiliate(true);
    }

    if (informationEmployee) {
      setCheckedEmployee(true);
      setCredential(informationEmployee);
    }

    if (isProvider) {
      setCheckedProvider(true);
    }
  }, []);
  useEffect(() => {
    const updatedList = [...OptionsThirds];
    if (checkedEmployee) {
      updatedList[3].visible = true;
    } else {
      updatedList[3].visible = false;
    }

    if (checkedAffiliate) {
      updatedList[2].visible = true;
    } else {
      updatedList[2].visible = false;
    }
    setList(updatedList);
  }, [checkedAffiliate, checkedEmployee]);

  const handleCreate = async () => {
    setShowWarning(true);
    const data = {
      inputAffiliate: workingInformation,
      beneficiaries: beneficiaryInformation,
    };
    createUser({
      variables: {
        createUserInput: generalInformation,
        createAffiiate: checkedAffiliate ? data : null,
        createEmployee: checkedEmployee ? credential : null,
        createProvider: checkedProvider ? true : null,
      },
    });
  };

  useEffect(() => {
    if (data) {
      const timeout = setTimeout(() => {
        setShowWarning(false);
      }, 2000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [userData, errorUser]);

  console.log(userData?.createUser);

  if (userData?.createUser && !showWarning) {
    route.push('/dashboard/parametrization/thirds');
    route.refresh();
  }

  return (
    <div className="h-full flex-grow flex flex-col text-sm ">
      <div className="flex flex-row justify-between">
        <ListChange
          indexForm={indexForm}
          setIndexForm={setIndexForm}
          list={list.filter((option) => option.visible == true)}
          color="bg-[#006AE7]"
        />

        <div className="flex flex-row bg-white pt-3 px-2  rounded-tr-sm rounded-tr-sm rounded-tl-[100px] ">
          <CheckBoxThirds
            isChecked={checkedAffiliate}
            onChange={() => {
              setCheckedAffiliate(!checkedAffiliate);
            }}
            name="Afiliado"
          />
          <CheckBoxThirds
            isChecked={checkedEmployee}
            onChange={() => {
              setCheckedEmployee(!checkedEmployee);
            }}
            name="Empleado"
          />
          <CheckBoxThirds
            isChecked={checkedProvider}
            onChange={() => {
              setCheckedProvider(!checkedProvider);
            }}
            name="Proveedor"
          />
        </div>
      </div>
      <div className="  flex flex-col  bg-[#FFFFFF]  rounded-bl-lg rounded-br-lg rounded-tr-lg pt-10 px-3">
        {indexForm === 1 && (
          <GeneralInformation
            countries={countries}
            handleGeneralInformation={handleGeneralInformation}
            handleNumber={handleGeneralNumber}
            generalInformation={generalInformation}
            handleChangeGeneralInformation={handleChangeGeneralInformation}
          />
        )}
        {indexForm === 2 && (
          <PersonalInformation
            countries={countries}
            handleGeneralInformation={handleGeneralInformation}
            handleNumber={handleGeneralNumber}
            generalInformation={generalInformation}
            handleChangeGeneralInformation={handleChangeGeneralInformation}
          />
        )}

        {checkedAffiliate && indexForm === 3 && (
          <>
            <WorkingInformtaion
              handleWorkingInformation={handleWorkingInformation}
              workingInformation={workingInformation}
              handleNumber={handleWorkingNumber}
              handleChangeWorkingInformation={handleChangeWorkingInformation}
            />

            <BeneficiaryInformation
              beneficiaryInformation={beneficiaryInformation}
              setBeneficiaryInformation={setBeneficiaryInformation}
            />
          </>
        )}
        {checkedEmployee && indexForm === 4 && (
          <CredentialsForm
            handleChangeCredential={handleChangeCredential}
            credential={credential}
          />
        )}
        {(checkedAffiliate || checkedEmployee || checkedProvider) && (
          <div className="py-10 flex justify-end">
            <div className="pr-4">
              <Button
                name="Cancelar"
                background="border border-[#10417B] text-[#10417B]"
                onClick={() => {
                  route.push('/dashboard/parametrization/thirds');
                }}
              />
            </div>
            <Button
              name="Aceptar"
              background="bg-[#10417B] text-white"
              onClick={() => {
                handleCreate();
              }}
            />
          </div>
        )}
        {userData?.createUser && showWarning ? (
          <AlertModalSucces value="El tercero ha sido registrado" />
        ) : userData?.createUser === false && showWarning ? (
          <AlertModalError value="El tercero ya existe" />
        ) : (
          errorUser && showWarning && <AlertModalError value="Error" />
        )}
      </div>
    </div>
  );
}

export default FormThirdNatural;
