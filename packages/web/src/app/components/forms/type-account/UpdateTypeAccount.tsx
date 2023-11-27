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
import TypeAccountForm from "./TypeAccountInformation";
const UPDATE_ACCOUNT = gql`
  mutation ($updateTypeAccount: TypeAccountInput!, $code: Float!) {
    updateAccount(updateTypeAccount: $updateTypeAccount, code: $code)
  }
`;


const GET_ACCOUNT = gql`
query($code:Float!){
  getAccountById(code:$code){
    code
    name
    nature
  }
}

`

function UpdateTypeAccount ({typeAccountSelected,setUpdate}:{typeAccountSelected:number,setUpdate:any}){

  const route = useRouter();

  const [showWarningUpdate, setShowWarningUpdate] = useState(false);
   const [
    updateAccount,
    { data: updateData, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_ACCOUNT);

   const {data,error,loading,refetch}=useQuery(GET_ACCOUNT,{variables:{code:typeAccountSelected },})

 const {
    typeAccount,
    setTypeAccount,
    handleTypeAccount,
    handleChangeTypeAccount,
    handleNumber,
  } = useTypeAccount();

   useEffect (() => {
      if(data){
	 setTypeAccount(data.getAccountById)
      }
   },[data])
   useEffect(() => {
    if (updateData) {
      if (updateData?.updateAccount) {
        setUpdate(false);
        route.refresh();
      }

      console.log('update');
      const timeout = setTimeout(() => {
        setShowWarningUpdate(false);
      }, 3000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [updateData, errorUpdate]);

   const updateAccountHandle = () => {
      setShowWarningUpdate(true);
    updateAccount({
      variables: {
        updateTypeAccount: typeAccount,
        code: typeAccountSelected,
      },
    }).then( () =>{
      refetch()
    })
  };

return (
   <>
    <Modal
      size="min-w-[550px] w-[600px]"
      title="Actualizar cuenta"
      onClick={() => {
        setUpdate(false);
        route.push('/dashboard/parametrization/typeaccount');
      }}
    >
    {loading ? <SplashScreen/>
      : data && 
	 <TypeAccountForm
	    typeAccount={typeAccount}
	    handleNumber={handleNumber}
	    handleTypeAccount={handleTypeAccount}
	    handleClicckAccept={updateAccountHandle}
	    handleChangeTypeAccount={handleChangeTypeAccount}
	    handleClicckCancel={() =>{ setUpdate(false)}}
	 />

    }

     </Modal> 
       {updateData?.updateAccount === true && showWarningUpdate ? (
        <AlertModalSucces value="Se han actualizado los datos" />
      ) : updateData?.updateAccount === false && showWarningUpdate ? (
        <AlertModalError value="Los datos no se pueden actualizar" />
      ) : (
        errorUpdate && showWarningUpdate && <AlertModalError value="Error" />
      )}

   </>
);



}


export default UpdateTypeAccount
