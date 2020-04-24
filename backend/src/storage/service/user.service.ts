import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  public async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  public async getUserByUserId(userId: string): Promise<User> {
    return this.userRepository.findOne({id: userId});
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
