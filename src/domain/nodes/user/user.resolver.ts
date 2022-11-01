import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query()
  async getUser(@Args('name') name: string) {
    return await this.userService.getUser(name);
  }
}
