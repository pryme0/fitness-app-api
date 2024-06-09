import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceInput {
  @ApiProperty()
  readonly amount: number;

  @ApiProperty()
  readonly month: Date;

  @ApiProperty()
  readonly membershipId: string;
}
