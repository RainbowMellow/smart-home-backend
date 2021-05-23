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

  @SubscribeMessage('requestLogin')
  async handleAddUser(
    @MessageBody() user: User,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const loggedInUser = await this.userService.login(user);
    client.emit('loggedIn', loggedInUser);
  }

  @SubscribeMessage('requestLogout')
  async handleRemoveUser(
    @MessageBody() user: User,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const loggedOutUser = await this.userService.logout(user);
    client.emit('loggedOut', loggedOutUser);
  }
}
