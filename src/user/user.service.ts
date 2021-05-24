import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../infrastructure/data-source/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  nextId = 1; // for in-memory purposes

  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async addUser(user: User): Promise<User> {
    const createdUser = this.userRepo.create();
    createdUser.name = user.name;
    return await this.userRepo.save(createdUser);
  }

  async removeUser(id: number): Promise<boolean> {
    await this.userRepo.delete({ id: id });
    return !(await this.getUser(id));
  }

  async getUser(id: number): Promise<User> {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  // change later - right now adding users to database could cause problems
  async login(user: User): Promise<User> {
    // return this.addUser(user);
    user.id = this.nextId++;
    return user;
  }

  // change later
  async logout(user: User): Promise<User> {
    // return this.removeUser(user);
    return user;
  }
}
