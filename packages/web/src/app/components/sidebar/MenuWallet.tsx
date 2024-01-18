'use client'
import { AddSvg } from '../logo/Add'

import { motion } from 'framer-motion'
import { MenuSidebar } from '@/lib/utils/SidebarOptions'
import { WalletSideBar } from '@/lib/utils/MenuWallet'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import ClickOutside from '../input/ClickOutSide'
import { useSession } from 'next-auth/react'

function MenuWallet({
  toggleBar,
  setSelect,
  setSelectSub,
  selectSub
}: {
  toggleBar: boolean
  setSelect: any
  setSelectSub: any
  selectSub: any
}) {
  const [showDeferred, setShowDeferred] = useState<boolean>(false)
  const {
    data: { user }
  } = useSession()

  return (
    <>
      <div className={`my-3 `}>
        {WalletSideBar.map(sidebar => (
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
                    toggleBar && 'flex flex col items-center justify-center'
                  } w-full flex flex-row`}
                >
                  <Link
                    className={`text-input flex-grow font-sans ${
                      !toggleBar ? '' : 'px-1'
                    }`}
                    key={sidebar.href}
                    href={`${sidebar.href}`}
                    onClick={() => {
                      setSelect(MenuSidebar.wallet)
                      setSelectSub(sidebar.name)
                    }}
                  >
                    <span className="flex flex-row gap-2">
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
                {!toggleBar && sidebar.name !== 'Diferidos' && (
                  <Link
                    href={
                      sidebar.name === 'Créditos'
                        ? `${sidebar.href}/create`
                        : `${sidebar.href}?create=true`
                    }
                    onClick={() => {
                      setSelect(MenuSidebar.wallet)
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
                {!toggleBar && sidebar.name === 'Diferidos' && (
                  <ClickOutside
                    onClick={() => {
                      setShowDeferred(false)
                    }}
                    className={''}
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
                      onClick={() => {
                        setSelectSub(sidebar.name)
                        setShowDeferred(!showDeferred)
                      }}
                    >
                      <AddSvg color="#ffffff" />
                    </motion.span>
                    {showDeferred && (
                      <OptionsDeferred
                        setShowDeferred={setShowDeferred}
                        showDeferred={showDeferred}
                      />
                    )}
                  </ClickOutside>
                )}
              </motion.div>
            )}
          </>
        ))}
      </div>
    </>
  )
}

export function OptionsDeferred({
  showDeferred,
  setShowDeferred
}: {
  showDeferred: boolean
  setShowDeferred: any
}) {
  return (
    <ul
      className={`ml-[-60px] flex flex-col absolute text-sm  z-10  w-[100px] flex-grow bg-white shadow-lg max-h-100 rounded-md  ring-1 ring-black ring-opacity-5 focus:outline-none

                      ${!showDeferred && 'hidden'}
		      `}
    >
      <Link
        href={'/dashboard/wallet/deferred/interest'}
        className=" flex-grow cursor-default select-none relative py-2 px-2 border-b  flex items-center hover:bg-[#f8fafb] transition"
        onClick={() => {
          setShowDeferred(false)
        }}
      >
        Intereses
      </Link>
      <Link
        href={'/dashboard/wallet/deferred/saving'}
        className=" flex-grow  cursor-default select-none relative py-2 px-2 flex items-center hover:bg-[#f8fafb] transition"
        onClick={() => {
          setShowDeferred(false)
        }}
      >
        Ahorros
      </Link>
    </ul>
  )
}

export default MenuWallet
