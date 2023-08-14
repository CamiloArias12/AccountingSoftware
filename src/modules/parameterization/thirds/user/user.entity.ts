import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, TableInheritance } from "typeorm";

export enum TypeIdentification {
   CEDULA_DE_CIUDADANIA = 'cedula de ciudadania',
   TARJETA_DE_IDENTIDAD = 'tarjeta de identidad',
   TARJETA_DE_EXTRANJERIA = 'tarjeta de extranjeria',
}

export enum CivilStatus {
   SOLTERO_A = 'soltero(a)',
   CASADO_A = 'casado(a)',
}

export enum Gender {
   MASCULINO = 'masculino',
   FEMENINO = 'femenino',
}

@ObjectType()
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export   abstract class User{

   @Field(() => TypeIdentification)
   @Column({
       type: 'enum',
       enum: TypeIdentification,
       nullable: false
   })
   typeidentification: TypeIdentification;

   @Field()
   @PrimaryColumn({unique: true})
   numberidentification: number

   @Field()
   @Column()
   name: string

   @Field()
   @Column()
   salary: string

   @Field()
   @Column()
   otherIncome: string

   @Field()
   @Column()
   addressResidence: string

   @Field()
   @Column()
   phone: number

   @Field()
   @Column()
   email: string

   @Field()
   @Column()
   birthDate: Date;

   @Field()
   @Column()
   country: string;

   @Field()
   @Column()
   municipality: String

   @Field(() => CivilStatus)
   @Column({
       type: 'enum',
       enum: CivilStatus,
       nullable: false
   })
   statusCivil: CivilStatus;

   @Field()
   @Column()
   afiliationDate: Date

   @Field()
   @Column()
   withdrawalDate: Date

   @Field()
   @Column()
   scholarship: string

   @Field(() => Gender)
   @Column({
       type: 'enum',
       enum: Gender,
       nullable: false
   })
   gender: Gender;

}
