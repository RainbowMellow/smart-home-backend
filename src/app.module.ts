import { Module } from '@nestjs/common';
import { SmartItemModule } from './smartitem/smart-item.module';
import { LogModule } from './log/log.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SmartItemModule, LogModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
