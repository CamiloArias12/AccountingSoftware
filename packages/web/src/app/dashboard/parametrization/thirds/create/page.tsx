import { getClient } from "@/lib/graphql/apollo-client-server";
import CreateThird from "./CreateThird";
import { gql } from "@apollo/client";
import { country } from "@/lib/utils/thirds/types";

const COUNTRIES =gql `
   query Country{
      getCountry{
	 id
	 name
	 iso2
  }
}
`

async function CreatePage(){
   const {data}= await getClient().query({query:COUNTRIES})
      data.getCountry.map((data:country ) =>{
	 console.log(data.id,data.name)

   } )
   return (
	 <>
	    <CreateThird countries={data.getCountry} />
	 </>
   )
}

export default CreatePage
