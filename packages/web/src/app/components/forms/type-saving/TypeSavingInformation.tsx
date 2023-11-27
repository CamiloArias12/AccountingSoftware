'use client';
import { useEffect, useState } from 'react';
import InputField from '@/app/components/input/InputField';
import { gql, useMutation, useQuery } from '@apollo/client';
import Select from '../../input/Select';
import Button from '../../input/Button';
import { AddSvg } from '../../logo/Add';
import { useRouter } from 'next/navigation';
import AlertModalSucces from '../../modal/AlertModalSucces';
import AlertModalError from '../../modal/AlertModalError';
import Modal from '../../modal/Modal';
import { useTypeSaving } from '@/app/hooks/type-saving/TypeSavingInput';
import { TypeSavingAcounts } from '@/lib/utils/type-saving/types';
import SelectOptions from '../../input/SelectOptions';
import { optionsNature } from '@/lib/utils/type-account/options';
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
const CREATE_TYPE_SAVING = gql`
  mutation ($data: CreateTypeSavingDto!) {
    createTypeSaving(data: $data) {
      name
    }
  }
`;
const REFINANCE = gql`
  mutation ($id: Int!) {
    isRefinance(id: $id)
  }
`;

export function TypeSavingForm({
  setShowModalCreate,
}: {
  setShowModalCreate: any;
}) {
  const { data, loading, error } = useQuery(AUXLILIARIES);
  const [accounts,setAccounts]=useState<TypeSavingAcounts[]>([])
  const [
    createTypeSaving,
    { data: dataCreate, loading: loadingCreate, error: errorCreate },
  ] = useMutation(CREATE_TYPE_SAVING);
  const [
    isRefinance,
    { data: dataRefinance, loading: loadingRefinance, error: errorRefinance },
  ] = useMutation(REFINANCE);
  const { typeSaving, handleTypeSaving } = useTypeSaving();
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

  if (dataCreate?.createTypeSaving && !showWarning) {
    setShowModalCreate(false);
    route.push('/dashboard/parametrization/typesaving');
    route.refresh();
  }

  const handleCreateTypeSaving = () => {
    setShowWarning(true);
    createTypeSaving({
      variables: {
        data:{
	name: typeSaving.name,
	 accounts: accounts,
	 }
      },
    });
  };

 const handleChangeTodo = (id:number,account: TypeSavingAcounts) => {
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
    const account: TypeSavingAcounts= {
      percentage:'',
      account:'',
      nature: '',
    };
    setAccounts([...accounts, account]);
  };




   return (
    <Modal
      size="min-w-[850px] w-[850px]"
      title="Crear tipo de ahorro"
      onClick={() => {
        setShowModalCreate(false);
        route.push('/dashboard/parametrization/typesaving');
      }}
    >
      <div className="flex flex-col   w-full h-full">
        <div className="flex flex-col space-y-4 w-full max-w-3xl p-4">
          {/* InputFields */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <InputField
              name="name"
              label="Nombre"
              value={typeSaving.name}
              onChange={(e) => {
                handleTypeSaving(e);
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-4">
              <label className="font-bold">Cuentas</label>
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
           {accounts.map((value:TypeSavingAcounts, index) => (
              <div key={index} className=" gap-2 flex flex-grow w-full my-2  flex-row">
                  <Select
		    label={index===0 &&"Cuenta"}
                    options={data.getAuxilaryAll}
                    index={index}
                    setValue={handleChangeTodo}
		    account={value}
                  />
		   <SelectOptions
		    label={index ===0 &&"Naturaleza"}
                    options={optionsNature}
                    index={index}
                    setValue={handleChangeTodo}
		    account={value}
                  />
		     <InputNumber
			label={index===0 &&"Porcentaje"}
			name="percentage"
			value={value.percentage}
			className="w-[100px]"
			onChange={true}
			handleChange={(values:NumberFormatValues) => {
			   console.log(value)
			   handleChangeTodo(index,{...value,percentage:values.floatValue})
			}}
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
              onClick={handleCreateTypeSaving}
            />
          </div>
        </div>
        {dataCreate?.createTypeSaving && showWarning ? (
          <AlertModalSucces value={`la tipo de ahorro ha sido creado`} />
        ) : (
          dataCreate?.createTypeSaving === false &&
          showWarning &&
          errorCreate &&
          showWarning && <AlertModalError value="Error" />
        )}
      </div>
    </Modal>
  );
}

export default TypeSavingForm;
