import { getClient } from "@/lib/graphql/apollo-client-server"
import { TypeSaving } from "@/lib/utils/type-saving/types";
import { gql } from "@apollo/client";
import TypeSavings from "./TypeSaving";

export const revalidate=0

export default async function Page(){
   
   const typeSavings:TypeSaving[]= await getTypeSavings()

   
   return (
      <>
	 <TypeSavings typeSavings={typeSavings} />
      </>

   )
}

async  function getTypeSavings():Promise<TypeSaving[]>{
 const TYPE_SAVINGS=gql`
query {
 getTypeSavingAll{
    id
    name
    auxiliarys{
      typeAccount{
        code
        name
      }
    }
  }
  
}`
   
   const {data}=await getClient().query({query:TYPE_SAVINGS})
   
      return data.getTypeSavingAll;
}


