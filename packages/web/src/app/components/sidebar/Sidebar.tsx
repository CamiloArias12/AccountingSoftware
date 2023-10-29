"use client"
import { Background, MenuSidebar,  SideBarModules } from "@/lib/utils/SidebarOptions";
import { useState } from "react";
import MenuParametrization from "./MenuParametrization";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ParametrizationLogo from "../logo/Parametrization";
import HomeLogo from "../logo/Home";
import WalletLogo from "../logo/Wallet";
import MenuWallet from "./MenuWallet";
import AccountingIcon from "../logo/Accounting";
import TreasuryIcon from "../logo/Treasury";
import MenuTreasury from "./MenuTreasury";

export default function SideBar(){
      
      const [toggleBar,setToggleBar]=useState(false)
      const [showParametrization,setShowParametrization]=useState<boolean>(false)
      const [showWallet,setShowWallet]=useState<boolean>(false)
      const [showTreasury,setShowTreasury]=useState<boolean>(false)
      const [select,setSelect]=useState(MenuSidebar.main)

      const route = useRouter()

   return (
      <div className={`border-l-4 border-[#1A5DAD]  flex flex-col shadow  flex-grow justify-between bg-white  ${toggleBar ? "w-[80px]" :"w-[250px]"}`}>
	    <div className={`flex px-10 py-8 ${!toggleBar &&"border-b-2 mx-4"}`}>
	       <img src="/nameCompany.png"/>
	    </div>

	 <div className=" flex flex-col h-full ">
	   <div className="relative ">
	       <div className={`absolute h-8 w-8 -right-6 ${!toggleBar ? "-top-20":"-top-10"}`} >
		     <img src="/logo.svg" onClick={() =>{
			setToggleBar(!toggleBar)
		     }}/>
	       </div>
	    </div>

	    <div className="flex flex-col rounded-sm py-4 items-center justify-between h-full  w-full my-8">

	       <div className="w-full flex flex-col justify-center items-center">
		  {SideBarModules.map( (sidebar) => (
			<div key={sidebar.name} className="w-full   ">
			   <motion.div  className={`flex flex-col  my-5    mx-3 
				 ${(sidebar.menu ===MenuSidebar.parametrization && showParametrization )&& "bg-[#f5f6f7] rounded-lg"}
				 ${(sidebar.menu ===MenuSidebar.wallet&& showWallet)&& "bg-[#f5f6f7] rounded-lg"}
				 ${(sidebar.menu ===MenuSidebar.treasury&& showTreasury)&& "bg-[#f5f6f7] rounded-lg"}
				 `} whileHover={{scale:1.03}}>

				 <div className={`gene w-full ${toggleBar && " rounded-sm"}`} onClick={ () => {
				    }}>

				    <div className="flex  flex-col w-full">

				    <div className={` p-4 hover:border-b-2 hover:border-[#1A5DAD]
				       ${(sidebar.menu===select ) && " rounded-sm bg-[#dde0e5] "}

				    `}>
				       <div className={`flex flex-row  w-full h-full 
				    ${(sidebar.menu ===MenuSidebar.parametrization && showParametrization )&& 
				    "  justify-center "} 
				    ${toggleBar ?"justify-center":"justify-between"}
				    `} 
				    onClick={ () => {
				       if (sidebar.menu===MenuSidebar.parametrization){ setShowParametrization(!showParametrization)};
				       if (sidebar.menu===MenuSidebar.wallet){ setShowWallet(!showWallet)};
				       if (sidebar.menu===MenuSidebar.treasury){ setShowTreasury(!showTreasury)};
				       if (sidebar.menu===MenuSidebar.main){ route.push(sidebar.href)};
				       setSelect(sidebar.menu)
				    
				 }}>
				 <div className="flex flex-row">
				    <div className="h-4 w-4 ">
				       {(MenuSidebar.parametrization===sidebar.menu && sidebar.menu===select)  &&
					  <ParametrizationLogo color="#1A5DAD"/>
				       }
				       {(MenuSidebar.parametrization===sidebar.menu && sidebar.menu!==select)  &&
					  <ParametrizationLogo color="#26384b"/>
				       }		
				       {(MenuSidebar.main===sidebar.menu && sidebar.menu===select)  &&
					  <HomeLogo color="#1A5DAD"/>
				       }
				       {(MenuSidebar.main===sidebar.menu && sidebar.menu!==select)  &&
					  <HomeLogo color="#26384b"/>
				       }	
				       {(MenuSidebar.wallet===sidebar.menu && sidebar.menu===select)  &&
					  <WalletLogo color="#1A5DAD"/>
				       }
				       {(MenuSidebar.wallet===sidebar.menu && sidebar.menu!==select)  &&
					  <WalletLogo color="#26384b"/>
				       }	
				       {(MenuSidebar.accounting===sidebar.menu && sidebar.menu===select)  &&
					  <AccountingIcon color="#1A5DAD"/>
				       }
				       {(MenuSidebar.accounting===sidebar.menu && sidebar.menu!==select)  &&
					  <AccountingIcon color="#26384b"/>
				       }	
				       
				       {(MenuSidebar.treasury===sidebar.menu && sidebar.menu===select)  &&
					  <TreasuryIcon color="#1A5DAD"/>
				       }

				       {(MenuSidebar.treasury===sidebar.menu && sidebar.menu!==select)  &&
					  <TreasuryIcon color="#26384b"/>
				       }	

				    </div>
				    {!toggleBar &&
				    <label className={`pl-6 text-sm font-sans  ${sidebar.menu==select ? "text-[#1A5DAD] font-semibold":"text-[#26384b]" }`}>{sidebar.name}</label>}
				 </div>
				 {!toggleBar && sidebar.menu !== MenuSidebar.main &&
				 <div className="h-4 w-4">
				    <svg fill={`${sidebar.menu ==select ? "#1A5DAD" : "#26384B"}`}  viewBox="-6.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
				       <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
				    </svg>
				 </div>
				 }
				 </div>
				 </div>
				 {sidebar.menu ===MenuSidebar.parametrization && showParametrization &&
				 <div>
				    <div className={` ${!toggleBar && " mx-6 pl-4 border-l border-[#505050] "}`}>
				    <MenuParametrization toggleBar={toggleBar} setSelect={setSelect}/>
				    </div>
				 </div>
				 }
			      {sidebar.menu ===MenuSidebar.wallet&& showWallet&&
				    <div className={` ${!toggleBar && " mx-6 pl-4 border-l border-[#505050] "}`}>
				    <MenuWallet toggleBar={toggleBar} setSelect={setSelect}/>
				    </div>
				 }
				 {sidebar.menu ===MenuSidebar.treasury&& showTreasury&&
				    <div className={` ${!toggleBar && " mx-6 pl-4 border-l border-[#505050] "}`}>
				    <MenuTreasury toggleBar={toggleBar} setSelect={setSelect}/>
				    </div>
				 }

			      </div>
		  	  </div>
		     </motion.div>
		     </div>
		     ))
		  }
		  </div>
		  </div>
	       </div>  
	 </div> 
   );

}
