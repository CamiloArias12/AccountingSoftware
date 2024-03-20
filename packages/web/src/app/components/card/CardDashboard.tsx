export const revalidate = 0
import Image from 'next/image'

function CardDashBoard({
  name,
  value,
  image
}: {
  name: string
  value: any
  image: string
}) {
  return (
    <div className="flex flex-row justify-between w-[96vw] bg-[#f5f5fb] sm:w-auto flex-grow md:bg-white rounded-lg p-4 ">
      <Image src={image} height={40} width={40} alt="" />
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-col justify-between ">
          <span className="font-medium text-gray-400 text-end">{name}</span>
          <span className="font-bold text-xl text-end">{value}</span>
        </div>
      </div>
    </div>
  )
}

export default CardDashBoard
