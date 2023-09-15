"use client"
import { Background, LogoModules, MenuSidebar,  SideBarModules } from "@/lib/utils/SidebarOptions";
import { useState } from "react";
import MenuParametrization from "./MenuParametrization";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SideBar(){
      
      const [toggleBar,setToggleBar]=useState(false)
      const [background,setBackground]=useState(Background.main)
      const [chooseLogoModule ,setChooseLogoModule]=useState(LogoModules.main)
      const [showParametrization,setShowParametrization]=useState<boolean>(false)
      const [select,setSelect]=useState(MenuSidebar.main)

      const route = useRouter()

   return (
      <div className={` flex flex-col flex-grow justify-between  bg-white  ${toggleBar ? "w-[110px]" :"w-[300px]"}`}>
	 <div className=" flex flex-col h-full ">
	   <div className="relative ">
	       <div className="absolute h-8 w-8 -right-6 top-10" >
		     <img src={chooseLogoModule} onClick={() =>{
			setToggleBar(!toggleBar)
		     }}/>
	       </div>
	    </div>
		     

	    <div className="flex flex-col rounded-md py-4 items-center justify-between h-full  w-full my-8">

		 		  <div className="w-full flex flex-col justify-center items-center">
		  {SideBarModules.map( (sidebar) => (
			<div key={sidebar.name} className="w-[85%] py-4 ">
			   <motion.div  className={`flex flex-col  py-5 hover:border-[#0C745B] hover:border-l-2   px-3 hover:bg-[#E0E0E0] rounded-lg ${
				 (sidebar.menu===select) && "bg-[#EEEEEE]  border-[#0C745B] border-l-2  "}
				 `} whileHover={{scale:1.05}}>
			      <div className={`gene w-full ${toggleBar && " rounded-lg"}`} onClick={ () => {
				 console.log(sidebar.background)
				 setBackground(sidebar.background)
				 setChooseLogoModule(sidebar.iconModule)
			      }}>
			   <div className="flex flex-col w-full">
			      <div className={`flex flex-row  w-full h-full 
				 ${(sidebar.menu ===MenuSidebar.parametrization && showParametrization )&& 
				 " pb-2 border-b-2  justify-center border-b-[#3C7AC2]"} 
				 ${toggleBar ?"justify-center":"justify-between"}
				 `} 
				 onClick={ () => {
				    if (sidebar.menu===MenuSidebar.parametrization){ setShowParametrization(!showParametrization)};
				    if (sidebar.menu===MenuSidebar.main){ route.push(sidebar.href)};
				    setSelect(sidebar.menu)
				    
				 }}>
				 <div className="flex flex-row">
				    <div className="h-5 w-5 ">
				       <img src={sidebar.icon}/>	
				    </div>
				    {!toggleBar &&
				    <label className="pl-6 text-sm">{sidebar.name}</label>}
				 </div>
				 {!toggleBar && sidebar.menu !== MenuSidebar.main &&
				 <div className="h-4 w-4">
				     <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none"/><g><path d="M7 10l5 5 5-5"/></g></svg>
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
		     </motion.div>
		     </div>
		     ))
		  }
		  </div>
		  <div className={` ${!toggleBar &&"hover:bg-[#195A3C]"} `}>
	   	  </div>
		  </div>
	       </div>  
	 </div> 
   );

}
