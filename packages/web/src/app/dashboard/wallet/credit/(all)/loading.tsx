import Frame from '@/app/components/skeletons/Frame'
import Header from '@/app/components/skeletons/Header'
import TableRowSkeleton from '@/app/components/skeletons/TableSkeleton'
function Skeleton() {
  return (
    <>
      <Frame className="pt-8">
        <Header />
        <TableRowSkeleton size={7} />
      </Frame>
    </>
  )
}

export default Skeleton
