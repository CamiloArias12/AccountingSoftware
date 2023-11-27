'use client';

import InputField from '@/app/components/input/InputField';
import SelectAffiliate from '@/app/components/input/SelectAffiliate';
import { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Button from '@/app/components/input/Button';
import { useRouter } from 'next/navigation';
import AlertModalSucces from '@/app/components/modal/AlertModalSucces';
import AlertModalError from '@/app/components/modal/AlertModalError';
import InputCalendar from '@/app/components/input/Calendar';
import Modal from '../../modal/Modal';
import { useSaving } from '@/app/hooks/saving/SavingInput';

const CREATE_SAVING = gql`
  mutation ($create: CreateSavingInput!) {
    createSaving(createSavingInput: $create)
  }
`;
const TYPE_SAVINGS_AFFILIATES = gql`
  query {
    getTypeSavingAll {
      id
      name
    }

    allAfiliates {
      user {
        identification
        name
        lastName
      }
    }
  }
`;
export const revalidate = 0;
function FormSaving({ setShowModalCreate }: { setShowModalCreate: any }) {
  const { saving, handleSaving, handleSavingSelect, handleSavingNumber } =
    useSaving();
  const [
    createSaving,
    { data: dataCreate, loading: loadingCreate, error: errorCreate },
  ] = useMutation(CREATE_SAVING);
  const [showWarning, setShowWarning] = useState(false);
  const route = useRouter();
  const {
    data: dataSavings,
    loading,
    error,
  } = useQuery(TYPE_SAVINGS_AFFILIATES);
  const [affiliates, setAffiliates] = useState([]);
  const [typeSavings, setTypeSavings] = useState([]);
  useEffect(() => {
    if (dataSavings) {
      setAffiliates(dataSavings.allAfiliates);
      setTypeSavings(dataSavings.getTypeSavingAll);
    }
  }, [dataSavings]);

  const handleCreateSaving = () => {
    setShowWarning(true);
    createSaving({
      variables: {
        create: {
          qoutaValue: saving.qoutaValue,
          startDate: saving.startDate,
          affiliateId: saving.identification,
          typeSavingId: saving.idTypeSaving,
        },
      },
    });
  };

  useEffect(() => {
    if (dataCreate) {
      const timeout = setTimeout(() => {
        setShowWarning(false);
      }, 2000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [dataCreate, errorCreate]);

  if (dataCreate?.createSaving && !showWarning) {
    route.push('/dashboard/wallet/saving');
    setShowModalCreate(false);
    route.refresh();
  }
  return (
    <Modal
      size="min-w-[650px] min-h-[500px] "
      title="Crear ahorro"
      onClick={() => {
        setShowModalCreate(false);
        route.push('/dashboard/wallet/saving');
      }}
    >
      <>
        <div className=" flex-grow flex flex-col bg-white h-full m-2 ">
          <label className="text-center text-white  bg-[#10417B] text-input font-bold mb-2">
            {' '}
            Información afiliado
          </label>
          <SelectAffiliate
            label="Identificacion"
            name="identification"
            value={saving.identification}
            options={affiliates}
            setValue={handleSavingSelect}
          />
          <InputField
            label="Nombres"
            value={saving.nameAffiliate}
            onlyRead={true}
          />

          <label className="text-center text-white  bg-[#10417B] text-input font-bold my-2">
            {' '}
            Información ahorro
          </label>
          <SelectAffiliate
            label="Tipo de ahorro"
            name="typeSaving"
            value={saving.typeSaving}
            options={typeSavings}
            setValue={handleSavingSelect}
          />
          <InputCalendar
            name="startDate"
            label="Fecha de inicio"
            value={saving.startDate}
            onChange={handleSavingSelect}
          />
          <InputField
            label="Valor couta"
            value={saving.qoutaValue}
            name="qoutaValue"
            onBlur={handleSavingNumber}
            onChange={handleSaving}
          />
        </div>
        <div className="mt-8 flex justify-end  ">
          <Button
            name="Aceptar"
            background="bg-[#10417B] text-white"
            onClick={handleCreateSaving}
          />
        </div>
        {dataCreate?.createSaving && showWarning ? (
          <AlertModalSucces value="El ahorro ha sido registrado" />
        ) : dataCreate?.createSaving === false && showWarning ? (
          <AlertModalError value="El ya existe" />
        ) : (
          errorCreate && showWarning && <AlertModalError value="Error" />
        )}
      </>
    </Modal>
  );
}

export default FormSaving;
