import { Module } from '@nestjs/common';
import { SmartItemModule } from './smartitem/smart-item.module';

@Module({
  imports: [SmartItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
