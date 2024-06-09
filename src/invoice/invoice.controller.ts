// invoice.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceInput, InvoiceDto, UpdateInvoiceInput } from './dto';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiOperation({ summary: 'Create an invoice' })
  @ApiBody({ type: CreateInvoiceInput })
  @Post()
  createInvoice(
    @Body() createInvoiceDto: CreateInvoiceInput,
  ): Promise<InvoiceDto> {
    return this.invoiceService.createInvoice(createInvoiceDto);
  }

  @ApiOperation({ summary: 'Get all invoices' })
  @Get()
  getAllInvoices(): Promise<InvoiceDto[]> {
    return this.invoiceService.getAllInvoices();
  }

  @ApiOperation({ summary: 'Get an invoice by ID' })
  @ApiParam({ name: 'id', description: 'Invoice ID' })
  @Get(':id')
  getInvoiceById(@Param('id') id: string): Promise<InvoiceDto> {
    return this.invoiceService.getInvoiceById(id);
  }

  @ApiOperation({ summary: 'Update an invoice by ID' })
  @ApiParam({ name: 'id', description: 'Invoice ID' })
  @ApiBody({ type: UpdateInvoiceInput })
  @Put(':id')
  updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceInput,
  ): Promise<InvoiceDto> {
    return this.invoiceService.updateInvoice(id, updateInvoiceDto);
  }

  @ApiOperation({ summary: 'Delete an invoice by ID' })
  @ApiParam({ name: 'id', description: 'Invoice ID' })
  @Delete(':id')
  deleteInvoice(@Param('id') id: string): Promise<{ id: string }> {
    return this.invoiceService.deleteInvoice(id);
  }
}
