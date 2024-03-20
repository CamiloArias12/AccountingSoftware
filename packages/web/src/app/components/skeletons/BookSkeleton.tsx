import ButtonSkeleton from './ButtonSkeleton'
import InputSkeleton from './InputSkeleton'
import LabelSkeleton from './LabelSkeleton'

export function BookSkeleton() {
  return (
    <>
      <div className=" w-full h-auto  overflow-scroll ">
        <div className="flex  flex-col p-2 lg:p-4 gap-4  bg-white md:shadow-md ">
          <div className="flex flex-grow flex-col sm:grid sm:grid-cols-2 md:grid-cols-4 gap-2 ">
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
          </div>
          <div className="flex flex-grow  flex-col lg:flex-row  gap-2 ">
            <div className="flex flex-grow flex-col  gap-2">
              <LabelSkeleton />
              <InputSkeleton />
              <InputSkeleton />
            </div>
            <div className="flex grow flex-col  gap-2">
              <LabelSkeleton />
              <InputSkeleton />
              <InputSkeleton />
            </div>
          </div>
          <div className="justify-end gap-2 flex flex-row ">
            <ButtonSkeleton />
            <ButtonSkeleton />
          </div>
        </div>
      </div>
    </>
  )
}
