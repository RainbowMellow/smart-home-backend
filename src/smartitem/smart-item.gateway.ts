import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SmartItemService } from './shared/smart-item.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class SmartItemGateway {
  constructor(private siService: SmartItemService) {}

  @WebSocketServer() server;

  @SubscribeMessage('requestSmartItems')
  handleGetAllSmartItemsEvent(@ConnectedSocket() client: Socket): void {
    const items = this.siService.getAllSmartItems();
    // this.server.emit('smartItems', items);
    client.emit('smartItems', items);
  }
}
