'use client'
import { motion } from 'framer-motion'
import Button from '../input/Button'

interface ModalProps {
  title: string
  children?: React.ReactNode
  size: string
  onClick: any
}

function Modal({ title, children, onClick, size }: ModalProps) {
  return (
    <div className="fixed inset-0 md:h-screen md:w-screen md:flex md:items-center md:justify-center z-[20]">
      <div
        className={` flex flex-col md:my-0 rounded-sm shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] md:max-h-[90vh]  pb-20 md:pb-4 h-screen  w-screen ${size} md:p-6`}
      >
        <div className="mb-2 relative top-0 left-0 flex text-white md:text-black gap-2 md:gap-0  bg-[#10417B] md:bg-white md:items-center md:justify-between border-b border-[#BABBBB] md:rounded-md  p-4">
          <img
            className="md:hidden h-8 w-8 lg:h-8   lg:w-8 cursor-pointer "
            src="/arrowLeftWhite.svg"
            onClick={onClick}
          />

          <div>
            <label className="font-sans  font-bold text-[18px] lg:text-lg">
              {title}
            </label>
          </div>

          <motion.img
            className="hidden md:block h-6 w-6 lg:h-8 bg-white  lg:w-8 cursor-pointer "
            whileHover={{ scale: 1.5 }}
            src="/close.svg"
            onClick={onClick}
          />
        </div>
        <div className="overflow-scroll px-2 md:px-0">{children}</div>
      </div>
    </div>
  )
}

export default Modal
