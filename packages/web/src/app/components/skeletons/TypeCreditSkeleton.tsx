import InputSkeleton from './InputSkeleton'
import ModalSkeleton from './ModalSkeleton'

function TypeAccountSkeleton() {
  return (
    <>
      <ModalSkeleton className="min-w-[550px] w-[600px] bg-white">
        <div className="flex flex-col gap-3 ">
          <div className=" flex flex-row items-center justify-center   h-[30px] rounded-sm bg-gray-200">
            <div className="w-1/2 h-[12px] rounded-lg bg-gray-300 animate-pulse" />
          </div>
          <InputSkeleton />
          <InputSkeleton />
          <InputSkeleton />

          <div className="flex flex-row gap-2 justify-end mt-2">
            <div className="w-[110px] h-[38px]  bg-gray-200 animate-pulse" />
            <div className="w-[110px] h-[38px]  bg-gray-200 animate-pulse" />
          </div>

          <div className="pt-10 flex justify-end">
            <div className="pr-4">
              <div />
            </div>
            <div />
          </div>
        </div>
      </ModalSkeleton>
    </>
  )
}

export default TypeAccountSkeleton
