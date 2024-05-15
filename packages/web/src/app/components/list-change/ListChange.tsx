import { motion } from 'framer-motion'

type PropsListChange = {
  list: any[]
  setIndexForm: any
  indexForm: any
  color: string
  children?: React.ReactNode
}

function ListChange({
  list,
  setIndexForm,
  indexForm,
  color,
  children
}: PropsListChange) {
  return (
    <div className="flex  lg:w-1/2">
      <ul className="flex flex-grow pb-1 mb-2 md:pb-0 md:mb-0 flex-row w-full">
        {list.map((option, index) => (
          <div
            key={option.id}
            className={`flex-grow w-full  md:rounded-tl-[20px]  md:rounded-tr-[100px] px-5 pt-3 text-input  text-center ${
              indexForm.index === index
                ? 'bg-[#FFFFFF] border-b-2 md:border-0 font-bold border-b-[#1A5DAD]  text-[#1A5DAD] '
                : ' md:bg-[#DDEEFF] border-b-2 md:border-0  text-gray-600 font-semibold'
            }`}
            onClick={() => {
              console.log('indexForm', indexForm)
              setIndexForm({ index: index, option: option.id })
            }}
          >
            {option.name}
          </div>
        ))}
      </ul>
      {children}
    </div>
  )
}

export default ListChange
