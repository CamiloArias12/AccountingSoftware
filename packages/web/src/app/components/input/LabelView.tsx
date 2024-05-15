export interface LabelViewProps {
  value: any
  name: string
}
export function LabelView({ name, value }: LabelViewProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <span className="text-input font-medium">{name}</span>
      <div className=" flex items-center p-2 text-input  text-gray-500   rounded-md h-[30px] xl:h-[36px]  shadow-sm">
        <span>{value}</span>
      </div>
    </div>
  )
}
