import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserInput } from 'src/user/dto/inputs/user.input';
import { UserType } from 'src/user/dto/querys/user.type';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/services/user.service';
import { AuthInput } from '../dto/inputs/auth.input';
import { UserTokenType } from '../dto/querys/user-token.type';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => UserTokenType)
  async login(
    @Args({ name: 'input', type: () => AuthInput }) input: AuthInput,
  ) {
    return this.authService.signIn(input);
  }

  @Mutation(() => UserType)
  async registerUser(
    @Args({ name: 'input', type: () => UserInput }) input: UserInput,
  ) {
    return this.userService.createUser(input);
  }

  // //query Get Users Graphql
  @Query(() => String)
  getUsers() {
    return 'Hola mundo';
  }

  // //query Get Users Graphql
  // @Query(() => [UserEntity])
  // async getUsers(): Promise<UserEntity[]> {
  //   return await this.userService.findAllUsers();
  // }

  // //mutation Create Product Graphql
  // @Mutation(() => UserEntity)
  // async createUser(
  //   @Args('createUserDTO') createUserDTO: CreateUserDTO,
  // ): Promise<UserEntity> {
  //   return await this.userService.createUser(createUserDTO);
  // }
}
