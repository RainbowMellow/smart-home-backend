import { Module } from '@nestjs/common';
import { SmartItemGateway } from './smart-item.gateway';
import { SmartItemService } from './shared/smart-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmartItemEntity } from '../infrastructure/data-source/entities/smartItem.entity';
import { LogService } from "../log/log.service";
import { LogMessageEntity } from "../infrastructure/data-source/entities/log-message.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SmartItemEntity, LogMessageEntity])],
  providers: [SmartItemGateway, SmartItemService, LogService],
})
export class SmartItemModule {}
