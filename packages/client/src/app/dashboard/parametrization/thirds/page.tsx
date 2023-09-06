"use client"
import { useRouter } from "next/navigation";


function Thirds(){
   const route =useRouter()      
   return (
      <div className="flex items-center justify-center h-full">
      
	 <button onClick={ () => {route.push("/dashboard/parametrization/thirds/create")}} className="bg-[#123344] text-[#ffffff]" >Crear</button>

      </div>
   );

}


export default Thirds
