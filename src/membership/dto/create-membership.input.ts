import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsArray,
  IsISO8601,
  Matches,
  IsNumber,
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
  @IsNotEmpty()
  @IsISO8601()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'Suspension start date must be in the format YYYY-MM-DD',
  })
  startDate: string;

  @ApiProperty({
    description: 'Total amount for annual or monthly memberships',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: "Id's of addons associated with the new membership",
  })
  @IsArray()
  @IsNotEmpty()
  addOnIds: string[];
}
