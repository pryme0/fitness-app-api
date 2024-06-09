import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

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
    enum: ['Annual Basic', 'Monthly Premium'],
  })
  @IsEnum(['Annual Basic', 'Monthly Premium'])
  @IsOptional()
  membershipType?: string;

  @ApiPropertyOptional({ description: 'Start date of the membership' })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({
    description:
      'Due date for annual memberships or monthly due date for add-on services',
  })
  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @ApiPropertyOptional({
    description:
      'Total amount for annual memberships or monthly amount for add-on services',
  })
  @IsString()
  @IsOptional()
  amount?: string;

  @ApiPropertyOptional({
    description:
      'Boolean flag indicating if it is the first month of the membership',
  })
  @IsBoolean()
  @IsOptional()
  isFirstMonth?: boolean;
}
