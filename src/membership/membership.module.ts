import { forwardRef, Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { MembershipAddOnEntity, MembershipEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddOnModule } from '../add-on-services/addOn.module';
import { InvoiceModule } from 'src/invoice/invoice.module';

@Module({
  imports: [
    AddOnModule,
    forwardRef(() => InvoiceModule),
    TypeOrmModule.forFeature([MembershipEntity, MembershipAddOnEntity]),
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
