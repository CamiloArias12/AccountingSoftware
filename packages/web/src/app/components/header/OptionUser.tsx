'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import ClickOutside from '../input/ClickOutSide'
import { change, changeOut } from '@/lib/redux/slice'

export function OptionsUser({}: {}) {
  const { data, update } = useSession()
  //@ts-ignore
  const value = useSelector(state => state.value)
  const dispatch = useDispatch()
  console.log('Value', value)
  if (!data) {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <>
      {value && (
        <>
          <ClickOutside
            onClick={() => {
              dispatch(changeOut())
            }}
            className="absolute top-16 md:top-20 p-4 gap-4  mx-1 md:mx-3 right-0 z-50 flex-grow bg-white shadow-xl w-[250px] max-h-200 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="flex flex-col items-center  gap-2 justify-center pb-2 ">
              <span className="font-semibold">{`${data?.user.name} ${data?.user.lastName}`}</span>
              <span>{data?.user.email}</span>
            </div>
            <div className="  flex flex-col justify-center items-center  select-none relative pb-2 border-b   gap-2">
              {data?.user.roles.map((rol: any, index: number) => (
                <div
                  className={` cursor-pointer hover:border-b-4 hover:border-red-600 w-[120px] shadow-sm  p-1 text-center font-semibold bg-[#F2F5FA] ${
                    rol.name === data?.user.rol_name &&
                    'border-b-green-200 border-b-4'
                  } `}
                  onClick={async () => {
                    if (data?.user?.rol_id !== rol.id) {
                      await update({
                        ...data.user,
                        rol: rol,
                        rol_name: rol.name,
                        rol_id: rol.id
                      })
                      window.location.assign('/auth/login')
                    }
                  }}
                >
                  {` ${rol.name}`}
                </div>
              ))}
            </div>

            {data.user.rol['roles'] && (
              <Link
                href={'/dashboard/roles'}
                className=" flex-grow  flex-col select-none relative py-2 px-2   flex  hover:bg-[#F2F5FA]  transition cursor-pointer"
                onClick={() => {
                  dispatch(change())
                }}
              >
                Roles
              </Link>
            )}
            <div
              className=" flex-grow  flex-col  select-none relative py-2 px-2   flex  hover:bg-[#F2F5FA]  transition cursor-pointer"
              onClick={() => {
                signOut({ callbackUrl: '/auth/login' })
              }}
            >
              <span>Cerrar sesión</span>
            </div>
          </ClickOutside>
        </>
      )}
    </>
  )
}
