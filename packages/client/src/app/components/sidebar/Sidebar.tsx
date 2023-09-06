"use client"
import { Background, LogoModules, MenuSidebar,  SideBarModules } from "@/lib/utils/SidebarOptions";
import { useState } from "react";
import MenuParametrization from "./MenuParametrization";

export default function SideBar(){
      const [toggleBar,setToggleBar]=useState(true)
      const [background,setBackground]=useState(Background.main)
      const [chooseMenu ,setChooseMenu]=useState(MenuSidebar.main)
      const [chooseLogoModule ,setChooseLogoModule]=useState(LogoModules.main)

   return (
      <div className={`${background} flex flex-col h-full w-[300px]  ${toggleBar && "w-[90px]"}`}>
	 {chooseMenu !==MenuSidebar.main && !toggleBar  && 
	       <button onClick={() =>{
		  setChooseMenu(MenuSidebar.main)
		  setBackground(Background.main)
		  setChooseLogoModule(LogoModules.main)

	       }}   
	       >Regresar</button>
	    }

	   <div className="relative h-14">
	       <div className="absolute h-16 w-16 -right-10 top-4" >
		     <img src={chooseLogoModule} onClick={() =>{
			setToggleBar(!toggleBar)
			console.log(toggleBar)
		     }}/>
	       </div>
	    </div>
	    <div>
	       <div>
		  {chooseMenu===MenuSidebar.main && 
	   	   <div className={`h-8 w-8 ${!toggleBar &&"hover:bg-[#195A3C]"}  py-8 `}>
	   	     <img src="/account.svg" />
	   	   </div>
	   	   }
	   	   {chooseMenu===MenuSidebar.main && 
	   	      SideBarModules.map( (sidebar) => (
	   	      <div key={sidebar.name} className={`flex flex-col items-center ${!toggleBar &&"hover:bg-[#195A3C]"}  py-8 `}>
		  	  <button className={`${toggleBar && "hover:bg-[#937369] p-2 rounded-lg"}`} onClick={ () => {
		  	     setChooseMenu(sidebar.menu)
		  	     setBackground(sidebar.background)
		  	     setChooseLogoModule(sidebar.iconModule)
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
	       ))
	    }
	     {chooseMenu === MenuSidebar.parametrization &&
	       <MenuParametrization toggleBar={toggleBar}/>
	     }
	  </div>  
	 </div> 
      </div>
   );

}
