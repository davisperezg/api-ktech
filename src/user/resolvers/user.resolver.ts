import { Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //query Get Users Graphql
  @Query(() => [UserEntity])
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.findAllUsers();
  }
}
