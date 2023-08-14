export class UpdateUserDto {
    tipoIdentificacion?: string
    numeroIdentificacion?: number
    nombre?: string
    sueldo?: string
    otrosIngresos?: string
    direccionResidencia?: string
    telefono?: string
    correo?: string
    fechaNacimiento?: Date
    pais?:string
    municipio?:string
    estado?: string
    fechaAfiliacion?: Date
    fechaRetiro?: Date
    tipoIdentificacionBeneficiario?: string
    numeroIdentificacionBeneficiario?: number
    escolaridad?: string
    genero?: string
}