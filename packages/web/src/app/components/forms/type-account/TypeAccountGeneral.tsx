import { useTypeAccount } from "@/app/hooks/type-account/TypeAccountInput";
import { useState } from "react";
import Button from "../../input/Button";
import { TypeAccountEnum, optionsAccounts } from "@/lib/utils/type-account/options";
import InputField from "../../input/InputField";
import { gql,useMutation,useQuery } from "@apollo/client";
import Select from "../../input/Select";

const GET_CLASS= gql `
 query{
   getClassAccountAll{
	type
      typeAccount {
	 code
	 name
	 nature
	 state
      }
    
   }	
}
`
const GET_ACCOUNT= gql `
 query ($code:Float!) {
  
getAccountsByGroup(code:$code){
  typeAccount{
    code
    name
    
  }
}  
}
`
const GET_SUBACCOUNT= gql `
 query ($code:Float!) {
  
getSubAccountByAccount(code:$code){
  typeAccount{
    code
    name
    
  }
}  
}
`
const GET_GROUP= gql `
 query ($code:Float!) {
  
getGroupByClass(code:$code){
  typeAccount{
    code
    name
    
  }
}  
}
`
const CREATE_TYPE_ACCOUNT = gql `
  mutation ($create:CreateTypeAccount! , $type:String!, $reference:Float){
  createAccount(createTypeAccount:$create, type:$type, referenceTypeAccount:$reference){
    
    code
    name
    nature
    state
    
  }
}

`
function TypeAccountGeneral (){
    const [indexForm,setIndexForm]=useState("")
    const [type,setType]=useState<TypeAccountEnum>()
    const [typeCode,setTypeCode]=useState<number>(NaN)
    const {data,refetch}=useQuery(GET_CLASS)
    const {data:dataGroup,refetch:queryGroup}=useQuery(GET_GROUP)
    const {data:dataAccount,refetch:queryAccount}=useQuery(GET_ACCOUNT)
    const {data:dataSubAccount,refetch:querySubAccount}=useQuery(GET_SUBACCOUNT)
    const { typeAccount, handleTypeAccount } = useTypeAccount();
    const [values,setValues]= useState<number[]>([NaN,NaN,NaN,NaN,NaN])
    const [createTypeAccount, { data: typeData, loading: loadingType, error: errorType }] = useMutation(CREATE_TYPE_ACCOUNT);

   const changeElement =(index:number,value:number) =>{
	 console.log(index,value)
	 const updateValues =[...values]
	 updateValues[index]=value
	 setValues(updateValues)
   }

   const handleCreate =() =>{

      if(typeCode===0){

      console.log(type,typeCode)
	 createTypeAccount(
	    {
	       variables:{
		  create:{...typeAccount,code:Number(typeAccount.code)},
		  type:type

	       }
	    })
      }
      if(typeCode >=1){
	    console.log(values[typeCode-1])
	     createTypeAccount(
	    {
	       variables:{
		  create:{...typeAccount,code:Number(typeAccount.code)},
		  type:type,
		  reference:values[typeCode-1]

	       }
	    })

	 }

   }
  return (
      <div className="flex h-full w-full flex-col  ">
	    <div className="flex flex-row bg-[#F2F6F8] mt-3 p-4  rounded-[30px] ">
	       {optionsAccounts.map((option) =>(
	       <div key={option.id} className="flex flex-row w-full items-center justify-center " 
		  onClick={() => {
		  setIndexForm(option.name)
		  setType(option.name)
		  setTypeCode(option.id)
		  }}>
		  <div className={`h-5 w-5  rounded-[50%] border-2 border-[#10417B] ${option.name===indexForm ? "bg-[#10417B]" : "bg-white"}`} />
		  <label className="mr-4">{option.name}</label>
	       </div>
	       ))}
	    </div> 
	    <div className="flex flex-col items-center justify-center w-full h-full">
	       <div className="flex flex-col space-y-4 w-full max-w-3xl p-4">
		  {(indexForm===TypeAccountEnum.GROUP || indexForm===TypeAccountEnum.ACCOUNT || indexForm===TypeAccountEnum.SUBACCOUNT ||indexForm===TypeAccountEnum.AUXILIARY ) &&
			<Select label="Clase" options={data?.getClassAccountAll} setValue={changeElement} index={0} onClick={()=>{
			console.log(
			 refetch())}}/>
		     }

		     {(indexForm===TypeAccountEnum.ACCOUNT || indexForm===TypeAccountEnum.SUBACCOUNT || indexForm===TypeAccountEnum.AUXILIARY ) &&
			<Select label="Grupo" options={dataGroup?.getGroupByClass} setValue={changeElement} index={1} onClick={()=>{
			  (!isNaN(values[0])) && queryGroup({code:values[0]})

			 }}/>
		     }
		     
		  {( indexForm===TypeAccountEnum.SUBACCOUNT || indexForm===TypeAccountEnum.AUXILIARY ) &&
			<Select label="Cuenta" options={dataAccount?.getAccountsByGroup} setValue={changeElement} index={2} onClick={()=>{
			(!isNaN(values[1])) && queryAccount({code:values[1]})
			 }}/>
		     }

		     {(indexForm===TypeAccountEnum.AUXILIARY ) &&
			<Select label="Subcuenta" options={dataSubAccount?.getSubAccountByAccount} setValue={changeElement} index={3} onClick={()=>{
			(!isNaN(values[2])) && querySubAccount({code:values[2]})
			}}/>
		     }


		  <div className="grid grid-cols-2 gap-4 mt-8">
                    <InputField
                        name="code"
                        label="Código"
                        value={typeAccount.code || ''}
                        onChange={handleTypeAccount}
                    />

                    <InputField
                        name="name"
                        label="Nombre"
                        value={typeAccount.name}
                        onChange={handleTypeAccount}
                    />

                    <InputField
                        name="nature"
                        label="Naturaleza"
                        value={typeAccount.nature}
                        onChange={handleTypeAccount}
                    />
		   </div>
		  </div>
	       </div>

	       <div className="pt-10 flex justify-end">
		  <div className="pr-4">
		     <Button name="Cancelar" background="border border-[#10417B] text-[#10417B]" />
		  </div>
	        <Button name="Aceptar" background="bg-[#10417B] text-white" onClick={handleCreate}/>
	    </div>

      </div>

  ) 

}


export default TypeAccountGeneral
