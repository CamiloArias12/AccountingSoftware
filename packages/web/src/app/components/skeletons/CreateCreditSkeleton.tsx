import Frame from './Frame'
import Header from './Header'
import InputSkeleton from './InputSkeleton'

function UpdateCreditSkeleton() {
  return (
    <div className=" flex-grow flex flex-col overflow-hidden">
      <div className="flex  flex-row justify-between  ">
        <ul className="flex flex-grow flex-row w-full">
          <div
            className={` w-[150px]  rounded-tl-[20px] bg-white rounded-tr-[100px] px-5 py-4 flex flex-row justify-center items-center`}
          >
            <div className="w-1/2 bg-gray-200 rounded-lg h-[12px] "></div>
          </div>
        </ul>
        <ul className="flex  flex-row bg-white items-center gap-2 px-2">
          <div
            className={`  bg-gray-200 w-[20px] h-[20px]  rounded-[50%]`}
          ></div>

          <div className="w-1/3 bg-gray-200 rounded-lg h-[12px] w-[80px]"></div>
          <div
            className={`  bg-gray-200 w-[20px] h-[20px]  rounded-[50%]`}
          ></div>

          <div className="w-1/3 bg-gray-200 rounded-lg h-[12px] w-[80px]"></div>
          <div
            className={`  bg-gray-200 w-[20px] h-[20px]  rounded-[50%]`}
          ></div>

          <div className="w-1/3 bg-gray-200 rounded-lg h-[12px] w-[80px] "></div>
        </ul>
      </div>

      <Frame className="pt-10 px-3">
        <div className="w-full h-[68px] flex justify-center items-center flex-row bg-gray-100">
          <div className="flex flex-col p-2 gap-2 justify-center items-center">
            <div
              className={`  bg-gray-200 w-[30px] h-[30px]  rounded-[50%]`}
            ></div>

            <div className="w-1/3 bg-gray-200 rounded-lg h-[12px] w-[100px]"></div>
          </div>
          <div className="flex flex-col p-2 gap-2 justify-center items-center">
            <div
              className={`  bg-gray-200 w-[30px] h-[30px]  rounded-[50%]`}
            ></div>

            <div className="w-1/3 bg-gray-200 rounded-lg h-[12px] w-[100px]"></div>
          </div>
          <div className="flex flex-col p-2 gap-2 justify-center items-center">
            <div
              className={`  bg-gray-200 w-[30px] h-[30px]  rounded-[50%]`}
            ></div>

            <div className="w-1/3 bg-gray-200 rounded-lg h-[12px] w-[100px]"></div>
          </div>
        </div>

        <div className="  flex  flex-grow flex-col bg-white   rounded-bl-lg rounded-br-lg rounded-tr-lg pt-10 px-3">
          <div className="  grid grid-cols-2 gap-4 lg:gap-6 lg:grid-cols-4  ">
            <div className="lg:row-start-1 ">
              <InputSkeleton />
            </div>
            <div>
              <InputSkeleton />
            </div>

            <div className="lg:row-start-2">
              <InputSkeleton />
            </div>
            <div className="lg:row-start-2">
              <InputSkeleton />
            </div>
            <div className="lg:row-start-3">
              <InputSkeleton />
            </div>
            <div className="lg:row-start-3">
              <InputSkeleton />
            </div>

            <div className="lg:row-start-4">
              <InputSkeleton />
            </div>
            <div className="lg:row-start-4">
              <InputSkeleton />
            </div>
            <div className="lg:row-start-4">
              <InputSkeleton />
            </div>
            <div className="lg:row-start-4">
              <InputSkeleton />
            </div>
            <div className="lg:row-start-5">
              <InputSkeleton />
            </div>
            <div className="lg:row-start-5">
              <InputSkeleton />
            </div>
          </div>
        </div>
        <div className="flex flex-row bg-white gap-2 justify-end flex-end px-4 pb-10">
          <div className="w-[110px] h-[38px]  bg-gray-200 animate-pulse" />
          <div className="w-[110px] h-[38px]  bg-gray-200 animate-pulse" />
        </div>
      </Frame>
    </div>
  )
}

export default UpdateCreditSkeleton
