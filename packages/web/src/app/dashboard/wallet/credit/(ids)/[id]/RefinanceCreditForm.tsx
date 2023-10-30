'use client';
import InputField from '@/app/components/input/InputField';
import { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Button from '@/app/components/input/Button';
import Logo from '@/app/components/logo/Logo';
import TableAmortization from '@/app/components/forms/credit/TableAmortization';
import { AmortizationTable, RefinanceCredit } from '@/lib/utils/credit/types';
import { optionsCredit } from '@/lib/utils/credit/options';
import { useCredit } from '@/app/hooks/credit/CreditInput';
import { useRouter } from 'next/navigation';
import AlertModalSucces from '@/app/components/modal/AlertModalSucces';
import AlertModalError from '@/app/components/modal/AlertModalError';
import InputCalendar from '@/app/components/input/Calendar';

const GENERATE_TABLE_AMORTIZATION = gql`
  mutation (
    $date: Date!
    $creditValue: Float!
    $interest: Float!
    $installments: Int!
  ) {
    amortizationTableGenerate(
      Date: $date
      creditValue: $creditValue
      interest: $interest
      installments: $installments
    ) {
      installmentNumber
      paymentDate
      initialBalance
      scheduledPayment
      extraPayment
      totalPayment
      capital
      interest
      finalBalance
    }
  }
`;
const GENERATE_TABLE_AMORTIZATION_THREE = gql`
  mutation (
    $date: Date!
    $creditValue: Float!
    $interest: Float!
    $scheduledPayment: Float!
  ) {
    amortizationTableGenerateThree(
      Date: $date
      creditValue: $creditValue
      interest: $interest
      scheduledPayment: $scheduledPayment
    ) {
      installmentNumber
      paymentDate
      initialBalance
      scheduledPayment
      extraPayment
      totalPayment
      capital
      interest
      finalBalance
    }
  }
`;
const CREATE_CREDIT = gql`
  mutation ($create: CreateCreditInput!) {
    createCredit(createCreditInput: $create) {
      id
      startDate
      discountDate
      installments {
        installmentNumber
      }
      affiliate {
        company
      }
    }
  }
`;

export const revalidate = 0;
function RefinanceCreditForm({ dataCredit }: { dataCredit: RefinanceCredit }) {
  const {
    credit,
    setCredit,
    handleCreditNumber,
    handleCreditSelect,
    handleCredit,
  } = useCredit();

  const [data, setData] = useState<AmortizationTable[]>([]);
  const [option, setOption] = useState<number>(0);
  const [
    generateAmortizationTable,
    {
      data: dataAmortization,
      loading: loadingAmortization,
      error: errorAmortization,
    },
  ] = useMutation(GENERATE_TABLE_AMORTIZATION);
  const [
    generateAmortizationTableThree,
    {
      data: dataAmortizationThree,
      loading: loadingAmortizationThree,
      error: errorAmortizationThree,
    },
  ] = useMutation(GENERATE_TABLE_AMORTIZATION_THREE);
  const [
    createCredit,
    { data: dataCreate, loading: loadingCreate, error: errorCreate },
  ] = useMutation(CREATE_CREDIT);
  const [showWarning, setShowWarning] = useState(false);
  const route = useRouter();

  useEffect(() => {
    setCredit({
      nameAffiliate: dataCredit.nameAffiliate,
      identification: dataCredit.identification,
      creditValue: dataCredit.previewBalance,
      typeCredit: dataCredit.typeCredit,
      startDate: new Date(),
      discountDate: new Date(),
      interest: dataCredit.interest,
      interestAnual: '',
      installments: 0,
      scheduledPayment: '',
      idTypeCredit: dataCredit.idTypeCredit,
      previewBalance: dataCredit.previewBalance,
      newBalance: '',
      concept: '',
    });
  }, []);

  const handleCreateCredit = () => {
    setShowWarning(true);
    const create = {
      creditValue: credit.creditValue,
      interest: credit.interest,
      startDate: credit.startDate,
      discountDate: credit.discountDate,
      affiliateId: credit.identification,
      idTypeCredit: credit.idTypeCredit,
      installments: data,
      concept: credit.concept,
    };
    createCredit({
      variables: {
        create: create,
      },
    });
  };

  const handleGenerateTable = () => {
    if (option === 0) {
      generateAmortizationTable({
        variables: {
          date: credit.discountDate,
          creditValue: credit.creditValue,
          interest: credit.interest,
          installments: credit.installments,
        },
      }).then((response: any) => {
        setData(response.data.amortizationTableGenerate);
      });
    }

    if (option === 2) {
      generateAmortizationTableThree({
        variables: {
          date: credit.discountDate,
          creditValue: Number(credit.creditValue),
          interest: Number(credit.interest),
          scheduledPayment: Number(credit.scheduledPayment),
        },
      }).then((response: any) => {
        setData(response.data.amortizationTableGenerateThree);
        handleCreditNumber('installments', data.length);
      });
    }
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
  }, [dataCreate, errorCreate]);

  console.log(dataCreate?.createCredit);

  if (dataCreate?.createCredit && !showWarning) {
    route.push('/dashboard/wallet/credit');
    route.refresh();
  }

  return (
    <div className=" flex-grow flex flex-col  ">
      <div className="flex justify-between ">
        <label className="font-bold px-4 item-center  bg-white pt-2">
          Refinaciar credito
        </label>
        <div className="flex  flex-row bg-white mt-3 pl-4  pt-2">
          {optionsCredit.map((opt) => (
            <>
              {opt.id !== 1 && (
                <div
                  key={opt.id}
                  className="flex flex-grow flex-row  items-center justify-center text-sm "
                  onClick={() => {
                    setOption(opt.id);
                    setData([]);
                  }}
                >
                  <div
                    className={`h-5 w-5  rounded-[50%] border-2 border-[#10417B] ${
                      opt.id === option ? 'bg-[#10417B]' : 'bg-white'
                    }`}
                  />
                  <label className="ml-2 mr-4">{opt.name}</label>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
      <div className=" flex-grow flex flex-col bg-white p-4">
        <div className="flex flex-grow  flex-col   rounded-sm ">
          <div className=" flex-grow flex flex-row">
            <div className="flex-grow flex flex-col pr-2 ">
              <label className="text-center text-white  bg-[#3C7ac2] text-input font-bold mb-2">
                Afliliado
              </label>
              <div className=" flex flex-grow  flex-row">
                <InputField
                  label="Identificacion"
                  name="identification"
                  value={credit.identification}
                  onlyRead={true}
                />
                <InputField
                  label="Nombres"
                  value={credit.nameAffiliate}
                  onlyRead={true}
                />
              </div>
            </div>
            <div className="flex-grow flex flex-col px-2  ">
              <label className="text-center text-white  bg-[#3C7ac2] text-input font-bold mb-2">
                Tipo de credito
              </label>
              <div className="flex flex-grow  flex-row">
                <InputField
                  label="Nombre"
                  name="typeCredit"
                  value={credit.typeCredit}
                />
                <div className="flex flex-grow flex-row items-end">
                  <label className="text-input pr-6">
                    {' '}
                    Interes {credit.interest}%
                  </label>
                  <label className="text-input">Interes anual: 16.56% </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-grow flex flex-col mt-2  ">
            <label className="text-center text-white  bg-[#3C7ac2]   text-input font-bold mb-2">
              Datos credito
            </label>
            <div className="flex-grow flex flex-row">
              <InputCalendar
                name="startDate"
                label="Fecha de creacion"
                value={credit.startDate}
                onChange={handleCreditSelect}
              />
              <InputCalendar
                name="discountDate"
                label="Fecha de descuento"
                value={credit.discountDate}
                onChange={handleCreditSelect}
              />
              <InputField
                label="Valor"
                value={credit.creditValue}
                name="creditValue"
                onBlur={handleCreditNumber}
                onlyRead={true}
                onChange={handleCredit}
              />
              <InputField
                label="Saldo anterior"
                value={credit.previewBalance}
                name="previewBalance"
                onBlur={handleCreditNumber}
                onlyRead={option !== 1 ? false : true}
                onChange={handleCredit}
              />

              <InputField
                label="Nuevo credito"
                value={credit.newBalance}
                name="newBalance"
                onBlur={handleCreditNumber}
                onlyRead={option !== 1 ? false : true}
                onChange={handleCredit}
              />

              <InputField
                label="Numero de coutas"
                value={credit.installments}
                onBlur={handleCreditNumber}
                onlyRead={option !== 2 ? false : true}
                onChange={handleCredit}
                name="installments"
              />
              <InputField
                label="Valor couta"
                value={credit.scheduledPayment}
                onBlur={handleCreditNumber}
                onChange={handleCredit}
                onlyRead={option !== 0 ? false : true}
                name="scheduledPayment"
              />
            </div>
          </div>
        </div>
        <div className="pt-2 flex justify-end mr-4 ">
          <InputField
            label="Concepto"
            name="concept"
            value={credit.concept}
            onChange={handleCredit}
          />

          <button
            className="flex flex-row rounded-sm bg-[#F2F5FA] p-2 "
            onClick={handleGenerateTable}
          >
            <img src="/generate.svg" height={20} width={20} />
            <label className="font-sans px-6 text-sm">Generar tabla</label>
          </button>
        </div>
        <div className="flex-grow h-full">
          {(loadingAmortization || loadingAmortizationThree) && <Logo />}

          {data.length > 0 && (
            <>
              <TableAmortization
                data={data}
                setData={setData}
                setSelected={true}
              />

              <div className="py-4 ">
                <Button
                  name="Aceptar"
                  background="bg-[#10417B] 
			   text-white"
                  onClick={handleCreateCredit}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {dataCreate?.createCredit && showWarning ? (
        <AlertModalSucces value="El  credito ha sido registrado" />
      ) : dataCreate?.createCredit === false && showWarning ? (
        <AlertModalError value="El credit ya existe" />
      ) : (
        errorCreate && showWarning && <AlertModalError value="Error" />
      )}
    </div>
  );
}

export default RefinanceCreditForm;
