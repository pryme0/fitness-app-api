import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { InvoiceDto } from 'src/invoice/dto';
import { MembershipDto } from 'src/membership/dto';
import { Timestamp } from 'typeorm';

export class AddOnDto {
  @ApiProperty({ description: 'Id of the add-on service' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Name of the add-on service' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Name of the add-on service' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Monthly amount for the add-on service' })
  @IsNumber()
  @Min(0)
  monthlyAmount: number;

  // @ApiProperty({
  //   description: 'ID of the membership associated with the add-on',
  //   type: () => MembershipDto,
  // })
  // memberships: MembershipDto[];

  @ApiProperty({
    description: 'Invoices of the add-on service',
    type: () => [InvoiceDto],
  })
  invoices: InvoiceDto[];

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
