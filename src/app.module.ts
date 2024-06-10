import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembershipModule } from './membership/membership.module';
import { AddOnModule } from './add-on-services/addOn.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database-config/data-source';
import { InvoiceModule } from './invoice/invoice.module';
import { EmailModule } from './libs';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule, SchedulerService } from './cronjobs';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MembershipModule,
    SchedulerModule,
    AddOnModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    InvoiceModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
