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

  login(user: User): User {
    // can be changed later
    return this.addUser(user);
  }
}
