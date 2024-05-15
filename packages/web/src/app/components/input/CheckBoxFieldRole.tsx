import { Controller } from 'react-hook-form'

type CheckBoxThirdsProps = {
  name: string
  label: string
  control: any
}

function CheckBoxFieldRole({ label, name, control }: CheckBoxThirdsProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <button
            type="button"
            className={`shadow-md p-2 text-input font-bold ${
              value ? 'text-[#306E47] bg-[#BAF7D0]' : 'bg-white'
            }`}
            onClick={() => {
              console.log(value)
              onChange(!value)
            }}
          >
            {label}
          </button>
        )}
      />
    </>
  )
}

export default CheckBoxFieldRole
