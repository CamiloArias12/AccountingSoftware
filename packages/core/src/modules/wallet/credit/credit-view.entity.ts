import { Affiliate } from 'src/modules/parameterization/thirds/affiliate/affiliate.entity';
import { User } from 'src/modules/parameterization/thirds/user/user.entity';
import { DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Credit } from './credit.entity';
import { TypeCredit } from 'src/modules/parameterization/type-credit/type-credit.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('user.identification', 'identification')
      .addSelect('user.name', 'name')
      .addSelect('user.lastName', 'lastName')
      .addSelect('credit.id', 'id')
      .addSelect('credit.discountDate', 'discountDate')
      .addSelect('credit.startDate', 'startDate')
      .addSelect('credit.creditValue', 'creditValue')
      .addSelect('credit.valuePrevius', 'valuePrevius')
      .addSelect('credit.interest', 'interest')
      .addSelect('credit.state', 'state')
      .addSelect('typeCredit.name', 'nameCredit')
      .from(Credit, 'credit')
      .leftJoin(
        Affiliate,
        'affiliate',
        'credit.affiliateIdentification= affiliate.identification',
      )
      .leftJoin(User, 'user', 'affiliate.identification= user.identification')
      .leftJoin(TypeCredit, 'typeCredit', 'credit.typeCreditId=typeCredit.id '),
})
@InputType('inputViewCredit')
@ObjectType('typeCredit')
export class ViewCredit {
  @Field()
  @ViewColumn()
  id: number;

  @Field()
  @ViewColumn()
  identification: number;

  @Field()
  @ViewColumn()
  lastName: string;

  @Field()
  @ViewColumn()
  name: string;

  @Field()
  @ViewColumn()
  creditValue: number;

  @Field()
  @ViewColumn()
  valuePrevius: number;

  @Field()
  @ViewColumn()
  interest: number;

  @Field()
  @ViewColumn()
  nameCredit: string;

  @Field()
  @ViewColumn()
  state: string;

  @Field(() => Date)
  @ViewColumn()
  discountDate: Date;

  @Field()
  @ViewColumn()
  startDate: Date;
}
