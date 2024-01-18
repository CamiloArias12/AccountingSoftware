import React, { useEffect, useMemo, useState } from 'react'
import Logo from '../logo/Logo'
import ClickOutside from './ClickOutSide'
import Image from 'next/image'
import { Controller } from 'react-hook-form'
import { motion } from 'framer-motion'

type SelectFieldProps = {
  name: string
  label: string
  value?: string
  country?: string
  state?: string
  options: any
  setCountry?: any
  setState?: any
  image?: boolean
  isState?: boolean
  control?: any
  rules?: any
  required?: boolean
  error?: any
  setValue: any
  setDispatch?: any
}

function SelectField({
  name,
  label,
  options,
  image,
  country,
  setCountry,
  setState,
  isState,
  control,
  rules,
  error,
  setValue,
  value,
  required,
  setDispatch
}: SelectFieldProps) {
  const [toggle, setToggle] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const list = useMemo(
    () =>
      options?.filter(option =>
        option.name.toLowerCase().includes(search.toLowerCase())
      ),
    [options, search]
  )

  useEffect(() => {
    if (search !== '') {
      setValue(name, '')
    }
  }, [search])
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange: handleChange, onBlur, value, ref } }) => (
        <ClickOutside
          onClick={() => {
            setToggle(false)
          }}
          className="flex flex-grow flex-col relative text-input"
        >
          {label && (
            <label className={`pb-2 font-semibold flex flex-row gap-1`}>
              <span>{label}</span>
              {required && <span className="text-[#E61515]">*</span>}
            </label>
          )}

          <button
            type="button"
            className={` ${
              toggle && ' border-2 border-blue-500 '
            } bg-white relative w-full flex cursor-pointer gap-2 flex-row  rounded-md items-center  border focus:outline-2 focus:outline-[rgb(59,130,246)]  pl-2  text-left  focus: h-[34px] mb-1
	    
          !color ? 'border-[#d9d9d9]' : 'border-[#AD1A1A]'
	`}
            onClick={() => {
              setToggle(!toggle)
            }}
          >
            {image && country && (
              <img
                className="text-gray-900 cursor-default select-none relative  flex items-center hover:bg-gray-50 transition"
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                height={20}
                width={30}
                alt=""
              />
            )}
            <input
              className="flex-grow h-full placeholder-black border-0 hover:none "
              onBlur={onBlur}
              value={search}
              placeholder={value}
              onChange={e => {
                setSearch(e.target.value)

                setToggle(true)
              }}
              style={{ outline: 'none' }}
              onClick={() => {
                setToggle(!toggle)
              }}
              ref={ref}
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
          </button>

          {error && (
            <span
              className={`text-[#FF0000] text-xs font-semibold ${
                toggle && 'hidden'
              }`}
            >
              {error?.message}
            </span>
          )}
          <div className={`flex flex-grow  ${!toggle && 'hidden'} `}>
            <ul className=" flex absolute w-full z-10  flex-grow bg-white shadow-lg max-h-100 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex-grow  flex flex-col  max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll text-input">
                {toggle && options ? (
                  list.map((option: any) => (
                    <li
                      key={option.id}
                      className="px-2 flex-grow text-gray-900 cursor-default select-none relative h-[40px] p-2 flex items-center justify-between hover:bg-[#f8fafb] transition"
                      onClick={e => {
                        setSearch('')
                        handleChange(option.name)
                        setToggle(!toggle)
                        if (setState && isState) setState(option.iso2)
                        if (setCountry && !isState) setCountry(option.iso2)
                        setDispatch && setDispatch(option.name)
                        return 0
                      }}
                    >
                      <div className="flex flex-row gap-2">
                        {image && (
                          <img
                            className="text-gray-900 cursor-default select-none relative flex items-center hover:bg-gray-50 transition"
                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${option.iso2}.svg`}
                            height={25}
                            width={35}
                            alt=""
                          />
                        )}
                        <span className="font-normal truncate">
                          {option.name}
                        </span>
                      </div>
                      {value == option.name && (
                        <Image
                          height={15}
                          width={15}
                          alt=""
                          src={'/okselect.svg'}
                        />
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

export default SelectField
