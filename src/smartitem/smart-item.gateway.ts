import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SmartItemService } from './shared/smart-item.service';
import { Socket } from 'socket.io';
import { SmartItem } from './shared/smart-item.model';
import { CreateSmartItemDto } from '../infrastructure/data-source/dtos/createSmartItem.dto';
import { EditSmartItemDto } from '../infrastructure/data-source/dtos/editSmartItem.dto';

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

  @SubscribeMessage('deleteSmartItem')
  handleDeleteSmartItem(@MessageBody() item: SmartItem) {
    const deletedItem = this.siService.deleteSmartItem(item);
    this.server.emit('deletedSmartItem', deletedItem);
  }

  @SubscribeMessage('editSmartItem')
  handleEditSmartItem(@MessageBody() item: EditSmartItemDto) {
    const editedItem = this.siService.editSmartItem(item);
    this.server.emit('editedSmartItem', editedItem);
  }

  @SubscribeMessage('createSmartItem')
  handleCreateSmartItem(@MessageBody() item: CreateSmartItemDto) {
    const createdSmartItem = this.siService.createSmartItem(item);
    this.server.emit('createdSmartItem', createdSmartItem);
  }
}
