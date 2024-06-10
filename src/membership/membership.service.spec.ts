import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddOnService } from '../add-on-services/addOn.service';
import { InvoiceService } from '../invoice/invoice.service';
import { MembershipService } from './membership.service';
import { MembershipAddOnEntity, MembershipEntity } from './entities';
import { CreateMembershipInput, MembershipTypeEnum } from './dto';
import { In, Repository, Timestamp } from 'typeorm';
import { BadRequestException, forwardRef } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { InvoiceEntity } from '../invoice/entities';
import { InvoiceModule } from '../invoice/invoice.module';

describe('MembershipService', () => {
  let service: MembershipService;
  let membershipRepository: Repository<MembershipEntity>;
  let membershipAddOnRepository: Repository<MembershipAddOnEntity>;
  let addOnService: AddOnService;
  let invoiceService: InvoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => InvoiceModule)],
      providers: [
        MembershipService,
        {
          provide: getRepositoryToken(MembershipEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(MembershipAddOnEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(InvoiceEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: AddOnService,
          useValue: {
            findByIds: jest.fn(),
          },
        },
        {
          provide: InvoiceService,
          useValue: {
            createInvoice: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MembershipService>(MembershipService);
    membershipRepository = module.get<Repository<MembershipEntity>>(
      getRepositoryToken(MembershipEntity),
    );
    membershipAddOnRepository = module.get<Repository<MembershipAddOnEntity>>(
      getRepositoryToken(MembershipAddOnEntity),
    );
    addOnService = module.get<AddOnService>(AddOnService);
    invoiceService = module.get<InvoiceService>(InvoiceService);
  });

  describe('create', () => {
    it('should create a new membership', async () => {
      const createInput: CreateMembershipInput = {
        membershipType: MembershipTypeEnum.AnnualBasic,
        startDate: dayjs().toDate(),
        email: 'test@example.com',
        firstName: 'John Doe',
        lastName: 'John Doe',
        amount: 3000,
        addOnIds: ['4b386545-930d-410c-bf2d-fe96d6fd2fee'],
      };

      const mockMembership: MembershipEntity = {
        id: '1',
        ...createInput,
        dueDate: new Date(),
        isFirstMonth: true,
        invoices: [],
        membershipAddOns: [],
        createdAt: dayjs().toDate() as any as Timestamp,
        updatedAt: dayjs().toDate() as any as Timestamp,
      };

      jest
        .spyOn(membershipRepository, 'create')
        .mockReturnValueOnce(mockMembership);
      jest
        .spyOn(membershipRepository, 'save')
        .mockResolvedValueOnce(mockMembership);

      const result = await service.create(createInput);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty(
        'membershipType',
        createInput.membershipType,
      );
      expect(result).toHaveProperty('startDate', createInput.startDate);
      expect(result).toHaveProperty('email', createInput.email);
      expect(result).toHaveProperty('firstName', createInput.firstName);
      expect(invoiceService.createInvoice).toHaveBeenCalled();
    });

    it('should throw an error if a member already exists with the same email', async () => {
      const createInput: CreateMembershipInput = {
        membershipType: MembershipTypeEnum.AnnualBasic,
        startDate: new Date(),
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        amount: 100,
        addOnIds: ['4b386545-930d-410c-bf2d-fe96d6fd2fee'],
      };

      const mockMembership: MembershipEntity = {
        id: '1',
        membershipType: createInput.membershipType,
        startDate: new Date(createInput.startDate),
        email: createInput.email,
        firstName: `${createInput.firstName}`,
        lastName: `${createInput.lastName}`,
        dueDate: new Date(),
        isFirstMonth: true,
        invoices: [],
        amount: createInput.amount,
        membershipAddOns: [],
        createdAt: dayjs().toDate() as any as Timestamp,
        updatedAt: dayjs().toDate() as any as Timestamp,
      };

      jest
        .spyOn(membershipRepository, 'findOne')
        .mockResolvedValueOnce(mockMembership);

      await expect(service.create(createInput)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // Add more test cases for other methods as needed
});
