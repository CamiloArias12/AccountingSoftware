'use client'
import { ReactNode } from 'react'

function Frame({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex  flex-col h-full w-full bg-white rounded-tr-[20px] rounded-b-[20px]  px-4  ${className}`}
    >
      {children}
    </div>
  )
}

export default Frame
