import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';

@ObjectType()
@Entity()
export class Provider {
  @Field()
  @PrimaryColumn('bigint')
  idProvider: number;

  @Column({ default: true })
  state: boolean;
  @Field(() => Provider)
  @OneToOne(() => User, (user) => user.provider, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'idProvider' })
  user: User;
}
