
"use client"

import ListChange from "@/app/components/list-change/ListChange"
import { Affiliate, Company} from "@/lib/utils/thirds/types"
import { useState } from "react"
import { ThirdsType } from "@/lib/utils/thirds/OptionsThirds"
import TableThirds from "@/app/components/forms/thirds/TableThirds"
import TableCompany from "@/app/components/forms/thirds/TableCompany"


export const revalidate=0

function Thirds ( {affiliates,companies}:{affiliates:Affiliate[],companies:Company[]}){
   const [index,setIndex]=useState(1)
 



   return (

      <div className="flex flex-col flex-grow mx-4 ">
	 <ListChange indexForm={index} setIndexForm={setIndex} list={ThirdsType} color="bg-[#3C7AC2]"/>
	    
	 {index===1 &&
	    <TableThirds affiliates={affiliates}/>
	 }
	 {index===2 &&
	    <TableCompany companies={companies}/>
	 }

	 </div>
   )

}



export default Thirds
