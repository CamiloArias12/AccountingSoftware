import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ParameterizationModule } from './modules/parameterization/parameterization.module';
import { join } from 'path';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [ParameterizationModule,
      GraphQLModule.forRoot(
	 {
	    driver:ApolloDriver,
	    autoSchemaFile:join(process.cwd(),'src/schema.gql')
	 }
      )
  ],
})
export class AppModule {}
