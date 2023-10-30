import { Entity,  Column,  PrimaryColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from "@nestjs/graphql";
import { ClassAccount } from './class-account/class-account.entity';
import { Account } from './account/account.entity';
import { Auxiliary } from './auxiliary/auxiliary.entity';
import { Group } from './group/group.entity';
import { SubAccount } from './sub-account/sub-account.entity';
import { NatureEnum } from './dto/enum-type';
import { ITypeAccount } from './dto/type-account-interface';

@ObjectType()
@Entity()
export class TypeAccount implements ITypeAccount{

    @Field()
    @PrimaryGeneratedColumn()
    code: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column(
      {
	 type:'enum',
	 enum:NatureEnum,
	 nullable:false
      }
    )
    nature: NatureEnum;

    @Field()
    @Column({default:true})
    state: boolean;


    @Field(() => Account)
    @OneToOne(() => Account, account => account.typeAccount)
    account: Account

    @Field(() => Auxiliary)
    @OneToOne(() => Auxiliary, auxiliary => auxiliary.typeAccount)
    auxiliary: Auxiliary


    @Field(() => Group)
    @OneToOne(() => Group, group => group.typeAccount)
    group: Group

    @Field(() => ClassAccount)
    @OneToOne(() => ClassAccount, classAccount => classAccount.typeAccount)
    classAccount: ClassAccount
    
    @Field(() => SubAccount)
    @OneToOne(() => SubAccount, subAccount => subAccount.typeAccount)
    subAccount: SubAccount

}

