import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsISO8601,
  Matches,
  IsArray,
  IsNotEmpty,
} from 'class-validator';
export enum MembershipTypeEnum {
  AnnualBasic = 'Annual Basic',
  MonthlyPremium = 'Monthly Premium',
}
export class UpdateMembershipInput {
  @ApiPropertyOptional({ description: 'First name of the member' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name of the member' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiPropertyOptional({ description: 'Email address of the member' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    description: 'Type of membership',
    enum: MembershipTypeEnum,
  })
  @IsEnum(MembershipTypeEnum)
  @IsOptional()
  membershipType?: string;

  @ApiPropertyOptional({ description: 'Start date of the membership' })
  @IsISO8601()
  @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'Suspension start date must be in the format YYYY-MM-DD',
  })
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({
    description:
      'Total amount for annual memberships or monthly amount for add-on services',
  })
  @IsString()
  @IsOptional()
  amount?: string;

  @ApiProperty({
    description: "Id's of addons associated with the new membership",
  })
  @IsArray()
  @IsNotEmpty()
  addOnIds: string[];
}
