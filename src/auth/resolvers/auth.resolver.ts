import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserDTO } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';

@Resolver(() => CreateUserDTO)
export class AuthResolver {
  constructor(private readonly userService: UserService) {}

  //mutation Create Product Graphql
  @Mutation(() => CreateUserDTO)
  async createProduct(
    @Args('createUserDTO') createUserDTO: CreateUserDTO,
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserDTO);
  }
}
