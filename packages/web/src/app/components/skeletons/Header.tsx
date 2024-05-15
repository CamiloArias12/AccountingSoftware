'use client'

import { ReactNode } from 'react'

function Header({ children }: { children?: ReactNode }) {
  return (
    <div className="lg:bg-gray-100 h-[60px] rounded-lg flex flex-row items-center gap-2 justify-between  p-2">
      <div />
      <div className="bg-gray-300 rounded-lg animate-pulse h-[30px] hidden sm:block lg:w-[200px] " />
      <div className="flex flex-row gap-2 ">
        {children}
        <div className="bg-gray-300 rounded-lg animate-pulse h-[30px] w-8 lg:w-[100px] " />
      </div>
    </div>
  )
}

export default Header
