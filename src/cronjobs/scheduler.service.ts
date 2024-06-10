import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { AddOnEntity } from 'src/add-on-services/entities';
import { InvoiceEntity, InvoiceStatus } from 'src/invoice/entities';
import { EmailService } from 'src/libs';
import {
  MembershipEntity,
  MembershipAddOnEntity,
} from 'src/membership/entities';
import { MembershipTypeEnum } from 'src/membership/dto';

@Injectable()
export class SchedulerService implements OnModuleInit {
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly membershipRepository: Repository<MembershipEntity>,
    @InjectRepository(MembershipAddOnEntity)
    private readonly membershipAddOnRepository: Repository<MembershipAddOnEntity>,
    @InjectRepository(InvoiceEntity)
    private readonly invoiceRepository: Repository<InvoiceEntity>,
    private readonly emailService: EmailService,
  ) {
    dayjs.extend(utc);
  }

  onModuleInit() {
    this.handleMembershipCron();
    this.handleAddOnCron();
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleMembershipCron() {
    console.log('**Running Cron Job**');
    const memberships = await this.membershipRepository.find();
    const today = dayjs.utc().startOf('day');

    for (const membership of memberships) {
      const { membershipType, startDate } = membership;

      if (membership.isFirstMonth) {
        let reminderDate;
        if (membershipType === MembershipTypeEnum.AnnualBasic) {
          reminderDate = dayjs
            .utc(startDate)
            .add(1, 'year')
            .subtract(7, 'day')
            .startOf('day') // Assuming 7 days before the end of the first year
            .toString();
        } else if (membershipType === MembershipTypeEnum.MonthlyPremium) {
          reminderDate = dayjs
            .utc(startDate)
            .add(1, 'month')
            .subtract(7, 'day')
            .startOf('day') // Assuming 7 days before the end of the first month
            .toString();
        }

        if (today.isSame(reminderDate)) {
          const addOnCost = membership.membershipAddOns.reduce(
            (total, membershipAddOn) =>
              total + membershipAddOn.addOn.monthlyAmount,
            0,
          );
          const totalAmount = membership.amount + addOnCost;
          const invoiceLink = `https://fitnessApp.com/link-to-invoice/${membership.id}`;

          const subject = `Fitness+ Membership Reminder - ${membership.membershipType}`;
          const body = `Dear ${membership.firstName},\n\nYour membership is due on ${membership.dueDate}.<br> The total amount due is ${totalAmount}. <br>Please find your invoice at the following link: ${invoiceLink}\n\nThank you!`;

          await this.emailService.sendReminderEmail(
            membership.email,
            subject,
            body,
          );

          // Update the membership to indicate it's no longer the first month
          membership.isFirstMonth = false;
          await this.membershipRepository.save(membership);
        }
      } else {
        let reminderDate;
        if (membershipType === MembershipTypeEnum.AnnualBasic) {
          reminderDate = dayjs
            .utc(membership.dueDate)
            .subtract(7, 'day')
            .startOf('day') // Assuming 7 days before the end of the annual period
            .toString();
        } else if (membershipType === MembershipTypeEnum.MonthlyPremium) {
          reminderDate = dayjs
            .utc(membership.dueDate)
            .subtract(7, 'day')
            .startOf('day') // Assuming 7 days before the end of the monthly period
            .toString();
        }

        if (today.isSame(reminderDate)) {
          const invoiceLink = `https://fitnessApp.com/link-to-invoice/${membership.id}`;

          const subject = `Fitness+ Membership Reminder - ${membership.membershipType}`;
          const body = `Dear ${membership.firstName},\n\nYour membership is due on ${membership.dueDate}. Please find your invoice at the following link: ${invoiceLink}\n\nThank you!`;

          await this.emailService.sendReminderEmail(
            membership.email,
            subject,
            body,
          );
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleAddOnCron() {
    console.log('**Running Addon Cron Job**');
    const membershipAddOns = await this.membershipAddOnRepository.find({
      relations: ['membership', 'addOn'],
    });
    const today = dayjs.utc().startOf('day');

    for (const membershipAddOn of membershipAddOns) {
      const nextDueDate = this.calculateNextDueDate(
        new Date(membershipAddOn.createdAt.toString()),
        membershipAddOn.addOn,
      );

      const reminderDate = dayjs
        .utc(nextDueDate)
        .subtract(7, 'day')
        .startOf('day');

      if (today.isSame(reminderDate)) {
        // Check if an invoice for this add-on service and month already exists
        const invoiceMonth = dayjs.utc(nextDueDate).format('MM-YYYY');
        const existingInvoice = await this.invoiceRepository.findOne({
          where: {
            membership: { id: membershipAddOn.membership.id },
            month: invoiceMonth,
          },
        });

        if (!existingInvoice) {
          const invoice = this.invoiceRepository.create({
            totalCost: membershipAddOn.addOn.monthlyAmount,
            month: invoiceMonth,
            status: InvoiceStatus.UNPAID,
            membershipCost: 0,
            addOnCost: membershipAddOn.addOn.monthlyAmount,
            membership: membershipAddOn.membership,
            addOns: [membershipAddOn.addOn],
          });

          await this.invoiceRepository.save(invoice);

          const invoiceLink = `https://fitnessApp.com/link-to-invoice/${membershipAddOn.membership.id}`;

          const subject = `Fitness+ Add-On Service Reminder - ${membershipAddOn.addOn.name}`;
          const body = `Dear ${membershipAddOn.membership.firstName},\n\nYour add-on service '${membershipAddOn.addOn.name}' for the month of ${invoiceMonth} is due. The total amount due is ${membershipAddOn.addOn.monthlyAmount}. Please find your invoice at the following link: ${invoiceLink}\n\nThank you!`;

          await this.emailService.sendReminderEmail(
            membershipAddOn.membership.email,
            subject,
            body,
          );
        }
      }
    }
  }

  private calculateNextDueDate(creationDate: Date, addOn: AddOnEntity): Date {
    const start = dayjs.utc(creationDate);
    const now = dayjs.utc();
    const monthsDifference = now.diff(start, 'month');
    return start.add(monthsDifference + 1, 'month').toDate(); // Calculates the next due date
  }
}
