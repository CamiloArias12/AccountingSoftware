import { useQuery, gql } from '@apollo/client';
import Modal from '../../modal/Modal';
import SplashScreen from '../../splash/Splash';
import { useEffect, useState } from 'react';
import { AmortizationTable } from '@/lib/utils/credit/types';
import UpdateTableAmortization from './UpdateTableAmortization';
import { useCredit } from '@/app/hooks/credit/CreditInput';
import InputField from '../../input/InputField';
import InputCalendar from '../../input/Calendar';
import Button from '../../input/Button';

const GET_CREDIT = gql`
  query getCredit($id: Int!) {
    findOneCredit(id: $id) {
      id
      creditValue
      interest
      startDate
      discountDate
      state
      typeCredit {
        id
        name
      }
      affiliate {
        user {
          identification
          name
          lastName
        }
      }
      installments {
        installmentNumber
        paymentDate
        initialBalance
        scheduledPayment
        extraPayment
        totalPayment
        capital
        interest
        finalBalance
        state
      }
    }
  }
`;

function UpdateCredit({
  idCredit,
  setShow,
}: {
  idCredit: number;
  setShow: any;
}) {
  const {
    credit,
    setCredit,
    handleCreditNumber,
    handleCreditSelect,
    handleCredit,
  } = useCredit();
  const {
    data: dataUser,
    loading,
    error,
  } = useQuery(GET_CREDIT, {
    variables: { id: idCredit },
  });

  const [data, setData] = useState<AmortizationTable[]>([]);

  useEffect(() => {
    if (dataUser) {
      setData(dataUser?.findOneCredit?.installments);
      setCredit({
        identification:
          dataUser?.findOneCredit?.affiliate?.user?.identification,
        creditValue: dataUser?.findOneCredit?.creditValue,
        discountDate: new Date(dataUser?.findOneCredit?.discountDate),
        startDate: new Date(dataUser?.findOneCredit?.startDate),
        installments: (dataUser?.findOneCredit?.installments).length,
        interestAnual: String(
          dataUser?.findOneCredit?.interest * (12 / 100) * 100,
        ),
        nameAffiliate: `${dataUser?.findOneCredit?.affiliate?.user?.name} ${dataUser?.findOneCredit?.affiliate?.user?.lastName}`,
        typeCredit: dataUser?.findOneCredit?.typeCredit?.name,
        scheduledPayment:
          dataUser?.findOneCredit?.installments[0].scheduledPayment,
        idTypeCredit: dataUser?.findOneCredit?.typeCredit?.id,
        interest: dataUser?.findOneCredit?.interest,
        newBalance: '',
        previewBalance: 0,
        concept: '',
      });
    }
  }, [dataUser]);

  if (error) {
    return (
      <Modal
        size="h-[100px] w-[300px]"
        title="Error"
        onClick={() => setShow(false)}
      >asd</Modal>
    );
  }
  return (
    <Modal
      size="max-h-[90%] w-[90%]"
      title="Actualizar credito"
      onClick={() => setShow(false)}
    >
      <>{loading && <SplashScreen />}</>
      {data.length > 0 && (
        <>
          <div className="flex flex-grow  flex-col   rounded-sm my-10 ">
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
                  onlyRead={true}
                />
                <InputField
                  label="Numero de coutas"
                  value={credit.installments}
                  onBlur={handleCreditNumber}
                  onlyRead={true}
                />
                <InputField
                  label="Valor couta"
                  value={credit.scheduledPayment}
                  onlyRead={true}
                />
              </div>
            </div>

            <UpdateTableAmortization
              setData={setData}
              data={data}
              setSelected={true}
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
                onClick={() => {}}
              />
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}

export default UpdateCredit;
