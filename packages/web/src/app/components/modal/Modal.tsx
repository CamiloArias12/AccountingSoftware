"use client"
import { motion} from "framer-motion";
import Button from "../input/Button";

interface ModalProps {
   title:string
   children: React.ReactNode
   size:string
   onClick:any
}

function Modal ({title,children,onClick,size}:ModalProps) {
     return (
     <div className="fixed inset-0  w-screen flex items-center justify-center z-50">
      <div className={`bg-white flex flex-col rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ${size} p-6`}>
	       <div className="flex  items-center justify-between border-b border-[#BABBBB] p-4">
		  <div>
		  <label className="font-sans text-lg" >{title}</label>
		  </div>
		  <div className="h-8 w-8 ">
		     <motion.img whileHover={{scale:1.5}} src="/close.svg" onClick={onClick}/>
		  </div>
	       </div>
	       <div className="flex-grow max-h-[90%]">
		  {children}
	       </div>
	    </div>
	  </div>
     ); 
}


export default Modal
