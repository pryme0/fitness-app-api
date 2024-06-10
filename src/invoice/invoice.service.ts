import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceEntity } from './entities';
import { MembershipService } from '../membership/membership.service';
import { CreateInvoiceInput, InvoiceDto, UpdateInvoiceInput } from './dto';
import { InvoiceStatus } from './entities/invoice.entity';
import { MembershipAddOnEntity } from 'src/membership/entities';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
    @InjectRepository(MembershipAddOnEntity)
    private readonly membershipAddOnRepository: Repository<MembershipAddOnEntity>,
    @Inject(forwardRef(() => MembershipService))
    private readonly membershipService: MembershipService,
  ) {}

  async createInvoice(input: CreateInvoiceInput): Promise<InvoiceDto> {
    const membership = await this.membershipService.findOne(input.membershipId);

    const membershipAddOns = await this.membershipAddOnRepository.find({
      where: { membership: { id: input.membershipId } },
      relations: ['addOn'],
    });

    const addOnCost = membershipAddOns.reduce(
      (total, membershipAddOn) => total + membershipAddOn.addOn.monthlyAmount,
      0,
    );
    const membershipCost = membership.amount || 0;
    const totalCost = membershipCost + addOnCost;

    const newInvoice = this.invoiceRepository.create({
      totalCost,
      month: input.month,
      status: InvoiceStatus.UNPAID,
      membershipCost,
      addOnCost,
      membership,
      addOns: membershipAddOns.map((mao) => mao.addOn),
    });

    return await this.invoiceRepository.save(newInvoice);
  }

  async getAllInvoices(): Promise<InvoiceDto[]> {
    const invoices = await this.invoiceRepository.find({
      where: {},
      relations: ['membership', 'addOns'],
    });
    return invoices;
  }

  async getInvoiceById(id: string): Promise<InvoiceDto> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['membership', 'addOns'],
    });
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return invoice;
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
    return await this.invoiceRepository.save(updatedInvoice);
  }

  async deleteInvoice(id: string): Promise<{ id: string }> {
    const deletedInvoice = await this.invoiceRepository.delete(id);
    if (!deletedInvoice.affected) {
      throw new NotFoundException('Invoice not found');
    }
    return { id };
  }
}
