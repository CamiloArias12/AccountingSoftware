function TableRowSkeleton({ size }: { size: number }) {
  return (
    <>
      <div className="flex animate-pulse flex-row items-center gap-2 bg-gray-300 h-[40px] p-4 mt-4">
        {Array.from({ length: size }, (_, index) => (
          <div className="flex-grow">
            <div
              className={`bg-gray-200 h-[12px] rounded-lg             ${
                index % 2 !== 0 ? 'w-3/4' : 'w-1/3'
              }`}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex flex-col mt-2  gap-2 overflow-hidden">
        {Array.from({ length: 20 }, (_, index) => (
          <div
            className={`flex flex-row items-center gap-2  ${
              index % 2 !== 0 ? 'bg-gray-50 ' : 'bg-white'
            } h-[40px] p-4`}
          >
            {Array.from({ length: size }, (_, index) => (
              <div className="flex-grow">
                <div
                  className={`bg-gray-200 h-[12px] animate-pulse rounded-lg             ${
                    index % 2 !== 0 ? 'w-3/4' : 'w-1/3'
                  }`}
                ></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default TableRowSkeleton
