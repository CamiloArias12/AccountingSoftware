"use client"
import BeneficiaryInformation from "@/app/components/forms/thirds/BeneficiaryInformation";
import CredentialsForm from "@/app/components/forms/thirds/Credentials";
import GeneralInformation from "@/app/components/forms/thirds/GeneralInformation";
import WorkingInformtaion from "@/app/components/forms/thirds/WorkingInformation";
import Button from "@/app/components/input/Button";
import CheckBoxThirds from "@/app/components/input/CheckBoxThirds";
import ListChange from "@/app/components/list-change/ListChange";
import { FormGeneralInformation } from "@/app/hooks/thirds/GeneralInput";
import { FormWorkingInformation } from "@/app/hooks/thirds/WorkingInput";
import { OptionsThirds } from "@/lib/utils/thirds/OptionsThirds";
import { Beneficiaries} from "@/lib/utils/thirds/types";
import { gql,useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const CREATE_USER= gql`
mutation ( $createAffiiate: InputAffiliateCreate,$createUserInput: UserInput!,$createEmployee: InputEmployeeCreate
){
  
  createUser(
    createUserInput:$createUserInput
    createAffiiate: $createAffiiate
    createEmployee:$createEmployee
    createProvider:true
  )
    
  
}
`


function  FormThirdNatural({countries,informationUser,informationAffilate,informationEmployee}:{countries:any,informationUser?:any,informationAffilate?:any,provider?:any,informationEmployee?:any}){
      
      const {generalInformation,handleGeneralInformation,handleChangeGeneralInformation,setGeneralInformation}=FormGeneralInformation({})
      const {workingInformation,handleChangeWorkingInformation,setWorkingInformation}=FormWorkingInformation({})
      const [beneficiaryInformation, setBeneficiaryInformation] = useState<Beneficiaries[]>([]);
      const[indexForm,setIndexForm]= useState<number>(1)
      const [checkedAffiliate,setCheckedAffiliate]= useState<boolean>(false)
      const [checkedEmployee,setCheckedEmployee]= useState<boolean>(false)
      const [checkedProvider,setCheckedProvider]= useState<boolean>(false)
      const [list ,setList]=useState(OptionsThirds)
      const [createUser, { data: userData, loading: loadingUser, error: errorUser }] = useMutation(CREATE_USER);
     
      const route =useRouter()
      useEffect(()=>{
	 if(informationUser){
	       setGeneralInformation({...informationUser, expeditionDate:new Date(informationUser.expeditionDate),birthDate:new Date(informationUser.birthDate) })
	    }
	 if(informationAffilate){
	    setWorkingInformation({...informationAffilate,incomeCompany:new Date(informationAffilate.incomeCompany)})
	    setBeneficiaryInformation(informationAffilate.beneficiaries)
	    setCheckedAffiliate(true)
	    
	 }

      },[])

      useEffect( () =>{
	 const updatedList = [...OptionsThirds];
	 
	 if (checkedAffiliate) {
	    updatedList[1].visible = true;
	    updatedList[3].visible = true;
	 } else {
	    updatedList[1].visible = false;
	    updatedList[3].visible = false;
	 }
      if (checkedEmployee) {
	    updatedList[2].visible = true;
	 }else{
	    updatedList[2].visible = false;
	 }

	   setList(updatedList);
      },[checkedAffiliate,checkedEmployee])


   const handleCreate=async () =>{
   let inputAffiliate =null
   
   try {
        inputAffiliate =async () =>{
	
	 setBeneficiaryInformation(beneficiaryInformation.map((beneficiary) =>(
	     {beneficiary:{idDocument:Number(beneficiary.beneficiary.idDocument),name:beneficiary.beneficiary.name},percentage:Number(beneficiary.percentage)})
	 )
	 )

	 return {
	    inputAffiliate:{...workingInformation,
	       salary:Number(workingInformation.salary),
	       phone:Number(workingInformation.phone),
	       incomeCompany:Number(workingInformation.incomeCompany),
	       numberAccount:Number(workingInformation.numberAccount)
	       },
	    beneficiaries:beneficiaryInformation
	    } 
	 }
	 }finally{
	 createUser(
	 {
	 variables:{
	    createUserInput:{ ...generalInformation, identification: Number(generalInformation.identification)},
	    createAffiiate:inputAffiliate
	    
	    },
	 })
	 }
   }
      
   return (
      <div className="h-full flex-grow flex flex-col ">
	    <ListChange indexForm={indexForm} setIndexForm={setIndexForm} list={list.filter((option =>(option.visible==true)))} color="bg-[#006AE7]"/>

	    <div className="flex flex-row bg-white pt-3 px-2  rounded-tr-lg rounded-tr-lg rounded-tl-[100px] ">
	       <CheckBoxThirds isChecked={checkedAffiliate} 
		  onChange={()=> {
		     setCheckedAffiliate(!checkedAffiliate)
		 		  		  }} 
		  name="Afiliado"/>
	       <CheckBoxThirds isChecked={checkedEmployee} 
		  onChange={()=> {
		     setCheckedEmployee(!checkedEmployee)
		 		  		  }} 
		  name="Empleado"/>
	       <CheckBoxThirds isChecked={checkedProvider} 
		  onChange={()=> {
		     setCheckedProvider(!checkedProvider)
		 		  		  }} 
		  name="Proveedor"/>

	    </div> 
	 <div className="flex-grow h-full  flex flex-col  bg-[#FFFFFF]  rounded-bl-lg rounded-br-lg rounded-tr-lg p-3">
	    <div className="flex-grow max-h-[80%] flex flex-row ">
	       <div className="flex-grow px-4 overflow-y-scroll ">
		   {indexForm===1 && <GeneralInformation  countries={countries} handleGeneralInformation={handleGeneralInformation}  generalInformation={generalInformation} handleChangeGeneralInformation={handleChangeGeneralInformation} />}
		  {(checkedAffiliate && indexForm===2) &&
		  <> 
		     <WorkingInformtaion workingInformation={workingInformation} handleChangeWorkingInformation={handleChangeWorkingInformation} />
		     <BeneficiaryInformation beneficiaryInformation={beneficiaryInformation} setBeneficiaryInformation={setBeneficiaryInformation} />
		  </>
		  }
		  {(checkedEmployee && indexForm===1)&&<CredentialsForm />}
	       </div>
	       <div></div>
	       </div>
	 {(checkedAffiliate || checkedEmployee || checkedProvider) &&
	   <div className="pt-10 flex justify-end">
	       <div className="pr-4">
	        <Button name="Cancelar" background="border border-[#10417B] text-[#10417B]" 
			onClick={() =>{route.push('/dashboard/parametrization/thirds')}}/>
		</div>
	        <Button 
		  name="Aceptar" background="bg-[#10417B] text-white"
		  onClick={()=> {
			handleCreate()
			   //route.push('/dashboard/parametrization/thirds')
			  // route.refresh()
		  }} 
		  />
	    </div>
	 }
	   </div>
	 </div>
      
   );

}


export default FormThirdNatural
