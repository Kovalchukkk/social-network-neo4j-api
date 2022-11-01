import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User, UserInput } from 'src/schema/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation()
  async createuser(@Args('userInput') userInput: UserInput): Promise<User> {
    return await this.userService.createUser(userInput);
  }

  @Query()
  async getuser(@Args('id') id: number): Promise<User> {
    return await this.userService.getUser(id);
  }

  @Mutation()
  async deleteuser(@Args('id') id: number): Promise<Boolean> {
    return await this.userService.deleteUser(id);
  }

  @Mutation()
  async updateuser(
    @Args('id') id: number,
    @Args('userInput') userInput: UserInput,
  ): Promise<User> {
    return await this.userService.updateUser(id, userInput);
  }
}
