import Frame from '@/app/components/skeletons/Frame'
import Header from '@/app/components/skeletons/Header'
import TableRowSkeleton from '@/app/components/skeletons/TableSkeleton'
function SkeletonThird() {
  return (
    <div className=" flex-grow flex flex-col overflow-hidden">
      <div className="flex  lg:w-1/2">
        <ul className="flex flex-grow flex-row w-full">
          {Array.from({ length: 2 }, (_, index) => (
            <div
              className={`flex-grow w-full  rounded-tl-[20px] bg-white rounded-tr-[100px] px-5 py-4 flex flex-row justify-center items-center`}
            >
              <div className="w-1/2 bg-gray-200 rounded-lg h-[12px] "></div>
            </div>
          ))}
        </ul>
      </div>

      <Frame className="pt-8">
        <Header />
        <TableRowSkeleton size={7} />
      </Frame>
    </div>
  )
}

export default SkeletonThird
