import Frame from '@/app/components/skeletons/Frame'
import Header from '@/app/components/skeletons/Header'
import TableRowSkeleton from '@/app/components/skeletons/TableSkeleton'
function SkeletonThird() {
  return (
    <Frame className="">
      <Header />
      <TableRowSkeleton size={5} />
    </Frame>
  )
}

export default SkeletonThird
