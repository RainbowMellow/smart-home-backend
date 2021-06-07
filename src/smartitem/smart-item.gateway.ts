import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SmartItemService } from './shared/smart-item.service';
import { Socket } from 'socket.io';
import { CreateSmartItemDto } from '../infrastructure/data-source/dtos/createSmartItem.dto';
import { EditSmartItemDto } from '../infrastructure/data-source/dtos/editSmartItem.dto';
import { ToggleSmartItemDto } from '../infrastructure/data-source/dtos/toggleSmartItem.dto';
import { DeleteSmartItemDto } from '../infrastructure/data-source/dtos/deleteSmartItem.dto';
import { LogService } from '../log/log.service';
import { LogMessage } from '../log/log-message.model';
import { SmartItem } from './shared/smart-item.model';
import { timestamp } from 'rxjs/operators';

@WebSocketGateway()
export class SmartItemGateway {
  constructor(
    private siService: SmartItemService,
    private logService: LogService,
  ) {}

  @WebSocketServer() server;

  @SubscribeMessage('requestSmartItems')
  async handleGetAllSmartItemsEvent(
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const items = await this.siService.getAllSmartItems();
    client.emit('smartItems', items);
  }

  @SubscribeMessage('deleteSmartItem')
  async handleDeleteSmartItem(
    @MessageBody() item: DeleteSmartItemDto,
  ): Promise<void> {
    const returnedItem: SmartItem = await this.siService.getSmartItemById(
      item.id,
    );
    await this.siService.deleteSmartItem(item.id);
    const logMessage = await this.logService.addNewLogMessage({
      timeStamp: new Date(),
      item: returnedItem,
      userString: item.userName,
      message: `${returnedItem.name} was deleted`,
    });
    this.server.emit('deletedSmartItem', item.id);
    this.server.emit('newLogMessage', logMessage);
  }

  @SubscribeMessage('editSmartItem')
  async handleEditSmartItem(
    @MessageBody() item: EditSmartItemDto,
  ): Promise<void> {
    const editedItem = await this.siService.editSmartItem(item);
    const logMessage = await this.logService.addNewLogMessage({
      timeStamp: new Date(),
      item: editedItem,
      userString: item.userName,
      message: `${editedItem.name} was updated`,
    });
    this.server.emit('editedSmartItem', editedItem);
    this.server.emit('newLogMessage', logMessage);
  }

  @SubscribeMessage('createSmartItem')
  async handleCreateSmartItem(
    @MessageBody() item: CreateSmartItemDto,
  ): Promise<void> {
    const createdSmartItem = await this.siService.createSmartItem(item);
    const logMessage = await this.logService.addNewLogMessage({
      timeStamp: new Date(),
      item: createdSmartItem,
      userString: item.userName,
      message: `${createdSmartItem.name} was created`,
    });
    this.server.emit('createdSmartItem', createdSmartItem);
    this.server.emit('newLogMessage', logMessage);
  }

  @SubscribeMessage('toggleSmartItem')
  async handleToggleSmartItem(
    @MessageBody() item: ToggleSmartItemDto,
  ): Promise<void> {
    const toggledItem = await this.siService.toggleSmartItem(item);
    const returnedItem: SmartItem = await this.siService.getSmartItemById(
      item.id,
    );
    const onOff: string = toggledItem.on ? 'was turned on' : 'was turned off';
    const logMessage = await this.logService.addNewLogMessage({
      timeStamp: new Date(),
      userString: item.userName,
      item: returnedItem,
      message: `${returnedItem.name} ${onOff}`,
    });
    this.server.emit('toggledSmartItem', toggledItem);
    this.server.emit('newLogMessage', logMessage);
  }
}
