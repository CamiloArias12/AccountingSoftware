'use client';
import { useEffect, useState } from 'react';
import InputField from '@/app/components/input/InputField';
import { gql, useMutation, useQuery } from '@apollo/client';
import Select from '../../input/Select';
import Button from '../../input/Button';
import { AddSvg } from '../../logo/Add';
import Modal from '../../modal/Modal';
import { useRouter } from 'next/navigation';
import AlertModalSucces from '../../modal/AlertModalSucces';
import AlertModalError from '../../modal/AlertModalError';
import { useTypeCredit } from '@/app/hooks/type-credit/TypeCreditInput';

const AUXLILIARIES = gql`
  query {
    getAuxilaryAll {
      type
      typeAccount {
        code
        name
        nature
        state
      }
    }
  }
`;
const CREATE_TYPE_CREDIT = gql`
  mutation ($data: CreateTypeCreditDto!) {
    createTypeCredit(data: $data)
  }
`;

export function TypeCreditForm({
  setShowModalCreate,
}: {
  setShowModalCreate: any;
}) {
  const { data, loading, error } = useQuery(AUXLILIARIES);
  const [accounts, setAccounts] = useState<number[]>([]);
  const [
    createTypeCredit,
    { data: dataCreate, loading: loadingCreate, error: errorCreate },
  ] = useMutation(CREATE_TYPE_CREDIT);
  const { typeCredit, handleNumber, handleTypeCredit } = useTypeCredit();
  const route = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  useEffect(() => {
    if (data) {
      const timeout = setTimeout(() => {
        setShowWarning(false);
      }, 3000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [dataCreate, errorCreate]);

  const handleCreateTypeCredit = () => {
    setShowWarning(true);
    const inputCreate = {
      name: typeCredit.name,
      interest: typeCredit.interest,
      auxiliary: accounts,
    };
    createTypeCredit({
      variables: {
        data: inputCreate,
      },
    });
  };

  const handleValueAccounts = (index: number, value: number) => {
    const array = [...accounts];
    array[index] = value;
    setAccounts(array);
  };
  const addAccount = () => {
    setAccounts([...accounts, 0]);
  };
  if (dataCreate?.createTypeCredit && !showWarning) {
    setShowModalCreate(false);
    route.push('/dashboard/parametrization/typecredit');
    route.refresh();
  }

  return (
    <Modal
      size="min-w-[550px] w-[600px]"
      title="Crear tipo de credito"
      onClick={() => {
        setShowModalCreate(false);
        route.push('/dashboard/parametrization/typecredit');
      }}
    >
      <div className="flex flex-col   w-full h-full">
        <div className="flex flex-col space-y-4 w-full max-w-3xl p-4">
          {/* InputFields */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <InputField
              name="name"
              label="Nombre"
              value={typeCredit.name}
              onChange={handleTypeCredit}
            />
            <InputField
              name="interest"
              label="Interes"
              value={typeCredit.interest}
              onChange={handleTypeCredit}
              onBlur={handleNumber}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-4">
              <label>Cuentas</label>
              <div
                className="flex flex-row items-center justify-between hover:bg-[#F5F2F2] hover:rounded-[20px] group p-1"
                onClick={addAccount}
              >
                <div className="flex group-hover:text-blue items-center justify-center rounded-[50%] h-6 w-6 bg-[#10417B] ">
                  <AddSvg color="#ffffff" />
                </div>
                <label className="pl-2 hidden group-hover:block text-[12px]">
                  Agregar
                </label>
              </div>
            </div>
            {accounts.map((value, index) => (
              <div key={index} className="flex  flex-row">
                <div className="flex-grow mb-2">
                  <Select
                    options={data.getAuxilaryAll}
                    index={index}
                    setValue={handleValueAccounts}
                  />
                </div>
                <button className="flex items-center justify-center h-8 w-8">
                  <img src="/delete.svg" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-10 flex justify-end">
          <div className="pr-4">
            <Button
              name="Cancelar"
              background="border border-[#10417B] text-[#10417B]"
            />
          </div>
          <div className="pr-4">
            <Button
              name="Aceptar"
              background="bg-[#10417B] text-white"
              onClick={handleCreateTypeCredit}
            />
          </div>
        </div>
        {dataCreate?.createTypeCredit && showWarning ? (
          <AlertModalSucces value={`la tipo de credit ha sido creado`} />
        ) : dataCreate?.createTypeCredit === false && showWarning ? (
          <AlertModalError value={`El codigo  ya existe con otra cuenta`} />
        ) : (
          errorCreate && showWarning && <AlertModalError value="Error" />
        )}
      </div>
    </Modal>
  );
}

export default TypeCreditForm;
