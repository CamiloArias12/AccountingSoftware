import { motion } from 'framer-motion'

type PropsListChange = {
  list: any[]
  setIndexForm: any
  indexForm: any
  color: string
}

function ListChangeThirds({ list, setIndexForm, indexForm }: PropsListChange) {
  return (
    <div className="  flex justify-center   mb-6 2xl:mb-10 flex-row w-full">
      <span className=" flex-grow flex-end  border-b-4" />

      {list.map((option, index) => (
        <>
          <motion.div
            animate={indexForm === option.id ? { scale: 1.12 } : { scale: 1 }}
            key={option.id}
            className={` md:flex cursor-pointer flex-col font-bold  gap-2 px-6 py-1 border-b-4 text-input-medium  2xl:text-input text-center items-center ${
              indexForm.option === option.id
                ? 'border-b-[#1A5DAD] text-[#1A5DAD] flex flex-col '
                : ' text-gray-600 hidden'
            }`}
          >
            <span
              className={`rounded-[50%] px-2 py-1  ${
                indexForm.option === option.id && 'bg-[#1A5DAD] text-white'
              } `}
            >
              {index + 1}
            </span>
            <span>{option.name}</span>
          </motion.div>
        </>
      ))}

      <span className=" flex-grow flex-end  border-b-4" />
    </div>
  )
}

export default ListChangeThirds
