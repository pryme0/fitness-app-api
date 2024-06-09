import { ApiProperty } from '@nestjs/swagger';
import { InvoiceStatus } from '../entities/invoice.entity';

export class UpdateInvoiceInput {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  month: Date;

  @ApiProperty()
  status: InvoiceStatus;
}
