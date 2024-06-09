import { ApiProperty } from '@nestjs/swagger';
import { Timestamp } from 'typeorm';

export class MembershipDto {
  @ApiProperty({ description: 'Unique identifier of the membership' })
  id: string;

  @ApiProperty({ description: 'First name of the member' })
  firstName: string;

  @ApiProperty({ description: 'Last name of the member' })
  lastName: string;

  @ApiProperty({ description: 'Email address of the member' })
  email: string;

  @ApiProperty({ description: 'Type of membership' })
  membershipType: string;

  @ApiProperty({ description: 'Start date of the membership' })
  startDate: Date;

  @ApiProperty({
    description:
      'Total amount for annual memberships or monthly amount for add-on services',
  })
  totalAmount: number;

  @ApiProperty({
    description:
      'Boolean flag indicating if it is the first month of the membership',
  })
  isFirstMonth: boolean;

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
