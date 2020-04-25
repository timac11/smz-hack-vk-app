import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../entity/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
  }

  public async save(user: User): Promise<User> {
    let foundUser = await this.userRepository.findOne({id: user.id});
    console.log(foundUser);
    if (!foundUser) {
      await this.userRepository.save(user);
    } else {
      await this.userRepository.update({id: user.id}, user);
    }
    const result = await this.userRepository.findOne({where: {id: user.id}, relations: ["comptitions"]});
    console.log(result);
    return result;
  }

  public async getUserByUserId(userId: string): Promise<User> {
    return this.userRepository.findOne({id: userId});
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
