import HeaderModule from '../components/header/HeaderModule';
import SideBar from '../components/sidebar/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-screen  ">
      <div className="flex  px-4">
        <SideBar />
      </div>
      <div className="flex  flex-col flex-grow mr-4">
        <div className=" mr-4 flex flex-row h-16 border-b border-[#BABBBB] ">
          <HeaderModule colorBorder="border-[#006AE7] " title="TERCEROS" />
          <div className=" flex flex-row items-center">
            <img className="h-8 w-8" src="/account.svg" />
            <label className="flex-grow text-xs">Juan Arias</label>
          </div>
        </div>
        <section className=" flex flex-grow my-6 mx-4 h-[80%]">
          {children}
        </section>
      </div>
    </div>
  );
}
