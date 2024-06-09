// read-invoice.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { InvoiceStatus } from '../entities/invoice.entity';
import { Timestamp } from 'typeorm';

export class InvoiceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  month: Date;

  @ApiProperty({ type: () => InvoiceStatus })
  status: InvoiceStatus;

  @ApiProperty()
  membershipId: string;

  @ApiProperty({
    description: 'Creation date',
    type: String,
    format: 'date-time',
  })
  createdAt: Timestamp;

  @ApiProperty({
    description: 'Updated dated',
    type: String,
    format: 'date-time',
  })
  updatedAt: Timestamp;
}
