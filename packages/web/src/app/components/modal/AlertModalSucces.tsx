'use client'
import { motion } from 'framer-motion'

function AlertModalSucces({ value }: { value: string }) {
  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 w-screen flex items-center justify-center z-50">
      <motion.div
        className={`flex flex-row rounded-sm shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]  p-4 bg-[#BAFFCD] `}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 25C5.60465 25 0 19.3953 0 12.5C0 5.60465 5.60465 0 12.5 0C19.3953 0 25 5.60465 25 12.5C25 19.3953 19.3953 25 12.5 25ZM12.5 1.74419C6.56977 1.74419 1.74419 6.56977 1.74419 12.5C1.74419 18.4302 6.56977 23.2558 12.5 23.2558C18.4302 23.2558 23.2558 18.4302 23.2558 12.5C23.2558 6.56977 18.4302 1.74419 12.5 1.74419Z"
            fill="#099E39"
          />
          <path
            d="M10.8483 16.6629C10.6157 16.6629 10.3948 16.5698 10.232 16.407L6.94126 13.1163C6.60405 12.7791 6.60405 12.221 6.94126 11.8838C7.27847 11.5466 7.83661 11.5466 8.17382 11.8838L10.8483 14.5582L16.825 8.58146C17.1622 8.24425 17.7204 8.24425 18.0576 8.58146C18.3948 8.91867 18.3948 9.47681 18.0576 9.81402L11.4646 16.407C11.3018 16.5698 11.0809 16.6629 10.8483 16.6629Z"
            fill="#099E39"
          />
        </svg>
        <div className=" ml-2 text-sm text-[#096031] flex-grow max-h-[90%]">
          {value}
        </div>
      </motion.div>
    </div>
  )
}

export default AlertModalSucces
