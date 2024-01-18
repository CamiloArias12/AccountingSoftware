import { Affiliate } from 'src/modules/parameterization/thirds/affiliate/affiliate.entity';
import { User } from 'src/modules/parameterization/thirds/user/user.entity';
import { DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { TypeSaving } from 'src/modules/parameterization/type-saving/type-saving.entity';
import { Saving } from './saving.entity';

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select('user.identification', 'identification')
      .addSelect('user.name', 'name')
      .addSelect('user.lastName', 'lastName')
      .addSelect('saving.id', 'id')
      .addSelect('saving.state', 'state')
      .addSelect('saving.qoutaValue', 'qoutaValue')
      .addSelect('saving.startDate', 'startDate')
      .addSelect('typeSaving.name', 'nameSaving')
      .from(Saving, 'saving')
      .leftJoin(
        Affiliate,
        'affiliate',
        'saving.affiliateIdAffiliate= affiliate.idAffiliate',
      )
      .leftJoin(User, 'user', 'affiliate.idAffiliate= user.identification')
      .leftJoin(TypeSaving, 'typeSaving', 'saving.typeSavingId=typeSaving.id '),
})
@ObjectType()
export class ViewSaving {
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
  qoutaValue: number;

  @Field()
  @ViewColumn()
  startDate: Date;

  @Field()
  @ViewColumn()
  state: string;

  @Field()
  @ViewColumn()
  nameSaving: string;
}
