import { ObjectType, Field, Float, Int,DateScalarMode } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Installment } from './installments/installment.entity';
import { Affiliate } from 'src/modules/parameterization/thirds/affiliate/affiliate.entity';
import { TypeCredit } from 'src/modules/parameterization/type-credit/type-credit.entity';
import { ICredit } from './dto/credit-interface';
import { StateCredit } from './dto/enum-types';
import { CreditAccount } from 'src/modules/treasury/credit-account/credit-account.entity';

@ObjectType()
@Entity()
export class Credit implements ICredit {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('double',{nullable:false})
  creditValue: number;

  @Field()
  @Column('double',{nullable:false})
  interest: number;

  @Field()
  @Column('date')
  startDate: Date;
  
  @Field()
  @Column('date',{nullable:false})
  discountDate: Date;

  @Field()
  @Column({
     type:'enum',
     enum:StateCredit,
     nullable:false,
     default:StateCredit.APROBADO
  })
  state: string;
   
  @Field(() =>Affiliate)
  @ManyToOne(() => Affiliate, affiliate => affiliate.credits,{nullable:false})
  affiliate: Affiliate;

  @Field(() => [Installment])
  @OneToMany(() => Installment, (installment) => installment.credit,{nullable:false,cascade:['insert','update','remove']})
  installments: Installment[];

  @Field(() => [CreditAccount])
  @OneToMany(() => CreditAccount, (account) => account.credit,{nullable:false,cascade:['insert','update','remove']})
  creditAccounts: CreditAccount[];
  
  
  @Field(() => TypeCredit)
  @ManyToOne(() => TypeCredit, typeCredit => typeCredit.credits,{nullable:false})
  typeCredit: TypeCredit;

  constructor(params?: ICredit){
    Object.assign(this, params);
  }
}



