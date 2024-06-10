// src/addon-service/addon-service.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AddOnEntity } from './entities';
import { AddOnDto, CreateAddOnInput } from './dto';

@Injectable()
export class AddOnService {
  constructor(
    @InjectRepository(AddOnEntity)
    private AddOnEntityRepository: Repository<AddOnEntity>,
  ) {}

  async findAll(): Promise<AddOnEntity[]> {
    return await this.AddOnEntityRepository.find();
  }

  async findOne(id: string): Promise<AddOnEntity> {
    return await this.AddOnEntityRepository.findOne({ where: { id } });
  }

  async findByIds(ids: string[]): Promise<AddOnDto[]> {
    return await this.AddOnEntityRepository.findBy({ id: In(ids) });
  }

  async create(input: CreateAddOnInput): Promise<AddOnEntity> {
    return this.AddOnEntityRepository.save(input);
  }

  async update(id: string, AddOnEntity: Partial<AddOnEntity>): Promise<void> {
    await this.AddOnEntityRepository.update(id, AddOnEntity);
  }

  async delete(id: string): Promise<void> {
    await this.AddOnEntityRepository.delete(id);
  }
}
