import Frame from './Frame'
import Header from './Header'
import InputSkeleton from './InputSkeleton'
import TableRowSkeleton from './TableSkeleton'

function UpdateCreditSkeleton() {
  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex  flex-row justify-between  ">
        <ul className="flex  flex-row w-full">
          <div
            className={` w-[150px]  rounded-tl-[20px] bg-white rounded-tr-[100px] px-5 py-4 flex flex-row justify-center items-center`}
          >
            <div className="w-1/2 bg-gray-200 rounded-lg h-[12px] "></div>
          </div>
        </ul>
      </div>

      <Frame className="pt-10 px-3">
        <div className="flex  gap-4 flex-col bg-white p-4  w-full rounded-sm h-full">
          <div className="  flex flex-grow flex-row gap-2">
            <div className=" flex-grow flex flex-col pr-2 gap-2">
              <div className=" flex flex-row items-center justify-center   h-[30px] rounded-sm bg-gray-200 w-full">
                <div className="w-1/2 h-[12px] rounded-lg bg-gray-300 animate-pulse" />
              </div>
              <div className=" flex-grow flex w-full gap-2  flex-row">
                <InputSkeleton />
                <InputSkeleton />
              </div>
            </div>
            <div className="flex-grow flex flex-col px-2  gap-2 ">
              <div className=" flex flex-row items-center justify-center   h-[30px] rounded-sm bg-gray-200">
                <div className="w-1/2 h-[12px] rounded-lg bg-gray-300 animate-pulse" />
              </div>
              <div className="flex flex-grow  flex-row gap-2">
                <InputSkeleton />
                <div className="flex flex-grow flex-row items-end">
                  <div className="w-1/2 bg-gray-200 rounded-lg h-[12px] "></div>
                  <div className="w-1/2 bg-gray-200 rounded-lg h-[12px] "></div>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col mt-2 gap-2  ">
            <div className=" flex flex-row items-center justify-center   h-[30px] rounded-sm bg-gray-200">
              <div className="w-1/2 h-[12px] rounded-lg bg-gray-300 animate-pulse" />
            </div>
            <div className="flex-grow gap-2  flex flex-row">
              <InputSkeleton />
              <InputSkeleton />
              <InputSkeleton />
              <InputSkeleton />
              <InputSkeleton />
            </div>
          </div>
          <div
            className="flex flex-col overflow-hidden   "
            style={{ minHeight: 'auto' }}
          >
            <TableRowSkeleton size={10} />
          </div>

          <div className="flex   flex-row gap-2 justify-end mt-2">
            <div className="w-[110px] h-[38px]  bg-gray-200 animate-pulse" />
            <div className="w-[110px] h-[38px]  bg-gray-200 animate-pulse" />
          </div>
        </div>
      </Frame>
    </div>
  )
}

export default UpdateCreditSkeleton
