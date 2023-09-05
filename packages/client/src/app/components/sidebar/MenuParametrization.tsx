import { ParametrizationSideBar } from "@/lib/utils/MenuParametrization"
import Link from "next/link";
import { useRouter } from "next/navigation";

function MenuParametrization({toggleBar}:{toggleBar:boolean}){

  const router=useRouter() 
   return (
	<div>
	       <div>
	   	     { ParametrizationSideBar.map( (sidebar) => (
	   	      <div key={sidebar.name} className={`flex flex-col items-center ${!toggleBar &&"hover:bg-[#052F47]"}  py-8 `}>
		  	  <button  className={`${toggleBar && "hover:bg-[#937369] p-2 rounded-lg"}`} onClick={ () => {
				 router.push(sidebar.href,)
		  	     }}>
		  	  <div className="flex flex-row ">
		  	     <div className="h-8 w-8 ">
		  		<img src={sidebar.icon}/>	
		  	     </div>
		  	     {!toggleBar &&
		  	     <label className="px-5 text-white">{sidebar.name}</label>}
		  	  </div>
		  	  </button>
		     </div>
	       ))}
	  </div>  
	 </div>  

   );

}

export default MenuParametrization
