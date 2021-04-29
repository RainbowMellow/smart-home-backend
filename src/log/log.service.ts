import { Injectable } from '@nestjs/common';
import { LogMessage } from './log-message.model';

@Injectable()
export class LogService {
  logMessages: LogMessage[] = [];
  nextId = 1;

  constructor() {
    this.seedData();
  }

  private seedData() {
    const message1: LogMessage = {
      message: 'Log was created',
      item: null,
      timeStamp: new Date(),
    };
    const message2: LogMessage = {
      message: 'All items are off',
      item: null,
      timeStamp: new Date(),
    };
    this.addNewLogMessage(message1);
    this.addNewLogMessage(message2);
  }

  getAllLogMessages(): LogMessage[] {
    return this.logMessages;
  }

  addNewLogMessage(message: LogMessage): LogMessage {
    message.id = this.nextId++;
    this.logMessages.push(message);
    return message;
  }
}
