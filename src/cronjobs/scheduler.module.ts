import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { InvoiceEntity } from '../invoice/entities';
import { EmailService } from '../libs';
import {
  MembershipEntity,
  MembershipAddOnEntity,
} from '../membership/entities';

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
