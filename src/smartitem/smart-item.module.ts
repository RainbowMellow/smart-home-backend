import { Module } from '@nestjs/common';
import { SmartItemGateway } from './smart-item.gateway';
import { SmartItemService } from './shared/smart-item.service';

@Module({
  providers: [SmartItemGateway, SmartItemService],
})
export class SmartItemModule {}
