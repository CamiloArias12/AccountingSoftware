import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToOne, PrimaryColumn} from "typeorm";
import { iUser } from "./dto/user.interface";
import { CivilStatus, Gender, HousingType, Studies, TypeIdentification } from "./dto/enum-type";
import { Affiliate } from "../affiliate/affiliate.entity";
import { Employee } from "../employee/employee.entity";

@ObjectType()
@Entity()
export class User implements iUser{
 
   @Field()
   @Column({
         type: 'enum',
         enum: TypeIdentification,
         nullable: false
   })
   typeidentification: string;


   @Field()
   @PrimaryColumn()
   identification: number; 

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

   @Field()
   @Column({
         type: 'enum',
         enum: Gender,
         nullable: false
   })
   gender: string;

   @Field()
   @Column({
         type: 'enum',
         enum: CivilStatus,
         nullable: false
   })
   statusCivil: string;

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

   @Field()
   @Column({
   type: 'enum',
   enum: HousingType,
   nullable: false
   })
   housingType: string;

   @Field()
   @Column({
   type: 'enum',
   enum: Studies,
   nullable: false
   })
   studies: string;

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

   @Field(() =>Affiliate)
   @OneToOne(() => Affiliate ,affiliate =>affiliate.user)
   affiliate:Affiliate
    

   @OneToOne(() => Employee ,employee =>employee.user)
   employee:Employee


}


