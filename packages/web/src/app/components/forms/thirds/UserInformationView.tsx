import { LabelView } from '../../input/LabelView'
import CheckBoxThirds from '../../input/CheckBoxThirds'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { OptionsThirds } from '@/lib/utils/thirds/OptionsThirds'
import { format } from 'date-fns'

interface UserInformationProps {
  userInformation: any
}
const title = [
  'Información general ',
  'Información personal',
  'Información afiliado'
]
export function UserInformationView({ userInformation }: UserInformationProps) {
  const [index, setIndexForm] = useState(1)

  const [list, setList] = useState(OptionsThirds)

  useEffect(() => {
    const updatedList = [...OptionsThirds]

    if (userInformation.affiliate) {
      updatedList[2].visible = true
    } else {
      updatedList[2].visible = false
    }
    updatedList[3].visible = false
    setList(updatedList)
  }, [])

  return (
    <>
      <div className="flex flex-grow bg-white  flex-col overflow-y-scroll gap-4  shadow-sm rounded-lg p-4">
        <div className="flex flex-row  text-input font-bold ">
          {list.map(option => (
            <>
              {option.visible && (
                <div
                  className={`  cursor-pointer text-center flex-grow border-b-4 p-2 ${
                    option.id === index
                      ? `${
                          userInformation.gender === 'Femenino'
                            ? ' border-b-[#E51515] text-[#E51515]'
                            : 'border-b-[#1A5DAD] text-[#1A5DAD]  '
                        }`
                      : ''
                  }`}
                  onClick={() => {
                    setIndexForm(option.id)
                  }}
                >
                  {option.name}
                </div>
              )}
            </>
          ))}
        </div>
        {index === 1 && (
          <div className="  grid grid-cols-1 sm:grid-cols-2  gap-6   ">
            <LabelView value={userInformation.name} name="Nombres" />
            <LabelView value={userInformation.lastName} name="Apellidos" />

            <LabelView
              value={userInformation.typeIdentification}
              name="Tipo de identificación"
            />
            <LabelView
              value={userInformation.identification}
              name="Identificación"
            />
            <LabelView
              value={format(
                new Date(userInformation.expeditionDate),
                'dd-MM-yyyy'
              )}
              name="Fecha de expedición"
            />
            <LabelView
              value={userInformation.expeditionCity}
              name="Ciudad de expedición"
            />

            <LabelView
              value={format(new Date(userInformation.birthDate), 'dd-MM-yyyy')}
              name="Fecha de nacimiento"
            />
            <LabelView value={userInformation.countryBirth} name="Pais" />

            <LabelView value={userInformation.stateBirth} name="Estado" />
            <LabelView value={userInformation.cityBirth} name="Ciudad" />
            <LabelView value={userInformation.gender} name="Genero" />
            <LabelView
              value={userInformation.statusCivil}
              name="Estado civil"
            />
          </div>
        )}

        {index === 2 && (
          <div className="  grid grid-cols-1 sm:grid-cols-2  gap-6   ">
            <LabelView
              value={userInformation.addressResidence}
              name="Dirección de residencia"
            />

            <LabelView value={userInformation.countryResidence} name="Pais" />

            <LabelView value={userInformation.stateResidence} name="Estado" />
            <LabelView value={userInformation.cityResidence} name="Ciudad" />

            <LabelView value={userInformation.email} name="Correo" />
            <LabelView value={userInformation.phone} name="Teléfono" />
            <LabelView value={userInformation.landLine} name="Teléfono fijo" />

            <LabelView
              value={userInformation.housingType}
              name="Tipo de vivienda"
            />

            <LabelView value={userInformation.studies} name="Estudios" />

            <LabelView value={userInformation.profession} name="Profesión" />
          </div>
        )}

        {index === 3 && (
          <>
            <div className="  grid grid-cols-1 sm:grid-cols-2  gap-6   ">
              <LabelView
                value={userInformation.affiliate.company}
                name="Empresa"
              />

              <LabelView
                value={userInformation.affiliate.jobTitle}
                name="Cargo"
              />
              <LabelView
                value={userInformation.affiliate.addreesCompany}
                name="Dirección"
              />
              <LabelView
                value={userInformation.affiliate.emailJob}
                name="Correo laboral"
              />
              <LabelView
                value={userInformation.affiliate.phone}
                name="Teléfono"
              />
              <LabelView
                value={format(
                  new Date(userInformation.affiliate.incomeCompany),
                  'dd-MM-yyyy'
                )}
                name="Fecha de ingreso"
              />
              <LabelView
                value={userInformation.affiliate.salary}
                name="Salario"
              />
              <LabelView value={userInformation.affiliate.bank} name="Banco" />
              <LabelView
                value={userInformation.affiliate.typeAccount}
                name="Tipo de cuenta"
              />
              <LabelView
                value={userInformation.affiliate.numberAccount}
                name="Número de Cuenta"
              />
            </div>
            <div className="flex bg-white flex-grow flex-col  gap-4 shadow-sm border rounded-lg p-4">
              <span className="text-input font-bold mb-2 pb-2 border-b ">
                Beneficiarios
              </span>
              <div className=" flex-grow grid grid-cols-1 md:grid-cols-3  gap-6   ">
                {userInformation.affiliate.beneficiaries.map(
                  (beneficiary: any) => (
                    <>
                      <LabelView
                        value={beneficiary.beneficiary.idDocument}
                        name="Identificación"
                      />
                      <LabelView
                        value={beneficiary.beneficiary.name}
                        name="Nombres"
                      />

                      <LabelView
                        value={`${beneficiary.percentage} %`}
                        name="Porcentaje"
                      />
                    </>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default UserInformationView
