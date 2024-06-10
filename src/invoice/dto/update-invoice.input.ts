import { ApiProperty } from '@nestjs/swagger';
import { InvoiceStatus } from '../entities/invoice.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateInvoiceInput {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  month: Date;

  @ApiProperty()
  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;
}
