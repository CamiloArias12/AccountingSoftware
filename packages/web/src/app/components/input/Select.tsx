import { useState } from "react"
import Logo from "../logo/Logo";

type SelectProps = {
    label: string;
    options: any;
    onClick:any
    setValue:any
    index:number
};

function Select ({label,options,onClick ,setValue,index}:SelectProps){
   const [toggle,setToggle]=useState<boolean>(false)
   const [valueLabel,setValueLabel]=useState("")
   return (
   < div className="flex flex-col relative">
   {label &&
      <label className="text-sm pb-2">{label}</label>
   }
      <input className={`mb-1 text-sm border border-gray-300 "type="text p-2`} value={`${valueLabel}`}   onClick={() =>{setToggle(!toggle)
	 console.log(toggle)
	 if(toggle===false){
	    console.log(onClick())
	 }
      }}/>
	 <div className={`flex flex-grow  ${(!toggle)&& "hidden"}`}>
	       <ul className=" flex absolute w-full z-10  flex-grow bg-white shadow-lg max-h-100 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
		  <div className="flex-grow  flex flex-col max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll">
		  {(toggle && options) ?
		     options.map((option:any) =>(
			   <li  key={option.typeAccount.code} className=" flex-grow text-gray-900 cursor-default select-none relative py-3  flex items-center hover:bg-[#f8fafb] transition" 
				 onClick={() =>{
				 setValue(index,option.typeAccount.code)
				 setValueLabel(`${option.typeAccount.code}  ${option.typeAccount.name}`)
				 setToggle(!toggle)
				 				 }}>
			  	 <span className="font-normal truncate mr-4">{option.typeAccount.code}</span>
			  	 <span className="font-normal truncate">{option.typeAccount.name}</span>
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


export default Select
