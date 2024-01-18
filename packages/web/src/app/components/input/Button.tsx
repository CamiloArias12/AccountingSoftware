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
}

function Button({
  name,
  background,
  onClick,
  loading,
  route,
  type,
  image
}: ButtonProps) {
  console.log(loading)
  return (
    <>
      {route ? (
        <Link
          href={!loading ? route : ''}
          className={` ${background} text-input font-bold px-6 py-2  flex flex-row  gap-2 rounded-sm hover:shadow-lg ${
            loading && 'cursor-not-allowed'
          }  `}
        >
          {name}
        </Link>
      ) : (
        <button
          className={` ${background} text-input font-bold px-6 py-2  flex flex-row  gap-2 rounded-sm hover:shadow-lg ${
            loading && 'cursor-not-allowed'
          }  `}
          onClick={onClick}
          disabled={loading}
          type={type}
        >
          {image && !loading && (
            <Image src="/download.svg" height={21} width={21} alt="" />
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
        </button>
      )}
    </>
  )
}

export default Button
