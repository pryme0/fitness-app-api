// read-invoice.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { InvoiceStatus } from '../entities/invoice.entity';
import { Timestamp } from 'typeorm';
import { MembershipDto } from 'src/membership/dto';
import { AddOnDto } from 'src/add-on-services/dto';
import { IsEnum } from 'class-validator';

export class InvoiceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  membershipCost: number;

  @ApiProperty()
  addOnCost: number;

  @ApiProperty()
  totalCost: number;

  @ApiProperty()
  month: string;

  @ApiProperty()
  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;

  @ApiProperty()
  membershipId?: string;

  @ApiProperty({ type: () => MembershipDto })
  membership: MembershipDto;

  @ApiProperty({ type: () => [AddOnDto] })
  addOns: AddOnDto[];

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
