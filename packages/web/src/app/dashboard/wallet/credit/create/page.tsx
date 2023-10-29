import { getClient } from "@/lib/graphql/apollo-client-server";
import { gql } from "@apollo/client";
import FormCredit  from "./CreateCredit";
export const revalidate =0

async  function getCreditInformation():Promise<any>{
const CREDIT_INFORMATION=gql`
query {
   allAfiliates{
    user{
      identification
      name
      lastName
    }
    salary
  }
   getTypeCreditAll{
    id
    name
    interest
    auxiliarys{
      type
      typeAccount{
        code
        name
        nature
      }
    }
  }
  
}`
   
   const {data}=await getClient().query({query:CREDIT_INFORMATION})
   
      return data
}



async function CreatePage(){
   
   const data=await getCreditInformation() 
   return (
	 <>
	    <FormCredit creditType={data.getTypeCreditAll} affiliates={data.allAfiliates}  />
	 </>
   )
}

export default CreatePage

