
import { gql } from "@apollo/client";
import Thirds from "./Thirds";
import { getClient } from "@/lib/graphql/apollo-client-server";
import { Affiliate, Company } from "@/lib/utils/thirds/types";


export const revalidate=0

async  function getUsers():Promise<any>{
 const AFFILIATES=gql`query {
  getAllUsers{
    name
    lastName
    identification
    status
    phone
    cityResidence
    
  }
 allCompanies{ 
    typeIdentification
    numberIdentification
    legalRepresentativeName
    legalRepresentativeDocument
    socialReason
    typePerson
    
  }
}`
   const {data}=await getClient().query({query:AFFILIATES}) 
   return data;
}

async function PageThirds(){
     const query =await getUsers()
   const affiliates:Affiliate[]=query.getAllUsers
   const companies:Company[]=query.allCompanies

   return (
      <>
	    <Thirds affiliates={affiliates} companies={companies} /> 
      </>
   );

}


export default PageThirds
