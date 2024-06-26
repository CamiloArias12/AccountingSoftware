import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingService } from './saving.service';
import { SavingResolver } from './saving.resolver';
import { Saving } from './saving.entity';
import { TypeSavingModule } from 'src/modules/parameterization/type-saving/type-saving.module';
import { AffiliateModule } from 'src/modules/parameterization/thirds/affiliate/affiliate.module';
import { SavingSubscriber } from './saving.subscriber';

@Module({
  providers: [SavingResolver, SavingService, SavingSubscriber],
  imports: [
    TypeOrmModule.forFeature([Saving]),
    TypeSavingModule,
    AffiliateModule,
  ],
  exports: [SavingService],
})
export class SavingModule {}
