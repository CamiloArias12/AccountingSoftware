import Frame from '@/app/components/skeletons/Frame'
import Header from '@/app/components/skeletons/Header'
import TableRowSkeleton from '@/app/components/skeletons/TableSkeleton'
function Skeleton() {
  return (
    <>
      <Frame className="pt-8">
        <Header>
          <div className="bg-gray-300 rounded-lg animate-pulse h-[30px] w-[100px] "></div>
          <div className="bg-gray-300 rounded-lg animate-pulse h-[30px] w-[100px] "></div>
        </Header>
        <TableRowSkeleton size={7} />
      </Frame>
    </>
  )
}

export default Skeleton
