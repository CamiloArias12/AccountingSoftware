import { useEffect, useState } from 'react'
import Logo from '../logo/Logo'
import ClickOutside from './ClickOutSide'

type SelectProps = {
  label?: string
  options: any
  onClick?: any
  setValue: any
  index?: number
  account?: any
  className?: string
}

function SelectOptions({
  label,
  options,
  onClick,
  setValue,
  index,
  account,
  className
}: SelectProps) {
  const [toggle, setToggle] = useState<boolean>(false)
  const [valueLabel, setValueLabel] = useState('')

  const toggleText = () => {
    setToggle(false)
  }

  if (account) {
    useEffect(() => {
      if (account?.account !== '') {
        setValueLabel(account.nature)
      }
    }, [options])
  }
  return (
    <ClickOutside
      onClick={toggleText}
      className={`flex ${
        className ? className : 'w-[100px]'
      } flex-col  relative`}
    >
      {label && (
        <label className="text-input  font-semibold pb-2">{label}</label>
      )}
      <input
        className={`mb-1 text-sm border border-gray-300 "type="text p-1`}
        value={`${valueLabel}`}
        onClick={() => {
          setToggle(!toggle)
        }}
        required
      />
      <div className={`flex flex-grow  ${!toggle && 'hidden'}`}>
        <ul className=" flex absolute w-full z-10  flex-grow bg-white shadow-lg max-h-100 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <div className="flex-grow  flex flex-col max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll">
            {toggle && options ? (
              options.map((option: any) => (
                <li
                  key={option.id}
                  className=" flex-grow text-gray-900 cursor-default select-none relative py-3  flex items-center hover:bg-[#f8fafb] transition"
                  onClick={() => {
                    if (account) {
                      setValue(index, { ...account, nature: option.name })
                    } else {
                      setValue('nature', option.name)
                    }
                    setValueLabel(` ${option.name}`)
                    setToggle(!toggle)
                  }}
                >
                  <span className="font-normal truncate">{option.name}</span>
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
  )
}

export default SelectOptions
