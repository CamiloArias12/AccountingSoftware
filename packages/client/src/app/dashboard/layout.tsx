import SideBar from "../components/sidebar/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-row h-screen">
      <div>
	 <SideBar/>
      </div>
      <section>
	 {children}
      </section>
    </div>
  )
}
