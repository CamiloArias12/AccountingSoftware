import { getClient } from "@/lib/graphql/apollo-client-server"
import { RefinanceCredit } from "@/lib/utils/credit/types"
import { gql} from "@apollo/client"
import FormCredit from "./RefinanceCredit"

type pageProps ={
   params:{id:number}
}

export const revalidate=0

async  function getCredit(id:number):Promise<RefinanceCredit>{
 const CREDITS=gql`query($id:Int!) {
  refinanceCredit(id:$id){
    nameAffiliate
    identification
    previewBalance
    typeCredit 
    interest
    idTypeCredit
  }
}`
const {data}=await getClient().query({query:CREDITS,variables:{id:Number(id)}}) 

   return data.refinanceCredit;
}


async function Page({params}:pageProps) {

   const refinaceCredit:RefinanceCredit= await getCredit(params.id)
  return (
    <>
      <FormCredit dataCredit={refinaceCredit}/>
    </>
  )
}

export default Page
