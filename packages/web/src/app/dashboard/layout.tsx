import HeaderModule from '../components/header/HeaderModule'
import { getServerSession } from 'next-auth/next'
import SideBar from '../components/sidebar/Sidebar'
import { OptionsUser } from '../components/header/OptionUser'
import authOptions from '../api/auth/[...nextauth]/options'

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if (!session) return <SideBar />
  return (
    <div className="flex flex-row h-screen w-screen md:bg-[#f5f5fb] bg-white ">
      <div className="flex md:pl-1 ">
        <SideBar />
      </div>
      <div className="flex  flex-col w-full md:overflow-hidden  h-full   ">
        <HeaderModule />
        <section className="mt-20 md:my-4 flex  md:mx-2  principal-container lg:h-[90%] md:max-w-full md:overflow-hidden ">
          {' '}
          {children}
          <OptionsUser />
        </section>
      </div>
    </div>
  )
}
