export function AddSvg({
  color,
  width,
  height,
  stroke
}: {
  color: string
  width?: string
  height?: string
  stroke?: number
}) {
  return (
    <svg
      width={width ? width : '20px'}
      height={height ? height : '25px'}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        stroke={color}
        strokeWidth={stroke ? stroke : 2}
        d="M16 25V7M7 16h18"
      />
    </svg>
  )
}
