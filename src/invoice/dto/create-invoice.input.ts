import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsISO8601, Matches, IsUUID } from 'class-validator';

export class CreateInvoiceInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601()
  @Matches(/^(0[1-9]|1[0-2])-\d{4}$/, {
    message: 'Month must be in the format MM-YYYY',
  })
  month: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  membershipId: string;
}
