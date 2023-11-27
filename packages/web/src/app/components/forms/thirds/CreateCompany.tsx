'use client';
import { data } from '@/app/components/chart/Chart';
import { FormCompany } from '@/app/components/forms/thirds/CompanyForm';
import AlertModalError from '@/app/components/modal/AlertModalError';
import AlertModalSucces from '@/app/components/modal/AlertModalSucces';
import { useCompany } from '@/app/hooks/thirds/CompanyInput';
import { OptionsThirds } from '@/lib/utils/thirds/OptionsThirds';
import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import Modal from '../../modal/Modal';
import Button from '../../input/Button';
import { useRouter } from 'next/navigation';

const CREATE_COMPANY = gql`
  mutation ($create: CreateCompanyDto!) {
    createCompany(input: $create)
  }
`;

function CreateThirdCompany({ setCreate }: { setCreate: any }) {
  const [showWarning, setShowWarning] = useState(false);
  const [list, setList] = useState(OptionsThirds);
  const [
    createCompany,
    { data: companyData, loading: loadingCompany, error: errorCompany },
  ] = useMutation(CREATE_COMPANY);
  const {
    handleChangeCompanyNubmer,
    handleCompanyInformation,
    companyInformation,
    handleChangeCompanyInformation,
  } = useCompany();

  const handleCreate = async () => {
    setShowWarning(true);
    createCompany({
      variables: {
        create: companyInformation,
      },
    });
  };

  const route = useRouter();
  useEffect(() => {
    if (data) {
      const timeout = setTimeout(() => {
        setShowWarning(false);
      }, 2000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [companyData, errorCompany]);

  console.log(companyData?.createCompany);

  if (companyData?.createCompany && !showWarning) {
    route.refresh()
    setCreate(false)
  }

  return (
    <Modal
      size="min-w-[550px] w-[800px]"
      title="Crear persona juridica"
      onClick={() => {
        setCreate(false);
      }}
    >
      <FormCompany
        handleChangeCompanyInformation={handleChangeCompanyInformation}
        companyInformation={companyInformation}
        handleChangeCompanyNumber={handleChangeCompanyNubmer}
        handleCompanyInformation={handleCompanyInformation}
      />

      <div className="pt-10 flex justify-end">
        <div className="pr-4">
          <Button
            name="Cancelar"
            background="border border-[#10417B] text-[#10417B]"
          />
        </div>
        <Button
          name="Aceptar"
          background="bg-[#10417B] text-white"
          onClick={handleCreate}
        />
      </div>

      {companyData?.createCompany && showWarning ? (
        <AlertModalSucces value="El tercero ha sido registrado" />
      ) : companyData?.createCompany === false && showWarning ? (
        <AlertModalError value="El tercero ya existe" />
      ) : (
        errorCompany && showWarning && <AlertModalError value="Error" />
      )}
    </Modal>
  );
}

export default CreateThirdCompany;
