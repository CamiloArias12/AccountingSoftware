

import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value); // value from the client
  }

  serialize(value: Date): string{
    return new Date(value).toISOString().split("T",1)[0]// value sent to the client
  }

  parseLiteral(ast: ValueNode): Date {
     console.log("ast",ast)
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}

