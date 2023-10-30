import {
  CivilStatus,
  Gender,
  HousingType,
  Studies,
  TypeIdentification,
  Regime,
  TypePerson,
  AccountType,
} from './enumThirds';

export const IdentificationForm = [
  {
    id: 1,
    name: TypeIdentification.CEDULA_DE_CIUDADANIA,
  },

  {
    id: 2,
    name: TypeIdentification.TARJETA_DE_EXTRANJERIA,
  },
];

export const GenderForm = [
  {
    id: 1,
    name: Gender.MASCULINO,
  },

  {
    id: 2,
    name: Gender.FEMENINO,
  },
];

export const CivilStatusForm = [
  {
    id: 1,
    name: CivilStatus.CASADO_A,
  },

  {
    id: 2,
    name: CivilStatus.LIBRE,
  },

  {
    id: 3,
    name: CivilStatus.MUJER_CABEZA_FAMILIA,
  },

  {
    id: 4,
    name: CivilStatus.SOLTERO_A,
  },
  {
    id: 5,
    name: CivilStatus.OTRO,
  },
];

export const HousingTypeForm = [
  {
    id: 1,
    name: HousingType.ARRENDADA,
  },

  {
    id: 2,
    name: HousingType.FAMILIAR,
  },

  {
    id: 3,
    name: HousingType.PROPIA,
  },

  {
    id: 4,
    name: HousingType.OTRO,
  },
];

export const StudiesForm = [
  {
    id: 1,
    name: Studies.PRIMARIA,
  },

  {
    id: 2,
    name: Studies.SECUNDARIA,
  },

  {
    id: 3,
    name: Studies.TECNOLOGIA,
  },

  {
    id: 4,
    name: Studies.UNIVESITARIA,
  },

  {
    id: 5,
    name: Studies.POSGRADO,
  },
];

export const RegimeForm = [
  {
    id: 1,
    name: Regime.NO_RESPONSABLE_IVA,
  },
  {
    id: 2,
    name: Regime.RESPONSABLE_IVA,
  },
  {
    id: 3,
    name: Regime.SIMPLIFICADO,
  },
  {
    id: 4,
    name: Regime.SUBSIDIADO,
  },
];

export const TypePersonForm = [
  {
    id: 1,
    name: TypePerson.SOCIEDAD_COMANDITA_ACCIONES,
  },
  {
    id: 2,
    name: TypePerson.FUNDACION,
  },
  {
    id: 3,
    name: TypePerson.ENTIDAD_COOPERATIVA,
  },
  {
    id: 4,
    name: TypePerson.SOCIEDAD_ACCIONES_SIMPLIFICADA,
  },
  {
    id: 5,
    name: TypePerson.SOCIEDAD_LIMITADA,
  },
  {
    id: 6,
    name: TypePerson.CONSORCIO,
  },
  {
    id: 7,
    name: TypePerson.UNION_TEMPORAL,
  },
  {
    id: 8,
    name: TypePerson.AGREMIACION,
  },
  {
    id: 9,
    name: TypePerson.SOCIEDAD_ANONIMA,
  },
  {
    id: 10,
    name: TypePerson.EMPRESA_UNIPERSONAL,
  },
  {
    id: 11,
    name: TypePerson.SOCIEDAD_HECHO,
  },
  {
    id: 12,
    name: TypePerson.ENTIDAD_SIN_LUCRO,
  },
];

export const AccountTypeOptions = [
  {
    id: 1,
    name: AccountType.AHORRO,
  },
  {
    id: 2,
    name: AccountType.CORRIENTE,
  },
];
