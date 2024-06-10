import { Module } from '@nestjs/common';
import { AddOnService } from './addOn.service';
import { AddOnController } from './addOn.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddOnEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([AddOnEntity])],
  controllers: [AddOnController],
  providers: [AddOnService],
  exports: [AddOnService],
})
export class AddOnModule {}
