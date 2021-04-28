import { Injectable } from '@nestjs/common';
import { LogMessage } from './log-message.model';

@Injectable()
export class LogService {
  logMessages: LogMessage[] = [];

  constructor() {
    this.seedData();
  }

  private seedData() {
    const message1: LogMessage = {
      id: 1,
      message: 'Log was created',
      user: 'Mock user',
      item: null,
      timeStamp: new Date(),
    };
    this.addNewLogMessage(message1);
  }

  getAllLogMessages(): LogMessage[] {
    return this.logMessages;
  }

  addNewLogMessage(message: LogMessage): void {
    this.logMessages.push(message);
  }
}
