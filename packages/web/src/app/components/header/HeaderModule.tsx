'use client'
import { Modules } from '@/lib/utils/SidebarOptions'
import { useSession, getCsrfToken, signOut } from 'next-auth/react'
import Link from 'next/link'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ClickOutside from '../input/ClickOutSide'

function HeaderModule() {
  const pathname = usePathname()
  const [path, setPath] = useState('')
  const {
    data: { user }
  } = useSession()

  const [show, setShow] = useState(false)
  useEffect(() => {
    for (const key in Modules) {
      if (pathname.includes(key)) {
        setPath(Modules[key])
      }
    }
  }, [pathname])

  return (
    <>
      <div
        className={`flex-grow flex flex-row  items-end rounded-lg  border-b-3   py-2`}
      >
        <h1 className="ml-2 text-lg text-gray-600 font-semibold"> {path}</h1>
      </div>
      <ClickOutside
        onClick={() => {
          setShow(false)
        }}
        className="flex flex-end justify-end flex-col relative text-input"
      >
        <button
          className=" flex flex-row items-end gap-1  p-2"
          onClick={() => {
            setShow(!show)
          }}
        >
          <div className="flex flex-col items-end">
            <span className="flex-grow text-xs font-semibold">{user.name}</span>
            <span className="flex-grow text-xs font-light ">
              {user.rol_name}
            </span>
          </div>

          <img height={40} width={40} src="/account.svg" />
        </button>
        {show && <OptionsUser setShow={setShow} show={show} />}
      </ClickOutside>
    </>
  )
}
function OptionsUser({ show, setShow }: { show: boolean; setShow: any }) {
  const {
    data: { user },
    update
  } = useSession()
  const route = useRouter()
  return (
    <div
      className={`flex flex-grow  ${
        !show && 'hidden'
      } text-input cursor-pointer`}
    >
      <ul className=" -ml-24 flex absolute  z-10 w-[200px] py-4 px-2 flex-grow bg-white shadow-md rounded-2xl justify-center gap-2  flex-col ring-1 ring-black ring-opacity-5 focus:outline-none">
        <li className="flex flex-col items-center justify-center pb-2 ">
          <span className="font-semibold">{`${user.name} ${user.lastName}`}</span>
          <span>{user.email}</span>
        </li>
        <li className="  flex flex-col justify-center items-center  select-none relative pb-2 border-b   gap-2">
          {user.roles.map((rol: any, index: number) => (
            <li
              className={` w-[120px] shadow-sm  p-1 text-center font-semibold bg-[#F2F5FA] ${
                rol.name === user.rol_name && 'border-b-green-200 border-b-4'
              } `}
              onClick={async () => {
                if (user?.rol_id !== rol.id) {
                  await update({
                    ...user,
                    rol: rol,
                    rol_name: rol.name,
                    rol_id: rol.id
                  })
                  window.location.assign('/auth/login')
                }
              }}
            >
              {` ${rol.name}`}
            </li>
          ))}
        </li>

        {user.rol['roles'] && (
          <Link
            href={'/dashboard/roles'}
            className=" flex-grow  flex-col select-none relative py-2 px-2   flex  hover:bg-[#F2F5FA]  transition cursor-pointer"
          >
            Roles
          </Link>
        )}
        <li
          className=" flex-grow  flex-col  select-none relative py-2 px-2   flex  hover:bg-[#F2F5FA]  transition cursor-pointer"
          onClick={() => {
            signOut({ callbackUrl: '/auth/login' })
          }}
        >
          <span>Cerrar sesion</span>
        </li>
      </ul>
    </div>
  )
}

export default HeaderModule
