import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { CtxUser } from '../../lib/decorators/ctx-user.decorators';
import { GqlAuthGuard } from '../../lib/guards/gql-auth.guard';
import { UserInput } from '../dto/inputs/user.input';
import { UserType } from '../dto/querys/user.type';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //@reminder-> name and type in @Args({ name: 'input', type: () => UserInput })
  //mutation register new user
  //@UseGuards(GqlAuthGuard)
  @Mutation(() => UserType)
  async registerUser(@Args('userInput') userInput: UserInput) {
    return this.userService.createUser(userInput);
  }

  //query get users
  @UseGuards(GqlAuthGuard)
  @Query(() => [UserType])
  async getUsers(@CtxUser() user: UserEntity): Promise<UserEntity[]> {
    console.log(user);
    return await this.userService.findAllUsers();
  }
}
