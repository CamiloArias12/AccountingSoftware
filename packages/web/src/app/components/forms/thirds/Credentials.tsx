import { FieldRequired } from '@/lib/utils/FieldValidation'
import InputField from '../../input/InputField'
import InputFieldPassword from '../../input/InputFieldPassword'
import { useSession } from 'next-auth/react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { Token } from '@/app/hooks/TokenContext'

const ROLES = gql`
  query {
    roles {
      id
      name
    }
  }
`
function CredentialsForm({
  errors,
  control,
  employeeInformation,
  update,
  setValue,
  values
}: {
  employeeInformation: any
  setValue: any
  control: any
  errors: any
  update: boolean
  values: any
}) {
  const { context } = Token()
  const { data, loading, error } = useQuery(ROLES, { context })

  const {
    data: { user }
  } = useSession()

  const [rolState, setRol] = useState(values)

  useEffect(() => {
    setValue('roles', rolState)
  }, [rolState])

  return (
    <>
      <div className=" flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputField
          type="text"
          name="username"
          label="Usuario"
          required
          props={{ ...employeeInformation('username', FieldRequired) }}
          error={errors.username}
        />

        <InputFieldPassword
          name="password"
          label="Contraseña"
          required={update ? false : true}
          props={{
            ...employeeInformation('password', !update && FieldRequired)
          }}
          error={errors.password}
        />
      </div>
      <div className="flex flex-col gap-8 pt-6 ">
        <label className=" font-semibold text-md border-b pb-2">Roles</label>
        {user.rol['roles'] && (
          <div className="flex flex-row gap-6">
            {data?.roles.map((rol: any) => (
              <button
                type="button"
                className={` flex-grow  gap-4 items-center shadow-md text-input font-semibold rounded-md  ${
                  rolState.find(id => id === rol.id)
                    ? 'bg-green-200'
                    : 'bg-white'
                } p-2 `}
                onClick={() => {
                  if (rolState.find(id => id === rol.id)) {
                    setRol(rolState.filter(id => id !== rol.id))
                  } else {
                    setRol([...rolState, rol.id])
                  }
                }}
              >
                {rol.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default CredentialsForm
