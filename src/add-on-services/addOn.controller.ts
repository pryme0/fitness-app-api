import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { AddOnService } from './addOn.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddOnDto, CreateAddOnInput, UpdateAddOnInput } from './dto';

@ApiTags('Addons')
@Controller('addon-services')
export class AddOnController {
  constructor(private readonly addOnService: AddOnService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all add-ons' })
  @ApiResponse({
    status: 200,
    description: 'List of add-ons retrieved successfully.',
    type: [AddOnDto],
  })
  findAll() {
    return this.addOnService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an add-on by ID' })
  @ApiResponse({
    type: AddOnDto,
    status: 200,
    description: 'Add-on retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Add-on not found.',
  })
  @ApiParam({ name: 'id', description: 'Unique identifier of the add-on' })
  findOne(@Param('id') id: string) {
    return this.addOnService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new add-on' })
  @ApiResponse({
    type: AddOnDto,
    status: 201,
    description: 'Add-on created successfully.',
  })
  @ApiBody({
    type: CreateAddOnInput,
    description: 'Details of the add-on to create',
  })
  create(@Body() input: CreateAddOnInput) {
    return this.addOnService.create(input);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing add-on' })
  @ApiResponse({
    type: AddOnDto,
    status: 200,
    description: 'Add-on updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Add-on not found.' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the add-on' })
  @ApiBody({
    type: UpdateAddOnInput,
    description: 'Updated details of the add-on',
  })
  update(@Param('id') id: string, @Body() input: UpdateAddOnInput) {
    return this.addOnService.update(id, input);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an add-on' })
  @ApiResponse({ status: 200, description: 'Add-on deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Add-on not found.' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the add-on' })
  delete(@Param('id') id: string) {
    return this.addOnService.delete(id);
  }
}
