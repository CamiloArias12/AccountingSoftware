'use client'

import Modal from '../../modal/Modal'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import UserInformationView from './UserInformationView'

function ViewThird({ data }: { data: any }) {
  return (
    <>
      <div className="flex flex-row gap-4 flex-grow">
        <div className="flex flex-col shadow-sm bg-white  items-center justify-center border-gray-150 p-2 xl:w-80 rounded-lg  ">
          <div className="flex flex-col pt-4 gap-4 items-center justify-center">
            <Image
              src={
                data.getUser.gender === 'Femenino' ? '/woman.svg' : '/man.svg'
              }
              height={200}
              width={200}
              alt=""
            />

            <div className="flex w-full flex-grow flex-col border-t-4 items-center justify-center">
              <span className=" font-bold text-gray-700">{`${data.getUser.name}  ${data.getUser.lastName}`}</span>
              <span className=" text-input text-gray-500 font-semibold">{`${data.getUser.profession}`}</span>
              <span className="text-input text-gray-500 font-semibold ">{`${data.getUser.cityResidence} , ${data.getUser.countryResidence}`}</span>
              <span
                className={`  font-semibold py-1 px-1  rounded-[30px] text-xs ${
                  data.getUser.status
                    ? ' text-[#306E47] bg-[#BAF7D0] w-12 '
                    : 'bg-[#FECACA] w-14'
                }
`}
              >{`${data.getUser.status ? 'Activo' : 'Inactivo'}`}</span>
            </div>
            <div className="flex flex-col  gap-2  text-input items-end ">
              <Link
                href={`/dashboard/parametrization/thirds/update/${data.getUser.identification}`}
                className=" flex h-[25px] w-[25px]  font-normal  bg-white  p-1 border  shadow-sm hover:shadow-lg rounded-lg"
              >
                <Image src="/editSecundary.svg" height={21} width={21} alt="" />
              </Link>

              {data.getUser.affiliate && <span>Afiliado</span>}
              {data.getUser.employee && <span>Empleado</span>}
              {data.getUser.provider && <span>Proveedor</span>}
            </div>
          </div>
        </div>
        <UserInformationView userInformation={data.getUser} />
      </div>
    </>
  )
}

export default ViewThird
