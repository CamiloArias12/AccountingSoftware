import {Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {
    
    @Column()
    tipoIdentificacion: string

    @PrimaryColumn({unique: true})
    numeroIdentificacion: number

    @Column()
    nombre: string

    @Column()
    sueldo: string

    @Column()
    otrosIngresos: string

    @Column()
    direccionResidencia: string

    @Column()
    telefono: string

    @Column()
    correo: string

    @Column()
    fechaNacimiento: Date;

    @Column()
    pais: string;

    @Column()
    municipio: Date

    @Column()
    estado: string

    @Column()
    fechaAfiliacion: Date

    @Column()
    fechaRetiro: Date

    @Column()
    tipoIdentificacionBeneficiario: string

    @Column({unique: true})
    numeroIdentificacionBeneficiario: number

    @Column()
    escolaridad: string

    @Column()
    genero: string

}