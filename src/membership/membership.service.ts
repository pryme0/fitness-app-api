import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceService } from 'src/invoice/invoice.service';
import { Repository } from 'typeorm';
import { AddOnService } from '../add-on-services/addOn.service';
import {
  CreateMembershipInput,
  MembershipDto,
  MembershipTypeEnum,
  UpdateMembershipInput,
} from './dto';
import { MembershipAddOnEntity, MembershipEntity } from './entities';

import * as dayjs from 'dayjs';
import { InvoiceStatus } from 'src/invoice/entities';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(MembershipEntity)
    private membershipRepository: Repository<MembershipEntity>,
    @InjectRepository(MembershipAddOnEntity)
    private membershipAddOnRepository: Repository<MembershipAddOnEntity>,
    private readonly addOnService: AddOnService,
    private readonly invoiceService: InvoiceService,
  ) {}

  async findAll(): Promise<MembershipDto[]> {
    return await this.membershipRepository.find({
      where: {},
      relations: ['membershipAddOns', 'invoices'],
    });
  }

  findOne(id: string): Promise<MembershipEntity> {
    return this.membershipRepository.findOne({
      where: { id },
      relations: ['membershipAddOns', 'invoices'],
    });
  }

  async create(input: CreateMembershipInput): Promise<MembershipDto> {
    const { membershipType, startDate } = input;

    const memberExists = await this.membershipRepository.findOne({
      where: {
        email: input.email,
      },
    });

    if (memberExists) {
      throw new BadRequestException('A member already exists with this email');
    }

    let dueDate: Date;
    if (membershipType === MembershipTypeEnum.AnnualBasic) {
      dueDate = new Date(startDate);
      dueDate.setFullYear(dueDate.getFullYear() + 1);
    } else if (membershipType === MembershipTypeEnum.MonthlyPremium) {
      dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + 1);
    } else {
      throw new Error('Invalid membership type');
    }

    const membership = this.membershipRepository.create({
      ...input,
      dueDate,
    });
    const savedMembership = await this.membershipRepository.save(membership);
    let addOns;
    if (input.addOnIds && input.addOnIds.length > 0) {
      addOns = await this.addOnService.findByIds(input.addOnIds);
      const membershipAddOns = addOns.map((addOn) => {
        return this.membershipAddOnRepository.create({
          membership: savedMembership,
          addOn,
        });
      });
      await this.membershipAddOnRepository.save(membershipAddOns);
    }

    await this.invoiceService.createInvoice({
      month: dayjs.utc().format('MM-YYYY'),
      membershipId: savedMembership.id,
    });

    return this.findOne(savedMembership.id);
  }

  async update(id: string, input: UpdateMembershipInput): Promise<void> {
    const memberShip = await this.membershipRepository.findOne({
      where: { id },
    });

    if (!memberShip) {
      throw new BadRequestException('Membership not found');
    }
    if (input.addOnIds) {
      const addOns = await this.addOnService.findByIds(input.addOnIds);
      input['addOns'] = addOns;
      delete input.addOnIds;
    }

    Object.assign(memberShip, input);

    await this.membershipRepository.save(memberShip);
  }

  async delete(id: string): Promise<void> {
    const membership = await this.findOne(id);
    if (membership) {
      const membershipAddOns = await this.membershipAddOnRepository.find({
        where: { membership },
      });

      await this.membershipAddOnRepository.remove(membershipAddOns);
      await this.membershipRepository.delete(id);
    }
  }
}
