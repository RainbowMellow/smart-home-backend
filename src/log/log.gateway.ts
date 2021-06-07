import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { LogService } from './log.service';
import { Socket } from 'socket.io';
import { LogMessage } from './log-message.model';

@WebSocketGateway()
export class LogGateway {
  constructor(private logService: LogService) {}

  @WebSocketServer() server;

  @SubscribeMessage('requestLog')
  async handleLogRequest(@ConnectedSocket() client: Socket): Promise<void> {
    const log = await this.logService.getAllLogMessages();
    client.emit('allLogMessages', log);
  }

  @SubscribeMessage('triggerLogMessage')
  async handleNewLog(
    @MessageBody() message: LogMessage): Promise<void> {
    const loggedMessage = await this.logService.addNewLogMessage(message);
    this.server.emit('newLogMessage', loggedMessage);
  }
}
