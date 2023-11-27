import { useRouter } from "next/navigation";
import Modal from "../../modal/Modal";
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  useEffect,
  useState,
} from 'react';
import { useTypeAccount } from "@/app/hooks/type-account/TypeAccountInput";
import AlertModalSucces from "../../modal/AlertModalSucces";
import AlertModalError from "../../modal/AlertModalError";
import SplashScreen from "../../splash/Splash";
import TableMovementsAccount from "./TableMovementsAccount";
import TableMovements from "./TableMovements";
import { Movement } from "@/lib/utils/accounting/types";
const UPDATE_ACCOUNT = gql`
  mutation ($updateTypeAccount: TypeAccountInput!, $code: Float!) {
    updateAccount(updateTypeAccount: $updateTypeAccount, code: $code)
  }
`;


const GET_ACCOUNT_MOVEMENT = gql`
query($idMovement:String!) {
  findMovementAccount(idMovement:$idMovement){
    debit
    credit
    identificationThird
    code
    nameThird
    nameAccount
  }
  
}
`

function ViewMovementAccount({idMovement,setView,movemnts}:{idMovement:string,setView:any,movemnts:Movement[]}){

  const { data, loading, error } = useQuery(GET_ACCOUNT_MOVEMENT, {
    variables: { idMovement: idMovement},
  });
return (
   <>
    <Modal
      size="min-w-[550px] min-h-[600px]"
      title="Movimiento cuentas"
      onClick={() => {
        setView(false);
      }}
    >
      
      {data &&
      <>
      <TableMovements credits={movemnts}/>
      <TableMovementsAccount movementAccounts={data?.findMovementAccount}/>
      </>
      }
     </Modal> 
</>
);



}


export default ViewMovementAccount 
