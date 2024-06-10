import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateMembershipInput,
  MembershipDto,
  UpdateMembershipInput,
} from './dto';

@ApiTags('Memberships')
@Controller('memberships')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get()
  @ApiOperation({ summary: 'Get all memberships' })
  @ApiResponse({
    status: 200,
    description: 'Return all memberships.',
    type: [MembershipDto],
  })
  findAll() {
    return this.membershipService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get membership by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the membership details.',
    type: MembershipDto,
  })
  @ApiResponse({ status: 404, description: 'Membership not found.' })
  findOne(@Param('id') id: string) {
    return this.membershipService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create membership' })
  @ApiResponse({
    status: 201,
    description: 'The membership has been successfully created.',
    type: MembershipDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() membership: CreateMembershipInput) {
    return this.membershipService.create(membership);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update membership' })
  @ApiResponse({
    status: 200,
    description: 'The membership has been successfully updated.',
    type: MembershipDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  update(@Param('id') id: string, @Body() membership: UpdateMembershipInput) {
    return this.membershipService.update(id, membership);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.membershipService.delete(id);
  }
}
