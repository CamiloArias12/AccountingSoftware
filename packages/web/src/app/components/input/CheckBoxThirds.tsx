type CheckBoxThirdsProps = {
  isChecked: boolean
  onChange?: any
  name?: string
}

function CheckBoxThirds({ isChecked, onChange, name }: CheckBoxThirdsProps) {
  return (
    <>
      <div className="flex flex-row items-center text-input ">
        <div
          className={`h-4 w-4  rounded-[50%] border-2 border-[#10417B] ${
            isChecked ? 'bg-[#10417B]' : 'bg-white'
          }`}
          onClick={onChange && onChange}
        />
        <span className="pl-3 font-semibold text-input">{name}</span>
      </div>
    </>
  )
}

export default CheckBoxThirds
