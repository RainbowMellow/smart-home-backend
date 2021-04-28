import { Module } from '@nestjs/common';
import { SmartItemModule } from './smartitem/smart-item.module';
import { LogModule } from './log/log.module';

@Module({
  imports: [SmartItemModule, LogModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
