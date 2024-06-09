// invoice.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { CreateInvoiceInput, InvoiceDto, UpdateInvoiceInput } from './dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
  ) {}

  async createInvoice(input: CreateInvoiceInput): Promise<InvoiceDto> {
    const newInvoice = this.invoiceRepository.create(input);
    const savedInvoice = await this.invoiceRepository.save(newInvoice);
    return this.mapToReadDto(savedInvoice);
  }

  async getAllInvoices(): Promise<InvoiceDto[]> {
    const invoices = await this.invoiceRepository.find();
    return invoices.map(this.mapToReadDto);
  }

  async getInvoiceById(id: string): Promise<InvoiceDto> {
    const invoice = await this.invoiceRepository.findOne({ where: { id } });
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return this.mapToReadDto(invoice);
  }

  async updateInvoice(
    id: string,
    input: UpdateInvoiceInput,
  ): Promise<InvoiceDto> {
    const existingInvoice = await this.invoiceRepository.findOne({
      where: { id },
    });
    if (!existingInvoice) {
      throw new NotFoundException('Invoice not found');
    }
    const updatedInvoice = Object.assign(existingInvoice, input);
    const savedInvoice = await this.invoiceRepository.save(updatedInvoice);
    return this.mapToReadDto(savedInvoice);
  }

  async deleteInvoice(id: string): Promise<{ id: string }> {
    const deletedInvoice = await this.invoiceRepository.delete(id);
    if (!deletedInvoice.affected) {
      throw new NotFoundException('Invoice not found');
    }
    return { id };
  }

  private mapToReadDto(invoice: InvoiceEntity): InvoiceDto {
    return {
      ...invoice,
      membershipId: invoice.membership.id,
    };
  }
}
