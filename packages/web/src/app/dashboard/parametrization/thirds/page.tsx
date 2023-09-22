
import { gql } from "@apollo/client";
import Thirds from "./Thirds";
import { getClient } from "@/lib/graphql/apollo-client-server";
import { Affiliate } from "@/lib/utils/thirds/types";


export const revalidate=0

async  function getAffiliates():Promise<Affiliate[]>{
 const AFFILIATES=gql`query {
   allAfiliates{
	 user{
	    identification
	    name
	    lastName
	    phone
	    city 
	    status
	 }
      salary
      }
   }`
   const {data}=await getClient().query({query:AFFILIATES})
    const affiliates:Affiliate[]=[]
      await data.allAfiliates.map( (affiliate:any) => {
      console.log("Afiliad",affiliate)
      const dataAffiliate:Affiliate={
	 identification:affiliate.user.identification,
	 name:affiliate.user.name,
	 lastName:affiliate.user.lastName,
	 city:affiliate.user.city,
	 phone:affiliate.user.phone,
	 status:affiliate.user.status,
	 salary:affiliate.salary
      }
      affiliates.push(dataAffiliate)
      })
      
   return affiliates;
}

async function PageThirds(){
   const affiliates:Affiliate[]=await getAffiliates()

   console.log(affiliates)
        
   return (
      <>
	 <Thirds affiliates={affiliates}/> 
      </>
   );

}


export default PageThirds
