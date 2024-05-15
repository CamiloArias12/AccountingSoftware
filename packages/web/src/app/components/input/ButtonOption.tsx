import Link from 'next/link'

function ButtonOption({
  onClick,
  name,
  className,
  image,
  route
}: {
  onClick?: any
  route?: any
  name: string
  className: string
  image: string
}) {
  return (
    <>
      {onClick && (
        <button className={className} onClick={onClick}>
          <img
            src={image}
            className="2xl:h-[25px] 2xl:w-[25px] h-[20px] w-[20px]"
          />
          {name}
        </button>
      )}

      {route && (
        <Link href={route} className={className}>
          <img
            src={image}
            className="2xl:h-[25px] 2xl:w-[25px] h-[20px] w-[20px]"
          />
          {name}
        </Link>
      )}
    </>
  )
}

export default ButtonOption
