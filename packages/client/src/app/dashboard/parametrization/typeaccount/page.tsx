"use client"

import { useRouter } from "next/navigation";

function TypeAccount(){
   const route = useRouter() 
   return (
      <div>

	 <button onClick={ () => {route.push("/dashboard/parametrization/typeaccount/create")}} className="bg-[#123344] text-[#ffffff]" >Crear</button>
      </div>
   );

}


export default TypeAccount
