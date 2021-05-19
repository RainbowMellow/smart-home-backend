import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  users: User[] = [];
  nextId = 1;

  addUser(user: User): User {
    user.id = this.nextId++;
    this.users.push(user);
    return user;
  }

  removeUser(user: User): User {
    this.users.filter((u) => u.id === user.id);
    return user;
  }

  login(user: User): User {
    // can be changed later
    return this.addUser(user);
  }

  logout(user: User): User {
    return this.removeUser(user);
  }
}
