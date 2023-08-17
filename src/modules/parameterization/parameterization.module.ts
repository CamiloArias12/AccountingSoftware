import { Module } from '@nestjs/common';
import { ThirdsModule } from './thirds/thirds.module';

@Module({
   imports:[ThirdsModule]
})
export class ParameterizationModule {}
