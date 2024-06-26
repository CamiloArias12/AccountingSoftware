type CheckBoxThirdsProps = {
  isChecked: boolean
  onChange?: any
  name?: string
}

function CheckBoxThirds({ isChecked, onChange, name }: CheckBoxThirdsProps) {
  return (
    <>
      <div className="flex flex-row items-center  text-input-medium 2xl:text-input ">
        <div
          className={`cursor-pointer h-4 w-4  rounded-[50%] border-2 border-[#10417B] ${
            isChecked ? 'bg-[#10417B]' : 'bg-white'
          }`}
          onClick={onChange && onChange}
        />
        <span className="pl-3 font-semibold ">{name}</span>
      </div>
    </>
  )
}

export default CheckBoxThirds
