import { setLocale } from 'yup'

import * as yup from 'yup'

setLocale({
  mixed: {
    required: 'Campo obligatrio'
  },
  number: {
    min: 'Debe ser mayor que ${min}%',
    max: 'Debe ser menor que ${min}%'
  },
  string: {
    email: 'Correo invalido',
    min: 'Campo invalido'
  }
})

export const schemaPersonal = yup.object().shape({
  email: yup.string().email().required(),
  addressResidence: yup.string().required(),
  countryResidence: yup.string().required(),
  stateResidence: yup.string().required(),
  cityResidence: yup.string().required(),
  phone: yup.string().length(10, 'Numero de celular invalido').required(),
  landLine: yup.string().required(),
  housingType: yup.string().required(),
  studies: yup.string().required(),
  profession: yup.string().required()
})

export const schemaGeneral = yup.object().shape({
  typeIdentification: yup.string().required(),
  identification: yup.string().min(2).required(),
  name: yup.string().required(),
  lastName: yup.string().required(),
  expeditionDate: yup.date().required(),
  expeditionCity: yup.string().required(),
  birthDate: yup.date().required(),
  countryBirth: yup.string().required(),
  stateBirth: yup.string().required(),
  cityBirth: yup.string().required(),
  gender: yup.string().required(),
  statusCivil: yup.string().required()
})

export const schemaWorking = yup.object().shape({
  company: yup.string().required(),
  addreesCompany: yup.string().required(),
  emailJob: yup.string().email().required(),
  salary: yup.string().required(),
  bank: yup.string().required(),
  jobTitle: yup.string().required(),
  phone: yup.string().required(),
  incomeCompany: yup.string().required(),
  typeAccount: yup.string().required(),
  numberAccount: yup.string().required(),
  beneficiaries: yup
    .array()
    .of(
      yup.object({
        percentage: yup.number().max(100).required(),
        beneficiary: yup.object({
          name: yup.string().required(),
          idDocument: yup.number().required()
        })
      })
    )
    .required()
})

export const schemaTypeSaving = yup.object().shape({
  name: yup.string().required(),
  accounts: yup
    .array()
    .of(
      yup.object({
        account: yup.string().required(),
        nature: yup.string().required(),
        percentage: yup.number().max(100).required()
      })
    )
    .required()
})

export const schemaTypeCredit = yup.object().shape({
  name: yup.string().required(),
  interest: yup.number().required(),
  accounts: yup
    .array()
    .of(
      yup.object({
        account: yup.string().required(),
        nature: yup.string().required()
      })
    )
    .required(),

  accountsInterest: yup
    .array()
    .of(
      yup.object({
        account: yup.string().required(),
        nature: yup.string().required()
      })
    )
    .required()
})
