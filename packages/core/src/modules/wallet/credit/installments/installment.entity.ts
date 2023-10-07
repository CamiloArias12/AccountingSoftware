import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Credit } from "../credit.entity";

@ObjectType()
@Entity()
export class Installment {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    number?: number;

    @Field()
    @Column('date')
    paymentDate: Date;

    @Field()
    @Column('decimal')
    initialBalance: number;

    @Field()
    @Column('decimal')
    scheduledPayment: number;

    @Field()
    @Column('decimal')
    extraPayment: number;

    @Field()
    @Column('decimal')
    totalPayment: number;

    @Field()
    @Column('decimal')
    capital: number;

    @Field()
    @Column('decimal')
    interest: number;

    @Field()
    @Column('decimal')
    finalBalance: number;

    @Column()
    credit_id: number;

    @Field(() => Credit)
    @ManyToOne(() => Credit, credit => credit.installments)
    @JoinColumn({ name: 'credit_id' })
    credit: Credit;
}



