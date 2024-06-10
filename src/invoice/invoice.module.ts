import { forwardRef, Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { MembershipModule } from '../membership/membership.module';
import { MembershipAddOnEntity } from 'src/membership/entities';

@Module({
  imports: [
    forwardRef(() => MembershipModule),

    TypeOrmModule.forFeature([InvoiceEntity, MembershipAddOnEntity]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoiceModule {}
