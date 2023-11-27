import { useRouter } from "next/navigation";
import Modal from "../../modal/Modal";
import { gql, useMutation, useQuery } from '@apollo/client';
import { Movement } from "@/lib/utils/accounting/types";
import InputField from "../../input/InputField";
import InputCalendar from "../../input/Calendar";
import { useDisbursement } from "@/app/hooks/disbursement/DisbursementInput";
import Select from "../../input/Select";
import SelectAffiliate from "../../input/SelectAffiliate";
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

function FormDisbursement({auxiliaries}:{auxiliaries:any}){

   const {disbursement,handleDisbursement,handleDisbursementSelect}=useDisbursement()
return (
   <>
      <div className="flex flex-col gap-2 ">
          <InputField
            name="concept"
            label="Concepto"
            value={disbursement.concept}
            onChange={handleDisbursement}
          />
	 <div className="flex flex-row">
          <InputCalendar
            name="date"
            label="Fecha"
            value={disbursement.date}
            onChange={handleDisbursementSelect}
          />
	 <Select
            label="Cuenta"
	    setValue={handleDisbursementSelect}
	    options={auxiliaries}
	    index={0}
          />



	  </div>
      </div>


    </>
);



}


export default FormDisbursement
