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
      <ul className="flex flex-grow flex-row w-full">
        {list.map((option, index) => (
          <div
            key={option.id}
            className={`flex-grow w-full  rounded-tl-[20px]  rounded-tr-[100px] px-5 pt-3  text-sm text-center ${
              indexForm.index === index
                ? 'bg-[#FFFFFF] font-bold'
                : 'bg-[#DDEEFF] text-gray-600 font-semibold'
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
