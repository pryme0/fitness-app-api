// src/addon-service/addon-service.controller.ts
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AddOnEntity } from './entities';
import { AddOnService } from './addOn.service';

@Controller('addon-services')
export class AddOnController {
  constructor(private readonly addOnService: AddOnService) {}

  @Get()
  findAll() {
    return this.addOnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addOnService.findOne(id);
  }

  @Post()
  create(@Body() addOnEntity: AddOnEntity) {
    return this.addOnService.create(addOnEntity);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() addOnEntity: Partial<AddOnEntity>) {
    return this.addOnService.update(id, addOnEntity);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.addOnService.delete(id);
  }
}
