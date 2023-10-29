"use client"

import { useEffect, useState } from "react";
import SplashScreen from "../components/splash/Splash";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const AUTH = gql`
   mutation authUser($username:String!,$password:String!){
	authUser(username:$username,password:$password){
	    token
  }  	
}	
`
export default  function Login (){

   const [splash,setSplash]=useState(false)
   const [email, setEmail]= useState<String>("")
   const [password,setPassword]= useState<String>("")
   const route = useRouter()
   const [auth,{data,loading,error}]=useMutation(AUTH)
   useEffect(() =>{
      setTimeout(()=>{
	 setSplash(true)
      },2000)
   },[])

   if(data){
     route.push("/dashboard") 
   }

   const handleLogin= () =>{
	 auth({variables:{username:email,password:password}})
      }
   if(splash){

   return (
      <div className="flex flex-row h-screen w-screen  items-center justify-centerr bg-white">
	 <div className=" bg-cover flex flex-grow h-screen  bg-img-bg "></div>
	 <div className="   flex p-10 md:max-w-[400px] lg:max-w-[600px] flex-col items-center justify-center  items-center" > 
		  <div className="flex flex-row  justify-center items-center pt-8 pb-14 px-10 ">
		     <img  className=" h-20 pr-10" src="/foncaster.png"/> 
		     <img className="h-20 border-l border-black pl-10  "  src="/logoName.png"/> 
		  </div>

		  <div className=" flex   flex-col   w-full m-8 justify-center  ">
			<div className="flex flex-col  justify-center pt-10">
			   <label className="pb-3 font-bold text-[#1A5DAD] " >Usuario / correo </label>
			   <input onChange={(e) => setEmail(e.target.value)} className=" bg-[#DEE2E9]  rounded-[10px] border border-white p-2 "/> 
			</div>
			<div className="flex flex-col w-full justify-center py-10">
			   <label className="pb-3 font-bold text-[#1A5DAD] ">Contrasena</label>
			   <input type="password" onChange={(e) => setPassword(e.target.value)} className="bg-[#DEE2E9] rounded-[10px] border border-white p-2 "/>   
			</div>
			{error &&
			   <label className="text-[#FF0000]">Datos incorrectos</label>
			}	
			<div className="flex justify-center py-10 ">
			   <button onClick={handleLogin}className="bg-[#1A5DAD] text-white h-[59px]  rounded-lg hover:shadow-lg w-full " >Iniciar sesion </button> 
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
