import { Module } from '@nestjs/common';
import { ContributionResolver } from './contribution.resolver';
import { ContributionService } from './contribution.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contribution } from './contribution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contribution])],
  providers: [ContributionResolver, ContributionService],
  exports: [ContributionService],
})
export class ContributionModule {}
