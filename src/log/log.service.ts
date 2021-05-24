import { Injectable } from '@nestjs/common';
import { LogMessage } from './log-message.model';
import { InjectRepository } from '@nestjs/typeorm';
import { LogMessageEntity } from '../infrastructure/data-source/entities/log-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {
  noMessagesRetrievedOnLogin = 10;

  constructor(
    @InjectRepository(LogMessageEntity)
    private logRepo: Repository<LogMessageEntity>,
  ) {
    this.seedLogMessages(true);
  }

  private async seedLogMessages(cleandb: boolean): Promise<void> {
    if (cleandb) {
      const messages: LogMessage[] = await this.getAllLogMessages();
      messages.forEach((message) => this.deleteLogMessage(message.id));
    }
    if ((await this.logRepo.count()) == 0) {
      const message1: LogMessage = {
        userString: '',
        message: 'Log was created',
        timeStamp: new Date(),
      };
      const message2: LogMessage = {
        userString: '',
        message: 'All items are off',
        timeStamp: new Date(),
      };
      await this.addNewLogMessage(message1);
      await this.addNewLogMessage(message2);
    }
  }

  async getAllLogMessages(): Promise<LogMessage[]> {
    return await this.logRepo.find({
      relations: ['item'],
      order: { id: 'DESC' },
      take: this.noMessagesRetrievedOnLogin,
    });
  }

  async addNewLogMessage(message: LogMessage): Promise<LogMessage> {
    const createdMessage = this.logRepo.create();
    createdMessage.message = message.message;
    createdMessage.userString = message.userString;
    createdMessage.item = message.item;
    createdMessage.timeStamp = message.timeStamp;
    return await this.logRepo.save(createdMessage);
  }

  async deleteLogMessage(id: number): Promise<boolean> {
    await this.logRepo.delete({ id: id });
    return !(await this.logRepo.findOne(id));
  }
}
