import SideBar from "../components/sidebar/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="flex-none">
	 <SideBar/>
      </div>
      <section className="flex-grow">
	 {children}
      </section>
    </div>
  )
}
