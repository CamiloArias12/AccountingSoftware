
import { gql } from "@apollo/client";
import Thirds from "./Thirds";
import { getClient } from "@/lib/graphql/apollo-client-server";
import { Affiliate } from "@/lib/utils/thirds/types";


export const revalidate=0

async  function getAffiliates():Promise<Affiliate[]>{
 const AFFILIATES=gql`query {
  getAllUsers{
    name
    lastName
    identification
    status
    phone
    
  }
}`
   const {data}=await getClient().query({query:AFFILIATES}) 
   return data.getAllUsers;
}

async function PageThirds(){
   const affiliates:Affiliate[]=await getAffiliates()

   return (
      <>
	    <Thirds affiliates={affiliates}/> 
      </>
   );

}


export default PageThirds
