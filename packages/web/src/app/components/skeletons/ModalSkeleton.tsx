import { ReactNode } from 'react'

function ModalSkeleton({
  children,
  className
}: {
  children: ReactNode
  className: string
}) {
  return (
    <div className="fixed inset-0 h-screen w-screen flex items-center justify-center z-50">
      <div
        className={` flex flex-col rounded-sm shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ${className} p-6`}
      >
        <div className="mb-2 flex  items-center justify-between border-b border-[#BABBBB] p-4">
          <div className="h-[15px] w-[150px] bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="h-[30px] w-[30px] rounded-[50%] animate-pulse bg-gray-300"></div>
        </div>
        <div className="flex-grow max-h-[90%]">{children}</div>
      </div>
    </div>
  )
}

export default ModalSkeleton
