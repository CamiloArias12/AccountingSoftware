import HeaderModule from '../components/header/HeaderModule'
import { getServerSession } from 'next-auth/next'
import SideBar from '../components/sidebar/Sidebar'
import { redirect, useRouter } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  console.log('Other', session)
  if (!session) {
    redirect('/auth/login')
  }
  return (
    <div className="flex flex-row h-screen  ">
      <div className="flex pl-1 ">
        <SideBar />
      </div>
      <div className="flex  flex-col flex-grow ">
        <div className="  flex flex-row mx-6 my-2 h-16 border-b-2 border-[#10417B] ">
          <HeaderModule />
        </div>
        <section className=" flex flex-grow my-6 mx-4 h-[80%]">
          {children}
        </section>
      </div>
    </div>
  )
}
