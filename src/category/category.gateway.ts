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
  async handleGetAllCategories(
    @ConnectedSocket() client: Socket): Promise<void> {
    const categories = await this.categoryService.getAllCategories();
    client.emit('categories', categories);
    console.log('all categories emitted');
  }
}
