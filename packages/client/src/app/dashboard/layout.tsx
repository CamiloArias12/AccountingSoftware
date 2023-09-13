import HeaderModule from "../components/header/HeaderModule"
import SideBar from "../components/sidebar/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-screen w-screen  bg-[#EFEFEF]">
	 <div className=" bg-white  flex flex-row h-14 shadow ">
	    <img src="/name.svg"/>
	    <HeaderModule colorBorder="border-[#006AE7]" title="TERCEROS"/>
	    <div className=" flex flex-row items-center">
	       <img className="h-8 w-8" src="/account.svg"/>
	       <label className="flex-grow text-xs">Juan Arias</label>
	    </div>
	 </div>
	<div className="flex-grow flex flex-row">  
	    
	    <div className="flex pr-4">
	       <SideBar/>
	    </div>
	    <div className="flex flex-grow">
	       {children}
	    </div>
	 </div>
      </div>
  )
}
