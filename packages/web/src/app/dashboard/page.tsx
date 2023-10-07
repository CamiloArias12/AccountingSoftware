"use client"

import { Suspense, useEffect, useState } from "react";
import './page.css'
import SideBar from "../components/sidebar/Sidebar";
import CountChart from "../components/chart/count";
import { ChartLine } from "../components/chart/Multiaxis";
import { BarChart } from "../components/chart/VerticalChart";
import { Charm } from "next/font/google";
import { Chart } from "../components/chart/Chart";
import SplashScreen from "../components/splash/Splash";
export default  function Dashboard (){

   return (
   <Suspense fallback ={<SplashScreen />}>
      <div className=" m-4 flex-grow flex flex-col">
	 <div className=" flex flex-row ">
	    <CountChart value={21834} title="Afiliados" background="bg-[#147898]"/>
	    <CountChart value={921834} title="Creditos" background="bg-[#9C4124]"/>
	    <CountChart value={21834} title="Ahorros" background="bg-[#7D9B29]"/>
	    <CountChart value={21834} title="Ingresos" background="bg-[#249C5C]"/>
	    <CountChart value={1234.1232} title="Egresos" background="bg-[#CB7F49]"/>
	 </div>
	 <div className=" mt-4 flex-grow grid grid-cols-2 grid-rows-2 gap-4">
	    <div className="bg-white">
	       <Chart/>	       
	    </div>
	    <div className="bg-white">
		  <ChartLine/>
	    </div>
	    <div className="bg-white">
	       <BarChart/>	       
	    </div>
	    <div className="bg-white"></div>
	 </div>
      </div>
   </Suspense>
      );
  


}
