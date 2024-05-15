import { Controller } from 'react-hook-form'

type CheckBoxThirdsProps = {
  name: string
  label: string
  control: any
}

function CheckBoxField({ label, name, control }: CheckBoxThirdsProps) {
  return (
    <>
      <div className="flex flex-row items-center pl-4 ">
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <div
              className={`h-4 w-4  rounded-[50%] border-2 border-[#10417B] cursor-pointer ${
                value ? 'bg-[#10417B]' : 'bg-white'
              }`}
              onClick={() => {
                console.log(value)
                onChange(!value)
              }}
            />
          )}
        />
        <span className="pl-3 font-semibold text-input-medium 2xl:text-input ">
          {label}
        </span>
      </div>
    </>
  )
}

export default CheckBoxField
