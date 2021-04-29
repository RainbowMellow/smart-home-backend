import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserService } from './user.service';
import { User } from './user.model';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class UserGateway {
  constructor(private userService: UserService) {}

  @WebSocketServer() server;

  @SubscribeMessage('addUser')
  handleAddUser(
    @MessageBody() user: User,
    @ConnectedSocket() client: Socket,
  ): void {
    const newUser = this.userService.addUser(user);
    client.emit('addedUser', newUser);
  }
}
