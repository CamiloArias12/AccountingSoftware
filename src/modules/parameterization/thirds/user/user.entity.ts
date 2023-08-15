import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, TableInheritance } from "typeorm";
import { CivilStatus, Gender, HousingType, Studies, TypeIdentification } from "./dto/enumType"
import { iUser } from "./dto/user.interface";

@ObjectType()
@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export   abstract class User implements iUser{
 
   @Field(() => TypeIdentification)
   @Column({
         type: 'enum',
         enum: TypeIdentification,
         nullable: false
   })
   typeidentification: TypeIdentification;

   @Field()
   @Column()
   expeditionDate:Date

   @Field()
   @Column()
   expeditionCity:string

   @Field()
   @Column()
   countryCard: string;

   @Field()
   @Column()
   municipalityCard: String

   @Field()
   @Column()
   cityCard: String

   @Field()
   @Column()
   name:string

   @Field()
   @Column()
   lastName:string

   @Field(() => Gender)
   @Column({
         type: 'enum',
         enum: Gender,
         nullable: false
   })
   gender: Gender;

   @Field(() => CivilStatus)
   @Column({
         type: 'enum',
         enum: CivilStatus,
         nullable: false
   })
   statusCivil: CivilStatus;

   @Field()
   @Column()
   addressResidence: string

   @Field()
   @Column()
   municipality: String

   @Field()
   @Column()
   city: String

   @Field()
   @Column()
   phone: number

   @Field()
   @Column()
   landLine: number

   @Field()
   @Column()
   email: string

   @Field(() => HousingType)
   @Column({
   type: 'enum',
   enum: HousingType,
   nullable: false
   })
   housingType: HousingType;

   @Field(() => Studies)
   @Column({
   type: 'enum',
   enum: Studies,
   nullable: false
   })
   studies: Studies;

   @Field()
   @Column()
   profession: string

   @Field()
   @Column()
   foreignOperations: boolean

   @Field()
   @Column()
   publicResources: boolean

   @Field()
   @Column()
   publicRecognition: boolean

   @Field()
   @Column()
   publicPower: boolean


}


