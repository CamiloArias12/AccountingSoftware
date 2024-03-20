function CardSkeleton() {
  return (
    <div className="flex flex-row justify-between w-[96vw] sm:w-auto md:flex-grow bg-white shadow rounded-lg p-4 ">
      <div className="bg-gray-300 rounded-[50%] animate-pulse h-[60px] w-[60px] "></div>
      <div className="w-2/3 flex flex-col gap-2 justify-end items-end rounded-[50%] animate-pulse   ">
        <div className="w-2/3 h-[20px] rounded-lg bg-gray-200 animate-pulse" />
        <div className="bg-gray-300 rounded-[30%] animate-pulse h-[40px] w-[30px] "></div>
      </div>
    </div>
  )
}

export default CardSkeleton
