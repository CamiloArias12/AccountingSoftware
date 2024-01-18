import { useEffect, useState } from 'react'
import Logo from '../logo/Logo'
import ClickOutside from './ClickOutSide'
import { Controller } from 'react-hook-form'

import { motion } from 'framer-motion'
type SelectProps = {
  label?: string
  options: any
  onClick?: any
  setValue: any
  value?: any
  name: string
  direction?: boolean
  isSeach?: boolean
  control: any
  required?: boolean
  error?: any
  rules?: any
}

function SelectAffiliate({
  label,
  options,
  setValue,
  value,
  name,
  direction,
  control,
  error,
  required,
  rules
}: SelectProps) {
  const [toggle, setToggle] = useState<boolean>(false)
  const toggleText = () => {
    setToggle(false)
  }
  console.log('Error select ', error)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange: handleChange, onBlur, value, ref } }) => (
        <ClickOutside
          onClick={toggleText}
          className={`flex flex-grow pr-2  ${direction && 'pr-2'} ${
            direction ? 'flex-row ' : ' flex-col '
          } relative`}
        >
          {label && (
            <label
              className={`pb-2 font-semibold text-input flex flex-row gap-1`}
            >
              <span>{label}</span>
              {required && <span className="text-[#E61515]">*</span>}
            </label>
          )}
          <div
            className={` ${
              toggle && ' border-2 border-blue-500 '
            } bg-white relative w-full flex cursor-pointer gap-2 flex-row  items-center text-input border   rounded-md pl-2  text-left  focus:outline-none focus:ring-1 focus:ring-blue-500 focus: h-[34px] mb-1`}
            onClick={() => {
              setToggle(!toggle)
            }}
          >
            <input
              className="flex-grow h-full placeholder-black border-0 hover:none "
              value={value}
              style={{ outline: 'none' }}
            />
            <motion.svg
              className={'mr-2'}
              fill={'#000000'}
              height={12}
              width={12}
              viewBox="-6.5 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.813 11.406l-7.906 9.906c-0.75 0.906-1.906 0.906-2.625 0l-7.906-9.906c-0.75-0.938-0.375-1.656 0.781-1.656h16.875c1.188 0 1.531 0.719 0.781 1.656z"></path>
            </motion.svg>
          </div>
          {error && (
            <span
              className={`text-[#FF0000] text-xs font-semibold ${
                toggle && 'hidden'
              }`}
            >
              {error}
            </span>
          )}

          <div className={`flex flex-grow  ${!toggle && 'hidden'} `}>
            <ul className=" flex absolute w-full z-10  flex-grow bg-white shadow-lg max-h-100 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex-grow  flex flex-col max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll text-input">
                {toggle && options ? (
                  options.map((option: any, index: number) => (
                    <li
                      key={index}
                      className="px-2 flex-grow text-gray-900 cursor-default select-none relative h-[40px]  flex items-center justify-between hover:bg-[#f8fafb] transition"
                      onClick={() => {
                        setToggle(!toggle)
                        if (option.user) {
                          handleChange(option.user.identification)
                          setValue(
                            'nameThird',
                            `${option.user.name} ${option.user.lastName}`
                          )
                          setValue('idAffiliate', option.user.identification)
                        } else if (option.id) {
                          handleChange(option.name)
                          if (option.interest) {
                            setValue('interest', option.interest)
                            setValue('interestAnual', option.interest * 12)
                          }
                          if (name === 'typeSaving') {
                            setValue('idTypeSaving', option.id)
                          } else {
                            setValue('idTypeCredit', option.id)
                          }
                        } else {
                          setValue(name, option.identification)
                          setValue(
                            'nameThird',
                            `${option.name} ${
                              option.lastName ? option.lastName : ''
                            }`
                          )
                        }
                      }}
                    >
                      {option.user ? (
                        <>
                          <span className="font-normal truncate mr-4">
                            {option.user.identification}
                          </span>
                          <span className="font-normal truncate">{`${option.user.name}  ${option.user.lastName}`}</span>
                        </>
                      ) : (
                        option.identification && (
                          <>
                            <span className="font-normal truncate mr-4">
                              {option.identification}
                            </span>
                            <span className="font-normal truncate">{`${
                              option.name
                            }  ${
                              option.lastName ? option.lastName : ''
                            }`}</span>
                          </>
                        )
                      )}
                      {option.id && (
                        <>
                          <span className="font-normal truncate">{`${option.name}`}</span>
                        </>
                      )}
                    </li>
                  ))
                ) : (
                  <div className="flex items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center">
                      {' '}
                      <Logo />
                    </div>
                  </div>
                )}
              </div>
            </ul>
          </div>
        </ClickOutside>
      )}
    />
  )
}

export default SelectAffiliate
