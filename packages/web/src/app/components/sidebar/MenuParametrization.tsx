"use client"
import { ParametrizationSideBar } from "@/lib/utils/MenuParametrization"
import { useRouter } from "next/navigation";
import { AddSvg } from "../logo/Add";

import { motion } from "framer-motion";
import { MenuSidebar } from "@/lib/utils/SidebarOptions";
import { useState } from "react";
import Modal from "../modal/Modal";

function MenuParametrization({ toggleBar,setSelect }: { toggleBar: boolean,setSelect:any }) {

	const router = useRouter()
	return (
	       <>
		<div className={`my-3  `}>
			{ParametrizationSideBar.map((sidebar) => (
			   <motion.div whileHover={{scale:1.1}} key={sidebar.name} className={`w-full flex flex-row justify-betwen ${!toggleBar && " hover:pb-1 hover:border-b-[1px]"}  my-5 `}>
				 <div className={`${toggleBar && "flex flex col items-center justify-center"} w-full flex flex-row`} onClick={() => {
						setSelect(MenuSidebar.parametrization)
						router.push(sidebar.href)
					}}>
						<motion.div  whileHover={{scale:2}} className={`h-4 w-4
      
						${toggleBar && "h-8 w-8 p-2"} ` }>
							<img src={sidebar.icon} />
						</motion.div>
						{!toggleBar &&
							<label className=" font-sans text-[13px] pl-2">{sidebar.name}</label>
						}
					</div>
					{!toggleBar &&
						<motion.div   
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{duration: 0.5, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
						className="  flex items-center justify center h-6 w-6 rounded-[50%] bg-[#10417B] p-1" onClick={ () => {
						      console.log("Heelloo")

						      setSelect(MenuSidebar.parametrization)
						      if(sidebar.name==='Terceros'){
							 router.push(`${sidebar.href}/create`)
							 }else{
							    
							 router.push(`${sidebar.href}?create=true`)

							 }}

						}>
							<AddSvg color="#ffffff" />
						</motion.div>

					}
				</motion.div>
			))}
					</div>

	    </>

	);

}

export default MenuParametrization