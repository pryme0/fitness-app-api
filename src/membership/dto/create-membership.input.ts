import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateMembershipInput {
  @ApiProperty({ description: 'First name of the member' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'Last name of the member' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Email address of the member' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Type of membership',
    enum: ['Annual Basic', 'Monthly Premium'],
  })
  @IsEnum(['Annual Basic', 'Monthly Premium'])
  @IsNotEmpty()
  membershipType: string;

  @ApiProperty({ description: 'Start date of the membership' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description:
      'Due date for annual memberships or monthly due date for add-on services',
  })
  @IsDateString()
  @IsNotEmpty()
  dueDate: string;

  @ApiProperty({
    description:
      'Total amount for annual memberships or monthly amount for add-on services',
  })
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({
    description:
      'Boolean flag indicating if it is the first month of the membership',
  })
  @IsBoolean()
  @IsNotEmpty()
  isFirstMonth: boolean;

  @ApiProperty({
    description: "Id's of addons associated with the new membership",
  })
  @IsArray()
  @IsNotEmpty()
  addOnIds: string[];
}
