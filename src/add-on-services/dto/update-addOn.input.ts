import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class UpdateAddOnInput {
  @ApiProperty({ description: 'Name of the add-on service', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Monthly amount for the add-on service',
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  monthlyAmount?: number;

  @ApiProperty({
    description: 'Start date of the add-on service',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: string;
}
