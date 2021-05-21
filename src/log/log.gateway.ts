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
  handleLogRequest(@ConnectedSocket() client: Socket): void {
    const log = this.logService.getAllLogMessages();
    client.emit('allLogMessages', log);
  }

  @SubscribeMessage('triggerLogMessage')
  handleNewLog(
    @MessageBody() message: LogMessage,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('logmessage', message.message);
    const loggedMessage = this.logService.addNewLogMessage(message);
    this.server.emit('newLogMessage', loggedMessage);
  }
}
