import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToOne, PrimaryColumn} from "typeorm";
import { IUser} from "./dto/user.interface";
import { CivilStatus, Gender, HousingType, Studies, TypeIdentification } from "./dto/enum-type";
import { Affiliate } from "../affiliate/affiliate.entity";
import { Employee } from "../employee/employee.entity";
import { Provider } from "../provider/provider.entity";

@ObjectType()
@Entity()
export class User implements IUser{
 
   @Field()
   @Column({
         type: 'enum',
         enum: TypeIdentification,
         nullable: false
   })
   typeIdentification: TypeIdentification;


   @Field()
   @PrimaryColumn()
   identification: number; 
   
   @Field()
   @Column()
   name:string

   @Field()
   @Column()
   lastName:string

   @Field()
   @Column()
   expeditionDate:Date
   
   @Field()
   @Column()
   expeditionCity:string

   @Field()
   @Column()
   birthDate:Date
 
   @Field()
   @Column()
   countryBirth: string;

   @Field()
   @Column()
   stateBirth: String

   @Field()
   @Column()
   cityBirth: String

   
   @Field()
   @Column({
         type: 'enum',
         enum: Gender,
         nullable: false
   })
   gender: Gender;

   @Field()
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
   countryResidence: string;

   @Field()
   @Column()
   stateResidence: String

   @Field()
   @Column()
   cityResidence: String

   @Field()
   @Column()
   phone: string

   @Field()
   @Column()
   landLine:string 

   @Field()
   @Column()
   email: string

   @Field()
   @Column({
   type: 'enum',
   enum: HousingType,
   nullable: false
   })
   housingType: HousingType;

   @Field()
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

   @Field()
   @Column({default:true})
   status:boolean


   @Field(() =>Affiliate,{nullable:true})
   @OneToOne(() => Affiliate ,affiliate =>affiliate.user)
   affiliate:Affiliate
    

   @Field(() =>Employee,{nullable:true})
   @OneToOne(() => Employee ,employee =>employee.user)
   employee:Employee
   
   @Field(() =>Provider,{nullable:true})
   @OneToOne(() => Provider,provider=>provider.user)
   provider:Provider


}


