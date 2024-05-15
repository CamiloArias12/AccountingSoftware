import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
interface ButtonProps {
  name: string
  background: string
  onClick?: any
  loading?: boolean
  route?: string
  type?: any
  image?: string
  rigth?: boolean
}

function Button({
  name,
  background,
  onClick,
  loading,
  route,
  type,
  image,
  rigth
}: ButtonProps) {
  return (
    <>
      {route ? (
        <Link
          href={!loading ? route : ''}
          className={` ${background} text-input-medium  items-center justify-center 2xl:text-input font-bold h-[30px] 2xl:h-[34px] md:w-28  flex flex-row   gap-2 hover:shadow-lg ${
            loading && 'cursor-not-allowed'
          }  `}
        >
          {image && !loading && !rigth && (
            <Image src={image} height={21} width={21} alt="" />
          )}

          <span>{name}</span>
          {image && rigth && (
            <Image src={image} height={21} width={21} alt="" />
          )}
        </Link>
      ) : (
        <button
          className={` ${background} text-input-medium  items-center justify-center 2xl:text-input font-bold h-[30px] 2xl:h-[34px] md:w-28  flex flex-row   gap-2 hover:shadow-lg ${
            loading && 'cursor-not-allowed'
          }  `}
          onClick={onClick}
          disabled={loading}
          type={type}
        >
          {image && !loading && !rigth && (
            <Image src={image} height={21} width={21} alt="" />
          )}
          {loading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              height={21}
              width={21}
            >
              <path
                d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
                fill="#ffffff"
              />
              <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 16 16"
                  to="360 16 16"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          )}

          {name}
          {image && rigth && (
            <Image src={image} height={21} width={21} alt="" />
          )}
        </button>
      )}
    </>
  )
}

export default Button
