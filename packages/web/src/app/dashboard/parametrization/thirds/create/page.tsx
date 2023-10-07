import { getClient } from "@/lib/graphql/apollo-client-server";
import CreateThird from "./CreateThird";
import { gql } from "@apollo/client";

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

   return (
	 <>
	    <CreateThird countries={data.getCountry} />
	 </>
   )
}

export default CreatePage
