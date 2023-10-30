import { Field, ObjectType } from "@nestjs/graphql";
import {  Entity,  ManyToOne, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { SubAccount } from "../sub-account/sub-account.entity";
import { TypeAccount } from "../type-account.entity";
import { CreditAccount } from "src/modules/treasury/credit-account/credit-account.entity";
import { InstallmentAccount } from "src/modules/treasury/installment-account/installment-account.entity";
@ObjectType()
@Entity()
export class Auxiliary {
   
   @Field()
   @PrimaryColumn()
   code: number;   
   
   @Field({defaultValue:"Auxiliar"})
   type:string

   @ManyToOne(() => SubAccount, subAccount => subAccount.auxiliaries,{onUpdate:'CASCADE'})
    subAccount: SubAccount;

    @Field(() => TypeAccount)
    @OneToOne(() => TypeAccount, typeAccount => typeAccount.auxiliary,{onUpdate:'CASCADE',onDelete:'CASCADE'})
    @JoinColumn({ name: "code" })
    typeAccount: TypeAccount

   @Field(() => [CreditAccount])
   @OneToMany(() => CreditAccount, (creditAccount) => creditAccount.account)
   creditAccounts: CreditAccount[];

   @Field(() => [InstallmentAccount])
   @OneToMany(() => InstallmentAccount, (installmentAccount) => installmentAccount.account)
   installmentInterest: InstallmentAccount[];
}
