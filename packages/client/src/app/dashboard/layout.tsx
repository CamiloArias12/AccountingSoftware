import SideBar from "../components/sidebar/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-row h-screen w-screen bg-[#F9F9F9]">
      <div className="flex-none">
	 <SideBar/>
      </div>
      <section className="flex-grow mx-8  bg-[#ffffff] shadow rounded-md">
	 {children}
      </section>
    </div>
  )
}
