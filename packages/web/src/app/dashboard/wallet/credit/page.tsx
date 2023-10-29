import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/apollo-client-server";
import { Affiliate } from "@/lib/utils/thirds/types";
import Credits from "./Credits";
import { Credit } from "@/lib/utils/credit/types";


export const revalidate=0

async  function getCredits():Promise<Credit[]>{
 const CREDITS=gql`query {
    getAllCredit{
   id
    identification
    name
    lastName
    creditValue 
    nameCredit
    state
    discountDate
    interest
  
  }
  }`
   const {data}=await getClient().query({query:CREDITS}) 
   return data.getAllCredit;
}

async function PageCredit(){
   const credits:Credit[]=await getCredits()

   return (
      <>
	 <Credits credits={credits} />
      </>
   );

}


export default PageCredit
