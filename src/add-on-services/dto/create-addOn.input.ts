import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateAddOnInput {
  @ApiProperty({ description: 'Name of the add-on service' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Monthly amount for the add-on service' })
  @IsNumber()
  @Min(0)
  monthlyAmount: number;

  @ApiProperty({ description: 'Start date of the add-on service' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'ID of the membership associated with the add-on',
  })
  @IsString()
  @IsNotEmpty()
  membershipId: string;
}
