import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { AddOnService } from './addOn.service';
import { AddOnEntity } from './entities/addOn.entity'; // Adjust the path as necessary
import { CreateAddOnInput } from './dto/create-addOn.input'; // Adjust the path as necessary
import * as dayjs from 'dayjs';

describe('AddOnService', () => {
  let service: AddOnService;
  let repository: Repository<AddOnEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddOnService,
        {
          provide: getRepositoryToken(AddOnEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AddOnService>(AddOnService);
    repository = module.get<Repository<AddOnEntity>>(
      getRepositoryToken(AddOnEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of addOn entities', async () => {
      const addOns: AddOnEntity[] = [
        {
          id: '1',
          name: 'Personal Training',
          monthlyAmount: 50,
          description: 'Personal training sessions',
          createdAt: dayjs().toDate() as any as Timestamp,
          updatedAt: dayjs().toDate() as any as Timestamp,
          invoices: [],
          membershipAddOns: [],
        },
        {
          id: '2',
          name: 'Nutrition Counseling',
          monthlyAmount: 30,
          description: 'Nutrition counseling sessions',
          createdAt: dayjs().toDate() as any as Timestamp,
          updatedAt: dayjs().toDate() as any as Timestamp,
          invoices: [],
          membershipAddOns: [],
        },
      ];
      jest.spyOn(repository, 'find').mockResolvedValue(addOns);

      const result = await service.findAll();

      expect(result).toEqual(addOns);
    });
  });

  describe('findOne', () => {
    it('should return an addOn entity by id', async () => {
      const addOn: AddOnEntity = {
        id: '1',
        name: 'Personal Training',
        monthlyAmount: 50,
        description: 'Personal training sessions',
        createdAt: dayjs().toDate() as any as Timestamp,
        updatedAt: dayjs().toDate() as any as Timestamp,
        invoices: [],
        membershipAddOns: [],
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(addOn);

      const result = await service.findOne('1');

      expect(result).toEqual(addOn);
    });
  });

  describe('create', () => {
    it('should create a new addOn entity', async () => {
      const input: CreateAddOnInput = {
        name: 'Yoga Classes',
        monthlyAmount: 20,
        description: 'Yoga classes add on',
      };
      const addOn: AddOnEntity = {
        id: '1',
        ...input,
        createdAt: dayjs().toDate() as any as Timestamp,
        updatedAt: dayjs().toDate() as any as Timestamp,
        invoices: [],
        membershipAddOns: [],
      };
      jest.spyOn(repository, 'save').mockResolvedValue(addOn);

      const result = await service.create(input);

      expect(result).toEqual(addOn);
    });
  });
});
