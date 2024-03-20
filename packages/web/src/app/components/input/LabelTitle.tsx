export interface LabelViewProps {
  value: string
  className?: string
}
export function LabeTitle({ value, className }: LabelViewProps) {
  return (
    <h1
      className={`text-center text-white  bg-[#10417B] text-input-medium 2xl:text-input font-bold ${className}`}
    >
      {value}
    </h1>
  )
}
