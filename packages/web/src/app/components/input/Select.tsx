import { useEffect, useMemo, useState } from 'react'
import Logo from '../logo/Logo'
import ClickOutside from './ClickOutSide'
import { Controller } from 'react-hook-form'

type SelectProps = {
  label?: string
  options: any
  setValue: any
  account?: any
  value?: any
  isSearch?: boolean
  name?: string
  control: any
  handleQuery?: any
  handleClear?: any
  setDispatch?: any
  dispatch?: boolean
  setDispatchValue?: any
  required?: boolean
  rules?: any
  error?: any
}

function Select({
  label,
  options,
  setValue,
  account,
  isSearch,
  control,
  name,
  handleQuery,
  handleClear,
  dispatch,
  setDispatch,
  setDispatchValue,
  error,
  value,
  required,
  rules
}: SelectProps) {
  const [toggle, setToggle] = useState<boolean>(false)

  const [search, setSearch] = useState<string>('')
  const [click, setClick] = useState(false)
  const [valueLabel, setValueLabel] = useState<string>('')

  console.log(setDispatch)
  const toggleText = () => {
    setToggle(false)
    setClick(false)
  }

  useEffect(() => {
    console.log(value)
    if (value !== '') {
      const account = options?.find(
        option => option?.typeAccount?.code === value
      )
      if (account)
        setValueLabel(`${account.typeAccount.code} ${account.typeAccount.name}`)
    }
  }, [options])

  const list = useMemo(
    () =>
      options?.filter(
        option =>
          option?.typeAccount?.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          String(option?.typeAccount?.code).includes(search)
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
          onClick={toggleText}
          className="flex flex-col text-input  flex-grow relative "
        >
          {label && (
            <label className={`pb-2 font-semibold flex flex-row gap-1`}>
              <span>{label}</span>
              {required && <span className="text-[#E61515]">*</span>}
            </label>
          )}
          <input
            className={`mb-1  rounded-md border border-gray-300 placeholder-black  h-[34px] p-1`}
            placeholder={setDispatch ? value : valueLabel}
            value={search}
            onClick={() => {
              setToggle(!toggle)
              handleQuery && handleQuery()
              setClick(true)
            }}
            onChange={e => {
              setSearch(e.target.value)
            }}
          />
          {error && (
            <span
              className={`text-[#FF0000] text-xs font-semibold ${
                toggle && 'hidden'
              }`}
            >
              {error?.message}
            </span>
          )}
          <div className={`flex flex-grow  ${!toggle && 'hidden'}`}>
            <ul className=" flex absolute w-full z-10  flex-grow bg-white shadow-lg max-h-100 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <div className="flex-grow  flex flex-col max-h-64 scrollbar scrollbar-track-gray-800 scrollbar-thumb-gray-800 hover:scrollbar-thumb-gray-800 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll">
                {toggle && list ? (
                  list.map((option: any) => (
                    <li
                      key={option.typeAccount.code}
                      className={`flex-grow text-gray-900 ${
                        account?.account === option.typeAccount.code &&
                        'bg-[#DBEAFB] text-black'
                      }   cursor-pointer select-none relative py-2  min-w-[400px] flex items-center hover:bg-[#F2F8FF] transition`}
                      onClick={() => {
                        setSearch('')
                        setDispatch && setDispatch(!dispatch)
                        setDispatchValue && setDispatchValue(name)

                        handleChange(option.typeAccount.code)
                        setValueLabel(
                          `${option.typeAccount.code}  ${option.typeAccount.name}`
                        )

                        setToggle(!toggle)

                        setClick(false)
                      }}
                    >
                      <span className="font-normal  truncate mr-4">
                        {option.typeAccount.code}
                      </span>
                      <span className="font-normal  truncate">
                        {option.typeAccount.name}
                      </span>
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

export default Select
