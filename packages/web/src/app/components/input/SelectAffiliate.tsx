import { useState } from "react"
import Logo from "../logo/Logo";

type SelectProps = {
    label?: string;
    options: any;
    onClick?:any
    setValue:any
    value?:any
    name:string
    direction?:boolean
};

function SelectAffiliate ({label,options,setValue,value,name,direction}:SelectProps){
   const [toggle,setToggle]=useState<boolean>(false)
   return (
   < div className={`flex flex-grow pr-2  ${direction && "pr-2"} ${direction ? "flex-row ":" flex-col " } relative`}>
   {label &&
      <label className="text-input pb-2">{label}</label>
   }
      <input className={`mb-1 text-input border border-gray-300 "type="text h-[30px]`} value={value}   onClick={() =>{setToggle(!toggle)
	 console.log(toggle)
      }}/>
	 <div className={`flex flex-grow  ${(!toggle)&& "hidden"}`}>
	       <ul className=" flex absolute w-full z-10  flex-grow bg-white shadow-lg max-h-100 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
		  <div className="flex-grow  flex flex-col max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll">
		  {(toggle && options) ?
		     options.map((option:any,index:number) =>(
			   <li  key={index} className=" flex-grow text-gray-900 cursor-default select-none relative py-3  flex items-center hover:bg-[#f8fafb] transition" 
				 onClick={() =>{
				    setToggle(!toggle)
				    if(option.user){
				       setValue(name,option.user.identification)
				       setValue("nameAffiliate",`${option.user.name} ${option.user.lastName}`)
				    }
				    if(option.id){
				       
				       setValue(name,option.name)
					  setValue("interest",option.interest)
					  if(name==="typeSaving"){
					     setValue("idTypeSaving",option.id)
					  }else{
					     setValue("idTypeCredit",option.id)
					  }
				    }
				 }}>
				 {option.user &&
				 <>
				    <span className="font-normal truncate mr-4">{option.user.identification}</span>
				    <span className="font-normal truncate">{`${option.user.name}  ${option.user.lastName}`}</span>
				 </>
				 }
				 {option.id &&
				 <>
				    <span className="font-normal truncate">{`${option.name}`}</span>
				 </>
				 }

			   </li>
		     	))
		     :

		     <div className="flex items-center justify-center"> 
		     <div className="flex h-10 w-10 items-center justify-center"> <Logo /></div>
		     </div>
		     }
	       </div>
	    </ul>
      </div>
   </div>
   )

}


export default SelectAffiliate
