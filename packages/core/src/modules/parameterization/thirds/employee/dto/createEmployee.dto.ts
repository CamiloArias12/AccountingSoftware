import { InputType, Field, Int } from '@nestjs/graphql';
import { IEmployee } from './employee.interface';

@InputType()
export class InputEmployeeCreate implements IEmployee {
  @Field()
  username: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => [Int], { nullable: true })
  roles: number[];
}
