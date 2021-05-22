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
  async handleGetAllSmartItemsEvent(@ConnectedSocket() client: Socket): Promise<void> {
    const items = await this.siService.getAllSmartItems();
    // this.server.emit('smartItems', items);
    client.emit('smartItems', items);
    console.log('smartitems emitted');
  }

  @SubscribeMessage('deleteSmartItem')
  async handleDeleteSmartItem(@MessageBody() item: SmartItem): Promise<void> {
    const deletedItem = await this.siService.deleteSmartItem(item);
    this.server.emit('deletedSmartItem', deletedItem);
  }

  @SubscribeMessage('editSmartItem')
  async handleEditSmartItem(@MessageBody() item: EditSmartItemDto): Promise<void> {
    const editedItem = await this.siService.editSmartItem(item);
    this.server.emit('editedSmartItem', editedItem);
  }

  @SubscribeMessage('createSmartItem')
  async handleCreateSmartItem(@MessageBody() item: CreateSmartItemDto): Promise<void> {
    const createdSmartItem = await this.siService.createSmartItem(item);
    this.server.emit('createdSmartItem', createdSmartItem);
  }
}
