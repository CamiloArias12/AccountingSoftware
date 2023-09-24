import { Entity,  Column,  PrimaryColumn, OneToOne } from 'typeorm';
import { Field, ObjectType } from "@nestjs/graphql";
import { ClassAccount } from './class-account/class-account.entity';
import { Account } from './account/account.entity';
import { Auxiliary } from './auxiliary/auxiliary.entity';
import { Group } from './group/group.entity';
import { SubAccount } from './sub-account/sub-account.entity';

@ObjectType()
@Entity()
export class TypeAccount {

    @Field()
    @PrimaryColumn()
    code: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    nature: string;

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

