import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CategoryService } from './category.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class CategoryGateway {
  constructor(private categoryService: CategoryService) {}

  @WebSocketServer() server;

  @SubscribeMessage('getAllCategories')
  handleGetAllCategories(@ConnectedSocket() client: Socket): void {
    const categories = this.categoryService.readAllCategories();
    client.emit('categories', categories);
  }
}
