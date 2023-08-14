import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, TableInheritance } from "typeorm";


@ObjectType()
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export   abstract class User{

   @Field()   
   @Column()
   tipoIdentificacion: string

   @Field()
   @PrimaryColumn({unique: true})
   numeroIdentificacion: number

   @Field()
   @Column()
   nombre: string

   @Field()
   @Column()
   sueldo: string

   @Field()
   @Column()
   otrosIngresos: string

   @Field()
   @Column()
   direccionResidencia: string

   @Field()
   @Column()
   telefono: string

   @Field()
   @Column()
   correo: string

   @Field()
   @Column()
   fechaNacimiento: Date;

   @Field()
   @Column()
   pais: string;

   @Field()
   @Column()
   municipio: Date

   @Field()
   @Column()
   estado: string

   @Field()
   @Column()
   fechaAfiliacion: Date

   @Field()
   @Column()
   fechaRetiro: Date

   @Field()
   @Column()
   escolaridad: string

   @Field()
   @Column()
   genero: string

}
