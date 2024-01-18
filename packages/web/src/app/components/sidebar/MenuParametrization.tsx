'use client'
import { ParametrizationSideBar } from '@/lib/utils/MenuParametrization'
import { useRouter } from 'next/navigation'
import { AddSvg } from '../logo/Add'

import { motion } from 'framer-motion'
import { MenuSidebar } from '@/lib/utils/SidebarOptions'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

function MenuParametrization({
  toggleBar,
  setSelect,
  setSelectSub,
  selectSub
}: {
  toggleBar: boolean
  setSelect: any
  setSelectSub: any
  selectSub: string
}) {
  const {
    data: { user }
  } = useSession()

  return (
    <>
      <div className={`my-3 `}>
        {ParametrizationSideBar.map(sidebar => (
          <>
            {user.rol[sidebar.permission] && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                key={sidebar.name}
                className={`border-b flex flex-row justify-betwen ${
                  !toggleBar && ' w-full h-full px-1'
                }  mx-2 my-2 py-1  ${
                  selectSub === sidebar.name &&
                  'border-b-2 pb-1 rounded-md bg-[#C7CBD1]'
                }	hover:bg-[#E1E1E1] hover:rounded-md `}
              >
                <li
                  className={`${
                    toggleBar && 'flex flex-col items-center justify-center'
                  } w-full flex flex-row`}
                >
                  <Link
                    className={`text-input flex-grow font-sans `}
                    href={`${sidebar.href}`}
                    key={sidebar.href}
                    onClick={() => {
                      setSelect(MenuSidebar.parametrization)
                      setSelectSub(sidebar.name)
                    }}
                  >
                    <span className={`flex flex-row ${!toggleBar && 'gap-2'}`}>
                      <Image src={sidebar.icon} height={16} width={16} alt="" />
                      {!toggleBar && (
                        <span
                          className={`text-[14px] ${
                            selectSub === sidebar.name && ' font-semibold'
                          }`}
                        >
                          {sidebar.name}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
                {!toggleBar && (
                  <Link
                    href={
                      sidebar.name === 'Terceros'
                        ? `${sidebar.href}/create`
                        : `${sidebar.href}?create=true`
                    }
                    onClick={() => {
                      setSelect(MenuSidebar.parametrization)
                      setSelectSub(sidebar.name)
                    }}
                  >
                    <motion.span
                      className="  flex items-center justify center h-6 w-6 rounded-[50%] bg-[#10417B] hover:bg-[#000000] p-1"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: [0, 0.71, 0.2, 1.01]
                      }}
                    >
                      <AddSvg color="#ffffff" />
                    </motion.span>
                  </Link>
                )}
              </motion.div>
            )}
          </>
        ))}
      </div>
    </>
  )
}

export default MenuParametrization
