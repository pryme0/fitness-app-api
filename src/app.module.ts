import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembershipModule } from './membership/membership.module';
import { AddOnServicesModule } from './add-on-services/addOn.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database-config/data-source';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    MembershipModule,
    AddOnServicesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
