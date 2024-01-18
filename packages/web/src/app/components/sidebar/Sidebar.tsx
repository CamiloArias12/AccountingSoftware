'use client'
import {
  MenuSidebar,
  Modules,
  SideBarModules
} from '@/lib/utils/SidebarOptions'
import { useEffect, useState } from 'react'
import MenuParametrization from './MenuParametrization'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import ParametrizationLogo from '../logo/Parametrization'
import HomeLogo from '../logo/Home'
import WalletLogo from '../logo/Wallet'
import MenuWallet from './MenuWallet'
import AccountingIcon from '../logo/Accounting'
import TreasuryIcon from '../logo/Treasury'
import MenuTreasury from './MenuTreasury'
import MenuAccounting from './MenuAccounting'

export default function SideBar() {
  const [toggleBar, setToggleBar] = useState(false)
  const [showParametrization, setShowParametrization] = useState<boolean>(false)
  const [showWallet, setShowWallet] = useState<boolean>(false)
  const [showTreasury, setShowTreasury] = useState<boolean>(false)
  const [showAccounting, setShowAccounting] = useState<boolean>(false)
  const [select, setSelect] = useState('')
  const [selectSub, setSelectSub] = useState('')

  const pathname = usePathname()
  const route = useRouter()

  useEffect(() => {
    SideBarModules.map(module => {
      if (pathname.includes(module.href)) {
        setSelect(module.menu)

        if (module.menu === MenuSidebar.main) {
          setSelectSub('')
          setSelect(module.menu)
        }
        if (module.menu === MenuSidebar.treasury) {
          setShowTreasury(true)
        }
        if (module.menu === MenuSidebar.parametrization) {
          setShowParametrization(true)
        }
        if (module.menu === MenuSidebar.accounting) {
          setShowAccounting(true)
        }
        if (module.menu === MenuSidebar.wallet) {
          setShowWallet(true)
        }
      }
    })
    for (const key in Modules) {
      if (pathname.includes(key)) {
        setSelectSub(Modules[key])
      }
    }
  }, [])

  return (
    <div
      className={`border-l-[8px] border-[#1A5DAD]  flex flex-col shadow  flex-grow  bg-white  ${
        toggleBar ? 'w-[80px]' : 'w-[250px]'
      }`}
    >
      <div className={`flex px-10 py-8 ${!toggleBar && 'border-b-2 mx-4'}`}>
        <img src="/nameCompany.png" />
      </div>

      <div className="relative ">
        <div
          className={`absolute h-8 w-8 -right-4 ${
            !toggleBar ? '-top-10' : 'top-0'
          }`}
        >
          <img
            src="/logo.svg"
            onClick={() => {
              setToggleBar(!toggleBar)
            }}
          />
        </div>
      </div>

      <div className="overscroll-x-none pb-2 flex flex-col  rounded-sm overflow-y-scroll overflow-x-hidden  items-center justify-between   w-full my-8 ">
        <div className="w-full flex flex-col justify-center gap-6 items-center">
          {SideBarModules.map(sidebar => (
            <div key={sidebar.name} className="w-full   ">
              <motion.div
                className={`flex flex-col     mx-3 
				 ${
           sidebar.menu === MenuSidebar.parametrization &&
           showParametrization &&
           'bg-[#f5f6f7] rounded-lg '
         }
				 ${
           sidebar.menu === MenuSidebar.wallet &&
           showWallet &&
           'bg-[#f5f6f7] rounded-lg'
         }
				 ${
           sidebar.menu === MenuSidebar.treasury &&
           showTreasury &&
           'bg-[#f5f6f7] rounded-lg'
         }
${
  sidebar.menu === MenuSidebar.accounting &&
  showAccounting &&
  'bg-[#f5f6f7] rounded-lg'
}


 ${
   sidebar.menu === MenuSidebar.main &&
   showTreasury &&
   'bg-[#f5f6f7] rounded-lg'
 }

 ${sidebar.menu === select && 'shadow-lg'}

				 `}
                whileHover={{ scale: 1.03 }}
              >
                <div
                  className={`gene w-full ${toggleBar && ' rounded-sm'}`}
                  onClick={() => {}}
                >
                  <div className="flex  flex-col w-full">
                    <div
                      className={`cursor-pointer p-3 hover:border-b-2 hover:border-[#1A5DAD]
				       ${
                 showParametrization &&
                 sidebar.menu === MenuSidebar.parametrization &&
                 sidebar.menu !== select &&
                 ' border-b border-gray-400  '
               }
	       ${
           showWallet &&
           sidebar.menu === MenuSidebar.wallet &&
           sidebar.menu !== select &&
           ' border-b border-gray-400  '
         }
	       ${
           showTreasury &&
           sidebar.menu === MenuSidebar.treasury &&
           sidebar.menu !== select &&
           ' border-b border-gray-400  '
         }
	       ${
           showAccounting &&
           sidebar.menu === MenuSidebar.accounting &&
           sidebar.menu !== select &&
           ' border-b border-gray-400  '
         }
	 ${sidebar.menu === select && 'bg-[#E8E8E8]'} 

				    `}
                    >
                      <div
                        className={`flex flex-row  w-full h-full 
				    ${
              sidebar.menu === MenuSidebar.parametrization &&
              showParametrization &&
              '  justify-center '
            } 
				    ${toggleBar ? 'justify-center' : 'justify-between'}
				    `}
                        onClick={() => {
                          if (sidebar.menu === MenuSidebar.parametrization) {
                            setShowParametrization(!showParametrization)
                          }

                          if (sidebar.menu === MenuSidebar.wallet) {
                            setShowWallet(!showWallet)
                          }
                          if (sidebar.menu === MenuSidebar.treasury) {
                            setShowTreasury(!showTreasury)
                          }
                          if (sidebar.menu === MenuSidebar.accounting) {
                            setShowAccounting(!showAccounting)
                          }

                          if (sidebar.menu === MenuSidebar.main) {
                            route.push(sidebar.href)
                            setSelectSub('')
                          }
                          setSelect(sidebar.menu)
                        }}
                      >
                        <div className="flex flex-row">
                          <div className="h-4 w-4 ">
                            {MenuSidebar.parametrization === sidebar.menu &&
                              sidebar.menu === select && (
                                <ParametrizationLogo color="#1A5DAD" />
                              )}
                            {MenuSidebar.parametrization === sidebar.menu &&
                              sidebar.menu !== select && (
                                <ParametrizationLogo color="#26384b" />
                              )}
                            {MenuSidebar.main === sidebar.menu &&
                              sidebar.menu === select && (
                                <HomeLogo color="#1A5DAD" />
                              )}
                            {MenuSidebar.main === sidebar.menu &&
                              sidebar.menu !== select && (
                                <HomeLogo color="#26384b" />
                              )}
                            {MenuSidebar.wallet === sidebar.menu &&
                              sidebar.menu === select && (
                                <WalletLogo color="#1A5DAD" />
                              )}
                            {MenuSidebar.wallet === sidebar.menu &&
                              sidebar.menu !== select && (
                                <WalletLogo color="#26384b" />
                              )}
                            {MenuSidebar.accounting === sidebar.menu &&
                              sidebar.menu === select && (
                                <AccountingIcon color="#1A5DAD" />
                              )}
                            {MenuSidebar.accounting === sidebar.menu &&
                              sidebar.menu !== select && (
                                <AccountingIcon color="#26384b" />
                              )}

                            {MenuSidebar.treasury === sidebar.menu &&
                              sidebar.menu === select && (
                                <TreasuryIcon color="#1A5DAD" />
                              )}

                            {MenuSidebar.treasury === sidebar.menu &&
                              sidebar.menu !== select && (
                                <TreasuryIcon color="#26384b" />
                              )}
                          </div>
                          {!toggleBar && (
                            <span
                              className={`pl-6 text-input font-sans font-semibold ${
                                sidebar.menu == select
                                  ? 'text-[#1A5DAD] font-semibold'
                                  : 'text-gray-600'
                              }`}
                            >
                              {sidebar.name}
                            </span>
                          )}
                        </div>
                        {!toggleBar && sidebar.menu !== MenuSidebar.main && (
                          <motion.svg
                            fill={`${
                              sidebar.menu == select ? '#1A5DAD' : '#26384B'
                            }`}
                            height={18}
                            width={18}
                            viewBox="-6.5 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
                          </motion.svg>
                        )}
                      </div>
                    </div>
                    {sidebar.menu === MenuSidebar.parametrization &&
                      showParametrization && (
                        <div className={` ${!toggleBar && ' mx-4  my-2'}`}>
                          <MenuParametrization
                            toggleBar={toggleBar}
                            setSelect={setSelect}
                            setSelectSub={setSelectSub}
                            selectSub={selectSub}
                          />
                        </div>
                      )}
                    {sidebar.menu === MenuSidebar.wallet && showWallet && (
                      <div className={` ${!toggleBar && ' mx-4  my-2'}`}>
                        <MenuWallet
                          toggleBar={toggleBar}
                          setSelect={setSelect}
                          setSelectSub={setSelectSub}
                          selectSub={selectSub}
                        />
                      </div>
                    )}
                    {sidebar.menu === MenuSidebar.treasury && showTreasury && (
                      <div className={` ${!toggleBar && ' mx-4  my-2'}`}>
                        <MenuTreasury
                          toggleBar={toggleBar}
                          setSelect={setSelect}
                          selectSub={selectSub}
                          setSelectSub={setSelectSub}
                        />
                      </div>
                    )}
                    {sidebar.menu === MenuSidebar.accounting &&
                      showAccounting && (
                        <div className={` ${!toggleBar && ' mx-4  my-2'}`}>
                          <MenuAccounting
                            toggleBar={toggleBar}
                            setSelect={setSelect}
                            selectSub={selectSub}
                            setSelectSub={setSelectSub}
                          />
                        </div>
                      )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
