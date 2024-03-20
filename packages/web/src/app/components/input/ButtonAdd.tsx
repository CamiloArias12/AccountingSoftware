import { AddSvg } from '../logo/Add'

export default function ButtonAdd({ onClick }: { onClick: any }) {
  return (
    <button
      className=" w-24 h-7 text-input-medium 2xl:text-input  flex flex-end items-center justify-center rounded-lg shadow-lg font-bold  bg-[#1AAD78] text-white  "
      onClick={onClick}
      type="button"
    >
      <AddSvg color={'#FFFFFF'} stroke={4} />
      <span>Agregar</span>
    </button>
  )
}
