import { Module } from '@nestjs/common';
import { SmartItemGateway } from './smart-item.gateway';
import { SmartItemService } from './shared/smart-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartItemEntity } from '../infrastructure/data-source/entities/smartItem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SmartItemEntity])],
  providers: [SmartItemGateway, SmartItemService],
})
export class SmartItemModule {}
