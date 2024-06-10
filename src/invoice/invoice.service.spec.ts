import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddOnService } from '../add-on-services/addOn.service';
import { MembershipAddOnEntity } from '../membership/entities';
import { MembershipService } from '../membership/membership.service';
import { InvoiceEntity, InvoiceStatus } from './entities/invoice.entity';
import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {
  let service: InvoiceService;
  let membershipService: MembershipService;
  let addOnService: AddOnService;
  let invoiceRepository: Repository<InvoiceEntity>;
  let membershipAddOnRepository: Repository<MembershipAddOnEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoiceService,
        {
          provide: MembershipService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: AddOnService,
          useValue: {
            findByIds: jest.fn(),
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
          provide: getRepositoryToken(MembershipAddOnEntity),
          useValue: {
            findByIds: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<InvoiceService>(InvoiceService);
    membershipService = module.get<MembershipService>(MembershipService);
    addOnService = module.get<AddOnService>(AddOnService);
    invoiceRepository = module.get<Repository<InvoiceEntity>>(
      getRepositoryToken(InvoiceEntity),
    );
    membershipAddOnRepository = module.get<Repository<MembershipAddOnEntity>>(
      getRepositoryToken(MembershipAddOnEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createInvoice', () => {
    it('should create a new invoice', async () => {
      const mockMembership = { id: '1', amount: 100 };
      const mockMembershipAddOns = [
        { addOn: { monthlyAmount: 20 } },
        { addOn: { monthlyAmount: 30 } },
      ];

      membershipService.findOne = jest.fn().mockResolvedValue(mockMembership);
      membershipAddOnRepository.find = jest
        .fn()
        .mockResolvedValue(mockMembershipAddOns);

      invoiceRepository.create = jest.fn().mockImplementation((entity) => ({
        ...entity,
        save: jest.fn().mockResolvedValue(entity),
      }));

      const input = { membershipId: '1', month: '05-2023' };
      const result = await service.createInvoice(input);

      expect(membershipService.findOne).toHaveBeenCalledWith('1');
      expect(membershipAddOnRepository.find).toHaveBeenCalledWith({
        where: { membership: { id: '1' } },
        relations: ['addOn'],
      });
      expect(invoiceRepository.create).toHaveBeenCalledWith({
        totalCost: 150,
        month: '05-2023',
        status: InvoiceStatus.UNPAID,
        membershipCost: 100,
        addOnCost: 50,
        membership: mockMembership,
        addOns: [{ monthlyAmount: 20 }, { monthlyAmount: 30 }],
      });
    });
  });
});
