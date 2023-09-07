"use client"

import { useEffect, useState } from "react";
import './page.css'
import SplashScreen from "../components/splash/Splash";

export default  function Login (){

   const [splash,setSplash]=useState(false)
   const [email, setEmail]= useState<String>("")
   const [password,setPassword]= useState<String>("")

   useEffect(() =>{
      setTimeout(()=>{
	 setSplash(true)
      },3200)

   },[])

   const handleLogin= () =>{
      }
   if(splash){
   return (
   
	 <div className="background flex  p-10 justify-center items-center bg-cover md:bg-none h-screen w-screen " > 
	       <div className=" flex flex-col justify-center bg-white p-10  rounded-[10px] shadow border border-white w-4/5 lg:w-1/3 ">
		  <div className="flex justify-center items-center py-8">
		     <img src="logo.svg" className="w-[100px] h-[100px]"/>
		  </div>
		  <div className="flex items-center justify-center">
		     <div className="flex flex-col md:w-4/5">
			<div className="flex flex-col w-full justify-center pt-10">
			   <label className="pb-3 text-[#636363]">Usuario o correo </label>
			   <input onChange={(e) => setEmail(e.target.value)} className=" bg-neutral-100 rounded-[10px] border border-white h-[55px]"/> 
			</div>
			<div className="flex flex-col w-full justify-center py-10">
			   <label className="pb-3 text-[#636363]">Contrasena</label>
			   <input type="password" onChange={(e) => setPassword(e.target.value)} className="bg-neutral-100 rounded-[10px] border border-white h-[55px] "/>   
			</div>
			<div className="flex justify-center py-10 ">
			   <button onClick={handleLogin}className="bg-[#0C745B] text-white h-[59px]  rounded-lg hover:shadow-lg w-full " >Iniciar sesion </button> 
			</div>
		     </div>
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
