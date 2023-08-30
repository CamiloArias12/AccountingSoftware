"use client"

import { useEffect, useState } from "react";
import SplashScreen from "../components/splash";

export default  function Login (){

   const [splash,setSplash]=useState(false)
   
   const [email, setEmail]= useState<String>("")
   const [password,setPassword]= useState<String>("")

   useEffect(() =>{
      setTimeout(()=>{
	 setSplash(true)
      },3000)

   },[])

   const handleLogin= () =>{
      }
   if(splash){
   return (
	 <div className="flex  m-30 p-10 justify-center items-center bg-cover bg-img-bg md:bg-none h-screen " > 
	       <div className=" flex flex-col  justify-center rounded-[10px]  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]  p-5  bg-white sm:px-20 w-2/5 h-2/3">
		  <label className="py-3">Usuario o correo </label>
		  <input onChange={(e) => setEmail(e.target.value)} className="rounded-[12px] bor bg-[#eceded] h-10 px-2 border-2 "/> 
		  <label className="py-3">Contrasena</label>
		  <input type="password" onChange={(e) => setPassword(e.target.value)} className="rounded-[12px] bg-[#eceded] h-10 px-2 border-2 "/>   
		  <div className="flex  justify-center py-10 ">
		     <button onClick={handleLogin}className="bg-[#000] text-white  px-6 py-3 rounded-lg hover:shadow-lg w-full " >Iniciar sesion </button> 
		  </div>
	       </div>
            </div>
   );
   }else{
      return (
	 <div>
	    <SplashScreen/>
	 </div>
   );
  

   }


}
