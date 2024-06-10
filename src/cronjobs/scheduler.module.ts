import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { InvoiceEntity } from 'src/invoice/entities';
import { EmailService } from 'src/libs';
import {
  MembershipEntity,
  MembershipAddOnEntity,
} from 'src/membership/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MembershipEntity,
      MembershipAddOnEntity,
      InvoiceEntity,
    ]),
  ],
  providers: [SchedulerService, EmailService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
