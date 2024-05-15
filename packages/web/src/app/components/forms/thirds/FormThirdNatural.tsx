'use client'
import BeneficiaryInformation from '@/app/components/forms/thirds/BeneficiaryInformation'
import CredentialsForm from '@/app/components/forms/thirds/Credentials'
import GeneralInformation from '@/app/components/forms/thirds/GeneralInformation'
import PersonalInformation from '@/app/components/forms/thirds/PersonalInformation'
import WorkingInformtaion from '@/app/components/forms/thirds/WorkingInformation'
import Button from '@/app/components/input/Button'
import CheckBoxThirds from '@/app/components/input/CheckBoxThirds'
import ListChangeThirds from '@/app/components/list-change/ListChangeThirds'
import { OptionsThirds } from '@/lib/utils/thirds/OptionsThirds'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  schemaGeneral,
  schemaPersonal,
  schemaWorking
} from '@/lib/utils/ValidationYup'

const findCountry = (countries: any, countryName: string) => {
  for (const country of countries) {
    if (country.name === countryName) {
      return country.iso2
    }
  }
}

function FormThirdNatural({
  countries,
  informationUser,
  onClick,
  title,
  loading,
  update
}: {
  countries: any
  informationUser?: any
  onClick: any
  title: string
  loading: any
  update?: boolean
}) {
  const general = {
    typeIdentification: null,
    identification: null,
    name: null,
    lastName: null,
    expeditionDate: null,
    expeditionCity: null,
    birthDate: null,
    countryBirth: null,
    stateBirth: null,
    cityBirth: null,
    gender: null,
    statusCivil: null
  }

  const personal = {
    addressResidence: null,
    countryResidence: null,
    stateResidence: null,
    cityResidence: null,
    phone: null,
    landLine: null,
    email: null,
    housingType: null,
    studies: null,
    profession: null,
    foreignOperations: false,
    publicResources: false,
    publicRecognition: false,
    publicPower: false
  }

  const working = {
    company: null,
    addreesCompany: null,
    emailJob: null,
    salary: null,
    bank: null,
    jobTitle: null,
    phone: null,
    incomeCompany: null,
    typeAccount: null,
    numberAccount: null,
    beneficiaries: [
      {
        percentage: null,
        beneficiary: {
          idDocument: null,
          name: null
        }
      }
    ]
  }

  const employee = {
    username: null,
    password: null,
    roles: []
  }

  const {
    register: employeeInformation,
    handleSubmit: handleEmployeeSubmit,
    setValue: handleEmployee,
    getValues: valuesEmployee,
    control: controlEmployee,
    formState: { errors: employeeError }
  } = useForm({
    mode: 'all',
    defaultValues: employee
  })

  const {
    register: generalInformation,
    handleSubmit,
    setValue: handleGeneralInformation,
    getValues,
    control,
    formState: { errors: generalError }
  } = useForm({
    mode: 'all',
    defaultValues: general,
    // @ts-ignore
    resolver: yupResolver(schemaGeneral)
  })
  const {
    register: workingInformation,
    handleSubmit: handleSubmitWorking,
    setValue: handleWorkingInformation,
    getValues: workingValues,
    control: controlWorking,
    formState: { errors: workingError }
  } = useForm({
    mode: 'all',
    defaultValues: working,
    // @ts-ignore
    resolver: yupResolver(schemaWorking)
  })

  const {
    register: personalInformation,
    handleSubmit: personalInformationHandle,
    setValue: handlePersonalInformation,
    getValues: personalGetValues,
    control: controlPersonal,
    formState: { errors: personalError }
  } = useForm({
    mode: 'all',
    defaultValues: personal,

    // @ts-ignore
    resolver: yupResolver(schemaPersonal)
  })

  const [indexForm, setIndexForm] = useState({
    index: 0,
    option: 1
  })

  const [checkedAffiliate, setCheckedAffiliate] = useState<boolean>(false)
  const [checkedEmployee, setCheckedEmployee] = useState<boolean>(false)
  const [checkedProvider, setCheckedProvider] = useState<boolean>(false)
  const [list, setList] = useState(OptionsThirds)
  const [listOption, setListOption] = useState([])
  const countrySearch =
    informationUser && findCountry(countries, informationUser?.countryBirth)
  const countrySearchResidence =
    informationUser && findCountry(countries, informationUser?.countryResidence)
  const [country, setCountry] = useState(countrySearch ? countrySearch : null)
  const [state, setState] = useState('')
  const [countryR, setCountryR] = useState(
    countrySearchResidence ? countrySearchResidence : null
  )
  const [stateR, setStateR] = useState('')
  const [stateButton, setStateButton] = useState('')
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    handleGeneralInformation('stateBirth', '')
    handleGeneralInformation('cityBirth', '')
  }, [country])

  useEffect(() => {
    handleGeneralInformation('cityBirth', '')
  }, [state])

  useEffect(() => {
    //@ts-ignore
    handlePersonalInformation('stateResidence', '')
    //@ts-ignore
    handlePersonalInformation('cityResidence', '')
  }, [countryR])

  useEffect(() => {
    //@ts-ignore
    handlePersonalInformation('cityResidence', '')
  }, [stateR])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowError(false)
    }, 2000) // 3 seconds in milliseconds

    return () => {
      clearTimeout(timeout)
    }
  }, [showError])

  const handleChangeSubmit = () => {
    if (stateButton === 'Siguiente') {
      if (
        (Object.keys(generalError).length === 0 && indexForm.option === 1) ||
        (Object.keys(personalError).length === 0 && indexForm.option === 2) ||
        (Object.keys(personalError).length === 0 && indexForm.option === 3)
      ) {
        setIndexForm({
          ...indexForm,
          index: indexForm.index + 1,
          option: listOption[indexForm.index + 1].id
        })
      }
    } else if (stateButton === 'Aceptar') {
      const affiliate = {
        inputAffiliate: {
          company: workingValues().company,
          addreesCompany: workingValues().addreesCompany,
          emailJob: workingValues().emailJob,
          salary: workingValues().salary,
          bank: workingValues().bank,
          jobTitle: workingValues().jobTitle,
          phone: workingValues().phone,
          incomeCompany: workingValues().incomeCompany,
          typeAccount: workingValues().typeAccount,
          numberAccount: workingValues().numberAccount
        },
        beneficiaries: workingValues().beneficiaries
      }

      console.log('affilate', affiliate)

      onClick(
        { ...getValues(), ...personalGetValues() },
        checkedAffiliate,
        affiliate,
        checkedEmployee,
        valuesEmployee(),
        checkedProvider
      )
    }
  }
  useEffect(() => {
    if (informationUser) {
      for (let key in general) {
        if (general.hasOwnProperty(key)) {
          if (key === 'birthDate' || key === 'expeditionDate') {
            const date = informationUser[key].split('-', 3)
            handleGeneralInformation(
              key,
              new Date(
                Number(date[0]),
                Number(date[1]) - 1,
                Number(date[2].split('T', 1))
              )
            )
          } else {
            //@ts-ignore
            handleGeneralInformation(key, informationUser[key])
          }
        }
      }
      for (let key in personal) {
        if (personal.hasOwnProperty(key)) {
          //@ts-ignore
          handlePersonalInformation(key, informationUser[key])
        }
      }
      if (informationUser?.affiliate) {
        for (let key in informationUser.affiliate) {
          if (informationUser.affiliate.hasOwnProperty(key)) {
            if (key === 'incomeCompany') {
              const date = informationUser.affiliate[key].split('-', 3)
              handleWorkingInformation(
                key,
                new Date(
                  Number(date[0]),
                  Number(date[1]) - 1,
                  Number(date[2].split('T', 1))
                )
              )
            } else {
              //@ts-ignore
              handleWorkingInformation(key, informationUser.affiliate[key])
            }
            console.log(key)
          }
        }
      }

      if (informationUser?.affiliate) {
        if (informationUser?.affiliate.state) {
          setCheckedAffiliate(true)
        }
      }

      if (informationUser?.employee) {
        handleEmployee('username', informationUser?.employee.username)
        if (informationUser?.employee?.roles) {
          const roles = []
          informationUser.employee.roles.map((rol: any) => {
            roles.push(rol.id)
          })
          handleEmployee('roles', roles)
        }
        setCheckedEmployee(true)
      }

      if (informationUser?.provider) {
        setCheckedProvider(true)
      }
    }
  }, [])

  useEffect(() => {
    setIndexForm({ option: 1, index: 0 })
    const updatedList = [...OptionsThirds]
    if (checkedEmployee) {
      updatedList[3].visible = true
    } else {
      updatedList[3].visible = false
    }

    if (checkedAffiliate) {
      updatedList[2].visible = true
    } else {
      updatedList[2].visible = false
    }
    setList(updatedList)
    setListOption(list.filter(option => option.visible == true))
  }, [checkedAffiliate, checkedEmployee, checkedProvider])

  return (
    <div className="h-full flex-grow  flex flex-col  ">
      <div className="flex flex-col items-center  justify-center  md:flex-row md:justify-between">
        <label className="hidden md:flex bg-white p-2   font-bold">
          {title}
        </label>
        <div className="flex flex-row bg-white h-full px-2  gap-2  ">
          <CheckBoxThirds
            isChecked={checkedAffiliate}
            onChange={() => {
              setCheckedAffiliate(!checkedAffiliate)
            }}
            name="Afiliado"
          />
          <CheckBoxThirds
            isChecked={checkedEmployee}
            onChange={() => {
              setCheckedEmployee(!checkedEmployee)
            }}
            name="Empleado"
          />
          <CheckBoxThirds
            isChecked={checkedProvider}
            onChange={() => {
              setCheckedProvider(!checkedProvider)
            }}
            name="Proveedor"
          />
        </div>
      </div>

      <div className=" flex md:w-auto w-[100vw]  flex-grow flex-col bg-white overflow-scroll md:pt-2 2xl::pt-10 px-3">
        <ListChangeThirds
          indexForm={indexForm}
          setIndexForm={setIndexForm}
          list={listOption}
          color="bg-[#006AE7]"
        />
        <form
          onSubmit={
            indexForm.option === 1
              ? handleSubmit(handleChangeSubmit)
              : indexForm.option === 2
                ? personalInformationHandle(handleChangeSubmit)
                : indexForm.option === 3
                  ? handleSubmitWorking(handleChangeSubmit)
                  : indexForm.option === 4 &&
                    handleEmployeeSubmit(handleChangeSubmit)
          }
          className="flex-grow flex gap-4 flex-col overflow-scroll justify-between"
        >
          <div className="flex-grow ">
            {indexForm.option === 1 && (
              <GeneralInformation
                countries={countries}
                generalInformation={generalInformation}
                setCountry={setCountry}
                setState={setState}
                country={country}
                state={state}
                control={control}
                errors={generalError}
                setValue={handleGeneralInformation}
              />
            )}

            {indexForm.option === 2 && (
              <PersonalInformation
                errors={personalError}
                countries={countries}
                handlePersonalInformation={handlePersonalInformation}
                personalInformation={personalInformation}
                setCountry={setCountryR}
                setState={setStateR}
                country={countryR}
                state={stateR}
                control={controlPersonal}
                getValues={personalGetValues}
              />
            )}
            {checkedAffiliate && indexForm.option === 3 && (
              <>
                <WorkingInformtaion
                  handleWorkingInformation={handleWorkingInformation}
                  workingInformation={workingInformation}
                  control={controlWorking}
                  errors={workingError}
                />
                <BeneficiaryInformation
                  control={controlWorking}
                  beneficiaryInformation={workingInformation}
                  errors={workingError}
                  setValue={handleWorkingInformation}
                />
              </>
            )}
            {checkedEmployee && indexForm.option === 4 && (
              <CredentialsForm
                employeeInformation={employeeInformation}
                control={controlEmployee}
                errors={employeeError}
                update={update}
                setValue={handleEmployee}
                values={valuesEmployee('roles')}
              />
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row bg-white justify-between flex-end px-4 pb-10">
            {indexForm.index > 0 ? (
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  name="Anterior"
                  type={'button'}
                  background="border border-[#AF7800] text-[#AF7800]"
                  onClick={() => {
                    setIndexForm({
                      index: indexForm.index - 1,
                      option: listOption[indexForm.index - 1].id
                    })
                  }}
                />
              </div>
            ) : (
              <div />
            )}
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                name="Cancelar"
                background="border sm:w-[110px] border-[#10417B] text-[#10417B]"
                route="/dashboard/parametrization/thirds"
              />

              {indexForm.index < listOption.length - 1 && (
                <Button
                  name="Siguiente"
                  background="border  sm:w-[110px] border-[#009226] text-[#009226]"
                  type={'submit'}
                  onClick={() => {
                    setStateButton('Siguiente')
                    setShowError(true)
                  }}
                />
              )}
              {(checkedAffiliate || checkedEmployee || checkedProvider) &&
                indexForm.index === listOption.length - 1 && (
                  <>
                    <Button
                      name="Aceptar"
                      loading={loading}
                      background="bg-[#10417B] sm:w-[110px] text-white"
                      onClick={() => {
                        console.log('Empleado', valuesEmployee)
                        setStateButton('Aceptar')
                      }}
                    />
                  </>
                )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormThirdNatural
