"use client"
import { Background, LogoModules, MenuSidebar,  SideBarModules } from "@/lib/utils/SidebarOptions";
import { useState } from "react";
import MenuParametrization from "./MenuParametrization";
import { useRouter } from "next/navigation";

export default function SideBar(){
      
      const [toggleBar,setToggleBar]=useState(true)
      const [background,setBackground]=useState(Background.main)
      const [chooseLogoModule ,setChooseLogoModule]=useState(LogoModules.main)
      const [showParametrization,setShowParametrization]=useState<boolean>(false)

      const route = useRouter()

   return (
      <div className={`${background}  h-full w-[280px] shadow  border-l-8 border-r-2  border-l-[#0C745B] ml-4 ${toggleBar && "w-[80px]"}`}>
	 <div className=" flex flex-col mx-1 h-full">
	   <div className="relative h-[90px]">
	       <div className="absolute h-8 w-8 -right-6 top-10" >
		     <img src={chooseLogoModule} onClick={() =>{
			setToggleBar(!toggleBar)
		     }}/>
	       </div>
	    </div>
	    <div className="flex flex-col rounded-md py-4 items-center h-full  justify-between my-8">
		   <div>
	   	     <img className="h-8 w-8" src="/account.svg" />
	   	   </div>
		   <div className={`${!toggleBar && "w-full"} px-2`}>
	   	      {SideBarModules.map( (sidebar) => (
			<div key={sidebar.name} className="py-4">
			   <div className={`flex flex-col  bg-[#F0F0F0] py-5 px-3  hover:bg-[#E0E0E0] rounded-lg  `}>
			      <div className={` ${toggleBar && " rounded-lg"}`} onClick={ () => {
				 setBackground(sidebar.background)
				 setChooseLogoModule(sidebar.iconModule)
				 if (sidebar.menu===MenuSidebar.parametrization){ setShowParametrization(!showParametrization)}
				 if(showParametrization){
				    setBackground(Background.main)
				    setChooseLogoModule(LogoModules.main)
				 }
				 //route.push(sidebar.href)
			      }}>
			   <div className="flex flex-col">
			      <div className="flex flex-row  justify-between">
				 <div className="flex flex-row">
				    <div className="h-5 w-5 ">
				       <img src={sidebar.icon}/>	
				    </div>
				    {!toggleBar &&
				    <label className="pl-2 text-sm">{sidebar.name}</label>}
				 </div>
				 {!toggleBar &&
				 <div className="h-5 w-5">
				     <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none"/><g><path d="M7 10l5 5 5-5"/></g></svg>
				 </div>
				 }
				 </div>
				 {sidebar.menu ===MenuSidebar.parametrization && showParametrization &&
				 <div>
				    <MenuParametrization toggleBar={toggleBar}/>
				 </div>
				 }
			      </div>
		  	  </div>
		     </div>
		     </div>
		     ))
		  }
		  </div>
		  <div className={` ${!toggleBar &&"hover:bg-[#195A3C]"} `}>
	   	     <img className="h-5 w-5" src="/logOut.svg" />
	   	  </div>
	       </div>  
	    </div>  
	 </div> 
   );

}
