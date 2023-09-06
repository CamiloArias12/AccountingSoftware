export enum TypeIdentification {
    CEDULA_DE_CIUDADANIA = 'cedula de ciudadania',
    TARJETA_DE_EXTRANJERIA = 'cedula de extranjeria',
 }
 
 export enum CivilStatus {
    SOLTERO_A = 'soltero(a)',
    CASADO_A = 'casado(a)',
    LIBRE = 'libre',
    OTRO = 'otro',
    MUJER_CABEZA_FAMILIA = 'mujer cabeza familia'
 }
 
 export enum Gender {
    MASCULINO = 'masculino',
    FEMENINO = 'femenino',
 }
 
 export enum HousingType {
    PROPIA = 'propia',      
    ARRENDADA = 'arrendada',
    FAMILIAR = 'familiar',
    OTRO = 'otro'     
 }
 
 export enum Studies {
    PRIMARIA = 'primaria',      
    SECUNDARIA = 'secundaria',
    TECNOLOGIA = 'tecnologia',
    UNIVESITARIA = 'universitaria',
    POSGRADO = 'posgrado'     
 }

 export type FormData = {
    typeIdentification: TypeIdentification;
    expeditionDate: Date | null;
    expeditionCity: string;
    countryCard: string;
    municipalityCard: string;
    cityCard: string;
    name: string;
    lastName: string;
    gender: Gender;
    statusCivil: CivilStatus;
    addressResidence: string;
    municipality: string;
    city: string;
    phone: number;
    landLine: number;
    email: string;
    housingType: HousingType;
    studies: Studies;
    profession: string;
    foreignOperations: boolean;
    publicResources: boolean;
    publicRecognition: boolean;
    publicPower: boolean;
};