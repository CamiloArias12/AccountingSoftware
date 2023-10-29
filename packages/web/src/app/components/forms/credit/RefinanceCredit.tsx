
import InputField from "@/app/components/input/InputField";
import SelectAffiliate from "@/app/components/input/SelectAffiliate";
import { useEffect, useState } from "react"
import { gql,useMutation,} from "@apollo/client";
import Button from "@/app/components/input/Button";
import Logo from "@/app/components/logo/Logo";
import TableAmortization from "@/app/components/forms/credit/TableAmortization";
import { AmortizationTable } from "@/lib/utils/credit/types";
import { optionsCredit } from "@/lib/utils/credit/options";
import { useCredit } from "@/app/hooks/credit/CreditInput";
import { useRouter } from "next/navigation";
import AlertModalSucces from "@/app/components/modal/AlertModalSucces";
import AlertModalError from "@/app/components/modal/AlertModalError";
import InputCalendar from "@/app/components/input/Calendar";


const GENERATE_TABLE_AMORTIZATION=gql `
mutation($date:DateTime!,$creditValue:Float!,$interest:Float!,$installments:Int!) {
   amortizationTableGenerate(Date:$date,creditValue:$creditValue,interest:$interest,installments:$installments){
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

` 
const GENERATE_TABLE_AMORTIZATION_THREE=gql `
mutation($date:DateTime!,$creditValue:Float!,$interest:Float!,$scheduledPayment:Float!) {
	amortizationTableGenerateThree(Date:$date,creditValue:$creditValue,interest:$interest,scheduledPayment:$scheduledPayment){
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
` 
const CREATE_CREDIT =gql `
mutation ($create:CreateCreditInput!){
  
  createCredit(createCreditInput:$create){
    id
    startDate
    discountDate
    state
    installments{
      installmentNumber
    }
    affiliate{
     company
      
    }
  }
  
}

`

export const revalidate=0
function  FormCredit({affiliates,creditType,accounts}:{affiliates:any,creditType:any,accounts?:any}){

   const {credit,handleCreditNumber,handleCreditSelect,handleCredit}= useCredit() 

   const [data,setData]=useState<AmortizationTable[]>([])
   const [option,setOption]=useState<number>(0)
   const [generateAmortizationTable, { data:dataAmortization, loading: loadingAmortization, error: errorAmortization}] = useMutation(GENERATE_TABLE_AMORTIZATION);
   const [generateAmortizationTableThree, { data:dataAmortizationThree, loading: loadingAmortizationThree, error: errorAmortizationThree}] = useMutation(GENERATE_TABLE_AMORTIZATION_THREE);
   const [createCredit, { data:dataCreate, loading: loadingCreate, error: errorCreate}] = useMutation(CREATE_CREDIT);
   const [showWarning, setShowWarning] = useState(false);
   const route =useRouter()
   
   const handleCreateCredit =() =>{
      const create ={
	  creditValue:credit.creditValue,
	 interest: credit.interest,
	 startDate: credit.startDate,
	 discountDate: credit.discountDate,
	 affiliateId: credit.identification,
	 idTypeCredit: credit.idTypeCredit,
	 installments:data
      }
      createCredit({
	 variables: {
	    create:create
	    }
      })
   }

   const handleGenerateTable= () => {
      setShowWarning(true)
      if(option===0){ 
	 generateAmortizationTable(
	    {
	       variables:{
		  date:credit.discountDate,
		  creditValue:credit.creditValue,
		  interest:credit.interest,
		  installments:credit.installments
	       },
	    }
	 ).then((response:any) =>{
	       setData(response.data.amortizationTableGenerate)
	 })
      }
     
   if(option===2){ 
	 generateAmortizationTableThree(
	    {
	       variables:{
		  date:new Date(),
		  creditValue:Number(credit.creditValue),
		  interest:Number(credit.interest),
		  scheduledPayment:Number(credit.scheduledPayment)
	       },
	    }
	 ).then((response:any) =>{
	       setData(response.data.amortizationTableGenerateThree)
	       handleCreditNumber('installments',data.length)
	 })
      }
 
    }

 useEffect(() => {
    if (data) {
      const timeout = setTimeout(() => {
	 setShowWarning(false)
      }, 3000); // 3 seconds in milliseconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [dataCreate,errorCreate]);

   console.log(dataCreate?.createCredit)
      
   if(dataCreate?.createCredit && !showWarning){
      route.push('/dashboard/wallet/credit')
      route.refresh()
   }

   return (
      <div className=" flex-grow flex flex-col bg-white ">
	 <div className="w-full flex items-center justify-center mt-4">
	    <label className="text-center font-bold w-full">Crear credito</label>
	 <div className="flex flex-row bg-[#F2F6F8] mt-3 p-4  rounded-lg mr-4 ">
	       {optionsCredit.map((opt) =>(
	       <div key={opt.id} className="flex flex-row w-full items-center justify-center text-sm " 
		  onClick={() => {
		     setOption(opt.id)
		     setData([])
		     console.log("option",option)
		  }}>
		  <div className={`h-5 w-5  rounded-[50%] border-2 border-[#10417B] ${opt.id===option ? "bg-[#10417B]" : "bg-white"}`} />
		  <label className="ml-2 mr-4">{opt.name}</label>
	       </div>
	       ))}
	    </div>
	 </div>
	 <div className="flex  flex-row justify-between m-4">
	    
	    <div className="flex flex-row w-1/3">
	       <div className="flex flex-col mr-4">
		  <label className="text-center">Afliliado</label>
		  <InputField 
		     label="Identificacion" 
		     value={credit.identification}  
		     onlyRead={true}
		     />

		  <InputField 
		     label="Nombres" 
		     value={credit.nameAffiliate}  
		     onlyRead={true}
		     />
		  <InputField 
		     label="Valor" 
		     value={credit.creditValue}  
		     name="creditValue" 
		     onBlur={handleCreditNumber} 
		     onlyRead={true} 
		     onChange={handleCredit} 
		     />
	       </div>
	       <div className="flex flex-col">
	        <InputField
		  label="Tipo de credito" 
		  name="typeCredit" 
		  value={credit.typeCredit} 
		  onlyRead={true}
		  />
	       <label > Interes {credit.interest}%</label>
	       <label>Interes anual: 16.56% </label>
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

	       </div>
	    </div>
	    <div className=" w-1/3">
	       <InputField 
		  label="Numero de coutas" 
		  value={credit.installments} 
		  onBlur={handleCreditNumber} 
		  onlyRead={option!==2 ? false:true} 
		  onChange={handleCredit} 
		  name="installments" 
		  />
	       <InputField 
		  label="Valor couta" 
		  value={credit.scheduledPayment} 
		  onBlur={handleCreditNumber} 
		  onChange={handleCredit} 
		  onlyRead={option!==0 ? false:true}  
		  name="scheduledPayment" 
		  />
	       <div className="pt-10 flex justify-end ">
		  <div className="pr-4">
		     <Button name="Aceptar" background="bg-[#10417B] text-white" onClick={handleGenerateTable}/>
		  </div>
	       </div>
	    </div>
	 </div>
	  <div className="flex-grow h-full">
	       {(loadingAmortization || loadingAmortizationThree)&&
		  <Logo/>
	       }
	      
	       {(data.length>0) &&
		  <>
		     <TableAmortization data={data} setData={setData}setSelected={true}/>

		     <div className="py-4 ">
			<Button 
			   name="Aceptar" 
			   background="bg-[#10417B] 
			   text-white" 
			   onClick={handleCreateCredit}
			   />
		     </div>
		  </>
	       }
	       </div>
	 {(dataCreate?.createCredit && showWarning) ?
	    <AlertModalSucces value="El  credito ha sido registrado"/>
	    : (dataCreate?.createCredit ===false && showWarning) ?
	    <AlertModalError value="El credit ya existe"/>
	    : (errorCreate&& showWarning) &&
	    <AlertModalError value="Error"/>
	    }
      </div>
   );

}


export default FormCredit 
