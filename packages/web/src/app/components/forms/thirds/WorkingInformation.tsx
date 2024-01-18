import InputField from '@/app/components/input/InputField'
import SelectField from '@/app/components/input/SelectField'
import { AccountTypeOptions } from '@/lib/utils/thirds/selectForm'
import InputCalendar from '../../input/Calendar'
import InputNumber from '../../input/InputNumber'
import { NumberFormatValues } from 'react-number-format'
import {} from '@/lib/utils/FieldValidation'

function WorkingInformtaion({
  workingInformation,
  handleWorkingInformation,
  control,
  errors
}: {
  workingInformation: any
  handleWorkingInformation: any
  control: any
  errors: any
}) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <InputField
        type="text"
        name="company"
        label="Empresa"
        value={workingInformation.company}
        props={{
          ...workingInformation('company')
        }}
        required
        error={errors.company}
      />
      <InputField
        type="text"
        name="jobTitle"
        label="Cargo"
        value={workingInformation.jobTitle}
        props={{
          ...workingInformation('jobTitle')
        }}
        required
        error={errors.jobTitle}
      />

      <InputField
        type="text"
        name="addreesCompany"
        label="Dirección"
        value={workingInformation.addreesCompany}
        props={{
          ...workingInformation('addreesCompany')
        }}
        required
        error={errors.addreesCompany}
      />

      <InputField
        type="email"
        name="emailJob"
        label="Correo laboral"
        value={workingInformation.emailJob}
        props={{
          ...workingInformation('emailJob')
        }}
        required
        error={errors.emailJob}
      />
      <InputNumber
        name="phone"
        label="Telefono"
        value={workingInformation.phone}
        onChange={true}
        control={control}
        required
        isString
        error={errors.phone}
      />

      <InputCalendar
        name="incomeCompany"
        label="Fecha de ingreso"
        value={workingInformation.incomeCompany}
        onChange={handleWorkingInformation}
        control={control}
        required
        error={errors.incomeCompany}
      />

      <InputNumber
        name="salary"
        label="Sueldo"
        value={workingInformation.salary}
        handleChange={handleWorkingInformation}
        prefix="$ "
        thousandSeparator=","
        control={control}
        required
        error={errors.salary}
      />

      <InputField
        type="text"
        name="bank"
        label="Banco"
        value={workingInformation.bank}
        props={{
          ...workingInformation('bank')
        }}
        required
        error={errors.bank}
      />

      <SelectField
        name="typeAccount"
        value={workingInformation.typeAccount}
        options={AccountTypeOptions}
        setValue={handleWorkingInformation}
        label="Tipo de cuenta"
        image={false}
        control={control}
        required
        error={errors.typeAccount}
      />

      <InputNumber
        name="numberAccount"
        label="Número de Cuenta"
        value={workingInformation.numberAccount}
        handleChange={handleWorkingInformation}
        control={control}
        required
        error={errors.numberAccount}
      />
    </div>
  )
}

export default WorkingInformtaion
