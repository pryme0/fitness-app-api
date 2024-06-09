import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipEntity } from './entities';
import { CreateMembershipInput, MembershipDto, UpdateMembershipInput } from './dto';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(MembershipEntity)
    private membershipRepository: Repository<MembershipEntity>,
  ) {}

  findAll(): Promise<MembershipDto[]> {
    return this.membershipRepository.find();
  }

  findOne(id: string): Promise<MembershipEntity> {
    return this.membershipRepository.findOne({ where: { id } });
  }

  async create(input: CreateMembershipInput): Promise<MembershipDto> {

    const { membershipType, startDate } = input;

    let dueDate: Date;
    if (membershipType === 'Annual Basic') {
      dueDate = new Date(startDate);
      dueDate.setFullYear(dueDate.getFullYear() + 1);
    } else if (membershipType === 'Monthly Premium') {
      dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + 1);
    } else {
      throw new Error('Invalid membership type');
    }

    const membership = this.membershipRepository.create({
      ...input,
      dueDate,
    });

    return await this.membershipRepository.save(membership);
  }

  async update(
    id: string,
    membership: Partial<UpdateMembershipInput>,
  ): Promise<void> {
    await this.membershipRepository.update(id, membership);
  }

  async delete(id: string): Promise<void> {
    await this.membershipRepository.delete(id);
  }
}
