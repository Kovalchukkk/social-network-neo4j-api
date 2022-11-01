import { Injectable } from '@nestjs/common';
import { User, UserInput } from 'src/schema/graphql';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userInput: UserInput): Promise<User> {
    return await this.userRepository.createUser(userInput);
  }

  async deleteUser(id: number): Promise<Boolean> {
    return await this.userRepository.deleteUser(id);
  }

  async getUser(id: number): Promise<User> {
    return await this.userRepository.getUser(id);
  }

  async updateUser(id: number, userInput: UserInput): Promise<User> {
    return await this.userRepository.updateUser(id, userInput);
  }
}
