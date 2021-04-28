import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { LogService } from './log.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class LogGateway {
  constructor(private logService: LogService) {}

  @WebSocketServer() server;

  @SubscribeMessage('requestLog')
  handleLogRequest(@ConnectedSocket() client: Socket): void {
    const log = this.logService.getAllLogMessages();
    client.emit('allLogMessages', log);
  }
}
