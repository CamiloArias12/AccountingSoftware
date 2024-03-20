'use client'
import { motion } from 'framer-motion'

function AlertModalError({ value }: { value: string }) {
  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2  xl:w-screen flex items-center justify-center z-50">
      <motion.div
        className={`flex flex-row rounded-sm shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]  p-4 bg-[#FFDCDC] `}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      >
        <svg
          width="26"
          height="27"
          viewBox="0 0 26 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9898 26C19.5842 26 24.9796 20.375 24.9796 13.5C24.9796 6.625 19.5842 1 12.9898 1C6.39541 1 1 6.625 1 13.5C1 20.375 6.39541 26 12.9898 26Z"
            stroke="#A10909"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.59668 17.0375L16.3829 9.96255"
            stroke="#A10909"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.3829 17.0375L9.59668 9.96255"
            stroke="#A10909"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div className=" ml-2 text-sm text-[#9C0909] flex-grow max-h-[90%]">
          {value}
        </div>
      </motion.div>
    </div>
  )
}

export default AlertModalError
