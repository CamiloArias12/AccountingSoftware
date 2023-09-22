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
      },3200)
   },[])

   if(data){
     route.push("/dashboard") 
   }

   const handleLogin= () =>{
	 auth({variables:{username:email,password:password}})
      }
   if(splash){

   return (
      <div className="flex flex-row h-screen w-screen">
	 <div className="  flex p-10  flex-col flex-grow w-[500px] items-center   " > 
		  <div className="flex justify-center items-center py-8">
		     <img src="logoName.png" className="w-[170px] h-[80px]"/>
		  </div>

		  <div className=" flex  flex-grow flex-col   w-full m-8 justify-center  ">
			<div className="flex flex-col w-full justify-center pt-10">
			   <label className="pb-3" >Usuario o correo </label>
			   <input onChange={(e) => setEmail(e.target.value)} className=" bg-neutral-100 rounded-[10px] border border-white h-[55px]"/> 
			</div>
			<div className="flex flex-col w-full justify-center py-10">
			   <label className="pb-3 ">Contrasena</label>
			   <input type="password" onChange={(e) => setPassword(e.target.value)} className="bg-neutral-100 rounded-[10px] border border-white h-[55px] "/>   
			</div>
			{error &&
			   <label className="text-[#FF0000]">Datos incorrectos</label>
			}	
			<div className="flex justify-center py-10 ">
			   <button onClick={handleLogin}className="bg-[#1A5DAD] text-white h-[59px]  rounded-lg hover:shadow-lg w-full " >Iniciar sesion </button> 
			</div>
	       </div>
	    </div>

	    <div className="flex w-2/3 flex-grow  bg-img-bg bg-cover h-screen">
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
