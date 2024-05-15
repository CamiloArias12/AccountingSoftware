function InputSkeleton() {
  return (
    <div className="flex flex-grow  flex-col gap-2">
      <div className="w-1/2 h-[10px] rounded-lg bg-gray-200 animate-pulse" />
      <div className="w-full h-[30px] rounded-sm bg-gray-200 animate-pulse" />
    </div>
  )
}

export default InputSkeleton
