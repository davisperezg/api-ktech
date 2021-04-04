import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateUserDTO } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';

@Resolver(() => CreateUserDTO)
export class AuthResolver {
  constructor(private readonly userService: UserService) {}

  //query Get Users Graphql
  @Query(() => [UserEntity])
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.findAllUsers();
  }

  //mutation Create Product Graphql
  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUserDTO') createUserDTO: CreateUserDTO,
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserDTO);
  }
}
