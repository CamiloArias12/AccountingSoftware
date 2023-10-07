import { getClient } from "@/lib/graphql/apollo-client-server"
import { GeneralTypeAccount} from "@/lib/utils/type-account/types";
import { gql } from "@apollo/client";
import CreateTypeAccount from "./TypeAccount";

export const revalidate=0

export default async function Page(){
   
   const typeAccounnts:GeneralTypeAccount[]= await getTypeAccounts()

   
   return (
      <>
	    <CreateTypeAccount typeAccounts={typeAccounnts}/>
      </>

   )
}

async  function getTypeAccounts():Promise<GeneralTypeAccount[]>{
 const AFFILIATES=gql`
query {
  getClassAccountAll{
	type
    typeAccount {
      code
      name
      nature
      state
    }
    
  }
  
  getGroupAll{
    type
    typeAccount {
      code
      name
      nature
      state
    }
    
  }
  getAccountAll{
    type
    typeAccount {
      code
      name
      nature
      state
    }
    
  }
  getSubAccountAll{
    type
    typeAccount {
      code
      name
      nature
      state
    }
    
  }
  
  getAuxilaryAll{
    type
    typeAccount {
      code
      name
      nature
      state
    }
    
  }
  
  
}`
   
   const {data}=await getClient().query({query:AFFILIATES})
   
      console.log("Data",data)
      return data.getClassAccountAll.concat(data.getGroupAll,
	    data.getAccountAll,data.getSubAccountAll,data.getAuxilaryAll);
}



