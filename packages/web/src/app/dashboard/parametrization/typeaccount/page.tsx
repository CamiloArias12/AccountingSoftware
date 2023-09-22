import { getClient } from "@/lib/graphql/apollo-client-server"
import { Affiliate } from "@/lib/utils/thirds/types";
import { TypeAccounnt } from "@/lib/utils/type-account/types";
import { gql } from "@apollo/client";
import Modal from "@/app/components/modal/Modal";
import CreateTypeAccount from "./TypeAccount";

export const revalidate=0

export default async function Page(){
   
   const typeAccounnts:TypeAccounnt[]= await getTypeAccounts()
   
   return (
      <>
	 {<CreateTypeAccount typeAccounts={typeAccounnts}/>}
      </>

   )
}

async  function getTypeAccounts():Promise<TypeAccounnt[]>{
 const AFFILIATES=gql`query {
	 allClassAccounts{
	    code
	    name
	    nature
	 }
      }`
   
   const {data}=await getClient().query({query:AFFILIATES})
   const typeAccounts:TypeAccounnt[]=[]
   await data.allClassAccounts.map ( (response:TypeAccounnt) => {
	typeAccounts.push(response) 
   } ) 
   
   console.log(typeAccounts)

   return typeAccounts;
}



