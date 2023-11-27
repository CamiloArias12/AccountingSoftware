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
import { TypeCreditSavingAcounts } from '@/lib/utils/type-account/types';
import InputFieldBeneficiary from '../../input/InputBeneficiary';
import SelectField from '../../input/SelectField';
import { optionsNature } from '@/lib/utils/type-account/options';
import SelectOptions from '../../input/SelectOptions';
import InputNumber from '../../input/InputNumber';
import { NumberFormatValues } from 'react-number-format';

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
  const [accounts, setAccounts] = useState<TypeCreditSavingAcounts[]>([]);
  const [accountsInterest, setAccountsInterest] = useState<TypeCreditSavingAcounts[]>([]);
  const [
    createTypeCredit,
    { data: dataCreate, loading: loadingCreate, error: errorCreate },
  ] = useMutation(CREATE_TYPE_CREDIT);
  const { typeCredit,setTypeCredit, handleTypeCredit } = useTypeCredit();
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
        createTypeCredit({
      variables: {
        data: { 
	    name: typeCredit.name,
	    interest: typeCredit.interest,
	    accounts: accounts,
	    accountsInterest:accountsInterest
	 }
    }
  });

  }
 const handleChangeTodo = (id:number,account: TypeCreditSavingAcounts) => {
    setAccounts(
      accounts.map((t, index) => {
        if (index === id) {
          return account;
        } else {
          return t;
        }
      }),
    );
  };
  
   const handleDelete = (id: number) => {
    setAccounts(
      accounts.filter((t, index) => index !== id),
    );
  };

   const addAccount = () => {
    const account: TypeCreditSavingAcounts= {
      account:'',
      nature: '',
    };
    setAccounts([...accounts, account]);
  };

 const handleChangeInterest = (id:number,account: TypeCreditSavingAcounts) => {
    setAccountsInterest(
      accountsInterest.map((t, index) => {
        if (index === id) {
          return account;
        } else {
          return t;
        }
      }),
    );
  };
  
   const handleDeleteInterest = (id: number) => {
    setAccountsInterest(
      accountsInterest.filter((t, index) => index !== id),
    );
  };

   const addAccountInterest = () => {
    const account: TypeCreditSavingAcounts= {
      account:'',
      nature: '',
    };
    setAccountsInterest([...accountsInterest, account]);
  };

  if (dataCreate?.createTypeCredit && !showWarning) {
    setShowModalCreate(false);
    route.push('/dashboard/parametrization/typecredit');
    route.refresh();
  }


   console.log(accounts)
  return (
    <Modal
      size="min-w-[650px] w-[650px]"
      title="Crear tipo de crédito"
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
	 
            <InputNumber
              name="interest"
              label="Interés"
              value={Number(typeCredit.interest)}
              handleChange={(values:NumberFormatValues) =>{
		  //@ts-ignore
		  setTypeCredit({...typeCredit,interest:values.floatValue})
	      }}
	      onChange={true}
            />
          </div>
          <div className="flex flex-col">

          <label className="text-center text-white  bg-[#10417B] text-input font-bold my-2">
              Cuentas</label>
            <div className="flex flex-row justify-between">
	       <label className="font-semibold text-input">Capital</label>
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
            {accounts.map((value:TypeCreditSavingAcounts, index) => (
              <div key={index} className=" gap-2 flex flex-grow w-full my-2  flex-row">
                  <Select
		    label={index===0 && "Cuenta"}
                    options={data.getAuxilaryAll}
                    index={index}
                    setValue={handleChangeTodo}
		    account={value}
                  />
		   <SelectOptions
		    label={index===0 && "Naturaleza"}
                    options={optionsNature}
                    index={index}
                    setValue={handleChangeTodo}
		    account={value}
                  />
	       <div className="flex items-end">
                <button className="flex flex-col items-center justify-center h-8 w-8"
		     onClick={() =>{ handleDelete(index)}}
		>
                  <img src="/delete.svg" />
		   
                </button>
		</div>
	    </div>
            ))}

	 <div className="flex flex-row justify-between">
	       <label className="font-semibold text-input">Interés</label>
              <div
                className="flex flex-row items-center justify-between hover:bg-[#F5F2F2] hover:rounded-[20px] group p-1"
                onClick={addAccountInterest}
              >
                <div className="flex group-hover:text-blue items-center justify-center rounded-[50%] h-6 w-6 bg-[#10417B] ">
                  <AddSvg color="#ffffff" />
                </div>
                <label className="pl-2 hidden group-hover:block text-[12px]">
                  Agregar
                </label>
              </div>
            </div>
            {accountsInterest.map((value:TypeCreditSavingAcounts, index) => (
              <div key={index} className=" gap-2 flex flex-grow w-full my-2  flex-row">
                  <Select
		    label={index===0 && "Cuenta"}
                    options={data.getAuxilaryAll}
                    index={index}
                    setValue={handleChangeInterest}
		    account={value}
                  />
		   <SelectOptions
		    label={index===0 && "Naturaleza"}
                    options={optionsNature}
                    index={index}
                    setValue={handleChangeInterest}
		    account={value}
                  />
	       <div className="flex items-end">
                <button className="flex flex-col items-center justify-center h-8 w-8"
		     onClick={() =>{ handleDeleteInterest(index)}}
		>
                  <img src="/delete.svg" />
		   
                </button>
		</div>
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
          <AlertModalSucces value={`la tipo de credito ha sido creado`} />
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
