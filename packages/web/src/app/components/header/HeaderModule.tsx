'use client'
import { Modules, ModulesMobile } from '@/lib/utils/SidebarOptions'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { change } from '@/lib/redux/slice'

function HeaderModule() {
  const pathname = usePathname()
  const [path, setPath] = useState('')
  const [pathMobile, setPathMobile] = useState('')
  const data = useSession()
  //@ts-ignore
  const value = useSelector(state => state.value)
  const dispatch = useDispatch()

  if (!data) {
    signIn()
  }
  useEffect(() => {
    if (data?.data?.user?.exit) {
      signOut({ callbackUrl: '/auth/login' }) // Force sign in to hopefully resolve error
    }
  }, [data])
  const [show, setShow] = useState(false)
  useEffect(() => {
    for (const key in Modules) {
      if (pathname.includes(key)) {
        setPath(Modules[key])
      }
    }
    for (const key in ModulesMobile) {
      if (pathname.includes(key)) {
        setPathMobile(ModulesMobile[key])
      }
    }
  }, [pathname, pathMobile])

  if (!data.data) return
  return (
    <div className="fixed md:sticky bg-[#10417B] md:bg-transparent md:z-0  z-[2] w-full lg:my-2 h-14 md:h-16 border-b  md:border-b-2 border-[#10417B]">
      <div className="flex flex-row w-full h-full items-end">
        <div
          className={`flex-grow flex flex-row  items-end rounded-lg  border-b-3   py-2`}
        >
          <h1 className="hidden md:block  md:ml-6 text-xl text-white md:text-black font-semibold">
            {' '}
            {path}
          </h1>
          <h1 className="  md:hidden ml-14 md:ml-2 text-lg md:text-lg text-white font-medium">
            {' '}
            {pathMobile}
          </h1>
        </div>
        <div className="flex flex-end justify-end flex-col text-input">
          <button
            className=" flex flex-row items-end gap-1  p-2"
            onClick={() => {
              console.log(dispatch(change()))
            }}
          >
            <div className="hidden md:flex flex-col items-end">
              <span className="flex-grow text-xs font-semibold">
                {data?.data?.user.name}
              </span>
              <span className="flex-grow text-xs font-light ">
                {data?.data?.user.rol_name}
              </span>
            </div>

            <img
              className="hidden md:block md:h-10  md:w-10"
              src="/account.svg"
            />
            <img
              className="block md:hidden h-8 w-8 "
              src="/account-mobile.svg"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeaderModule
