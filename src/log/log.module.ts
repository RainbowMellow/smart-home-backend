import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogGateway } from './log.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogMessageEntity } from '../infrastructure/data-source/entities/log-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogMessageEntity])],
  providers: [LogService, LogGateway],
})
export class LogModule {}
