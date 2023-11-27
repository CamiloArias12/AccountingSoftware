import { useTypeAccount } from '@/app/hooks/type-account/TypeAccountInput';
import { useEffect, useState } from 'react';
import {
  TypeAccountEnum,
  optionsAccounts,
  optionsNature,
} from '@/lib/utils/type-account/options';
import { gql, useMutation, useQuery } from '@apollo/client';
import Select from '../../input/Select';
import AlertModalSucces from '../../modal/AlertModalSucces';
import AlertModalError from '../../modal/AlertModalError';
import Modal from '../../modal/Modal';
import { useRouter } from 'next/navigation';
import TypeAccountForm from './TypeAccountInformation';

const GET_CLASS = gql`
  query {
    getClassAccountAll {
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
const GET_ACCOUNT = gql`
  query ($code: Float!) {
    getAccountsByGroup(code: $code) {
      typeAccount {
        code
        name
      }
    }
  }
`;
const GET_SUBACCOUNT = gql`
  query ($code: Float!) {
    getSubAccountByAccount(code: $code) {
      typeAccount {
        code
        name
      }
    }
  }
`;
const GET_GROUP = gql`
  query ($code: Float!) {
    getGroupByClass(code: $code) {
      typeAccount {
        code
        name
      }
    }
  }
`;
const CREATE_TYPE_ACCOUNT = gql`
  mutation ($create: TypeAccountInput!, $type: String!, $reference: Float) {
    createAccount(
      createTypeAccount: $create
      type: $type
      referenceTypeAccount: $reference
    )
  }
`;
function TypeAccountGeneral({
  setShowModalCreate,
}: {
  setShowModalCreate: any;
}) {
  const [indexForm, setIndexForm] = useState('');
  const [type, setType] = useState<TypeAccountEnum>();
  const [typeCode, setTypeCode] = useState<number>(NaN);
  const { data, refetch } = useQuery(GET_CLASS);
  const { data: dataGroup, refetch: queryGroup } = useQuery(GET_GROUP);
  const { data: dataAccount, refetch: queryAccount } = useQuery(GET_ACCOUNT);
  const { data: dataSubAccount, refetch: querySubAccount } =
    useQuery(GET_SUBACCOUNT);
  const {
    typeAccount,
    handleTypeAccount,
    handleChangeTypeAccount,
    handleNumber,
  } = useTypeAccount();
  const [values, setValues] = useState<number[]>([NaN, NaN, NaN, NaN, NaN]);
  const [
    createTypeAccount,
    { data: typeData, loading: loadingType, error: errorType },
  ] = useMutation(CREATE_TYPE_ACCOUNT);
  const route = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  useEffect(() => {
    if (data) {
      const timeout = setTimeout(() => {
        setShowWarning(false);
      }, 2000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [typeData, errorType]);
  const changeElement = (index: number, value: number) => {
    console.log(index, value);
    const updateValues = [...values];
    updateValues[index] = value;
    setValues(updateValues);
  };

  const handleCreate = () => {
    setShowWarning(true);
    if (typeCode === 0) {
      console.log(type, typeCode);
      createTypeAccount({
        variables: {
          create: { ...typeAccount, code: Number(typeAccount.code) },
          type: type,
        },
      });
    }
    if (typeCode >= 1) {
      console.log(values[typeCode - 1]);
      createTypeAccount({
        variables: {
          create: { ...typeAccount, code: Number(typeAccount.code) },
          type: type,
          reference: values[typeCode - 1],
        },
      });
    }
  };
  if (typeData?.createAccount && !showWarning) {
    setShowModalCreate(false);
    route.push('/dashboard/parametrization/typeaccount');
    route.refresh();
  }

  return (
    <Modal
      size="md:min-w-[550px]  md:w-[600px]"
      title="Crear tipo de cuenta"
      onClick={() => {
        setShowModalCreate(false);
        route.push('/dashboard/parametrization/typeaccount');
      }}
    >
      <div className="flex h-full w-full flex-col  ">
        <div className="flex flex-row bg-[#F2F6F8] mt-3 p-2 rounded-lg ">
          {optionsAccounts.map((option) => (
            <div
              key={option.id}
              className="flex flex-row w-full items-center justify-center text-sm "
              onClick={() => {
                setIndexForm(option.name);
                setType(option.name);
                setTypeCode(option.id);
              }}
            >
              <div
                className={`h-5 w-5  rounded-[50%] border-2 border-[#10417B] ${
                  option.name === indexForm ? 'bg-[#10417B]' : 'bg-white'
                }`}
              />
              <label className="ml-2 mr-4">{option.name}</label>
            </div>
          ))}
        </div>
        <div className="flex flex-col mt-4">
            {(indexForm === TypeAccountEnum.GROUP ||
              indexForm === TypeAccountEnum.ACCOUNT ||
              indexForm === TypeAccountEnum.SUBACCOUNT ||
              indexForm === TypeAccountEnum.AUXILIARY) && (
              <Select
                label="Clase"
                options={data?.getClassAccountAll}
                setValue={changeElement}
                index={0}
                onClick={() => {
                  console.log(refetch());
                }}
              />
            )}

            {(indexForm === TypeAccountEnum.ACCOUNT ||
              indexForm === TypeAccountEnum.SUBACCOUNT ||
              indexForm === TypeAccountEnum.AUXILIARY) && (
              <Select
                label="Grupo"
                options={dataGroup?.getGroupByClass}
                setValue={changeElement}
                index={1}
                onClick={() => {
                  !isNaN(values[0]) && queryGroup({ code: values[0] });
                }}
              />
            )}

            {(indexForm === TypeAccountEnum.SUBACCOUNT ||
              indexForm === TypeAccountEnum.AUXILIARY) && (
              <Select
                label="Cuenta"
                options={dataAccount?.getAccountsByGroup}
                setValue={changeElement}
                index={2}
                onClick={() => {
                  !isNaN(values[1]) && queryAccount({ code: values[1] });
                }}
              />
            )}

            {indexForm === TypeAccountEnum.AUXILIARY && (
              <Select
                label="Subcuenta"
                options={dataSubAccount?.getSubAccountByAccount}
                setValue={changeElement}
                index={3}
                onClick={() => {
                  !isNaN(values[2]) && querySubAccount({ code: values[2] });
                }}
              />
            )}

            </div>
        </div>
        
	 <TypeAccountForm 
	       handleNumber={handleNumber} 
	       handleClicckCancel={() =>{setShowModalCreate(false)}}
	       handleClicckAccept={handleCreate}
	       typeAccount={typeAccount}
	       handleTypeAccount={handleTypeAccount}
	       handleChangeTypeAccount={handleChangeTypeAccount}
	       />
	 

	 {typeData?.createAccount && showWarning ? (
          <AlertModalSucces value={`la ${type} ha sido creada`} />
        ) : typeData?.createAccount === false && showWarning ? (
          <AlertModalError value={`El codigo  ya existe con otra cuenta`} />
        ) : (
          errorType && showWarning && <AlertModalError value="Error" />
        )}
      </Modal>
  );
}

export default TypeAccountGeneral;
