import { BadRequestException, UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { CtxUser } from '../../lib/decorators/ctx-user.decorators';
import { GqlAuthGuard } from '../../lib/guards/gql-auth.guard';
import { UserUpdateInput } from '../dto/inputs/user-update.input';
import { UserInput } from '../dto/inputs/user.input';
import { UserType } from '../dto/querys/user.type';
import { UserDocument } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**mutation register new user
   * @recordar => name and type in
   * @Args({ name: 'input', type: () => UserInput })
   *
   * @param UserInput -> contiene algunas variables que pueden ser nulos
   */
  @Mutation(() => UserType)
  registerUser(@Args('userInput') userInput: UserInput) {
    return this.userService.createUser(userInput);
  }

  /** put user
   * @param UserUpdateInput => contiene variables que pueden ser nulos
   **/
  @Mutation(() => UserType)
  updateUser(
    @Args({ name: 'userInput', type: () => UserUpdateInput })
    userInput: UserUpdateInput,
  ) {
    return this.userService.updateUser(userInput);
  }

  //delete user
  @Mutation(() => Boolean)
  deleteUser(@Args('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  //query get users
  @Query(() => [UserType])
  getUsers(): Promise<UserDocument[]> {
    return this.userService.findAllUsers();
  }

  //query get one user
  @Query(() => UserType)
  getUser(@Args('id') id: string): Promise<UserDocument> {
    return this.userService.findOneUserById(id);
  }

  //query get me
  @Query(() => UserType)
  me(@CtxUser() user: UserDocument): Promise<UserDocument> {
    return this.userService.findOneUserById(user.id);
  }

  @Mutation(() => UserType)
  desactivateUser(@Args('id') id: string): Promise<UserDocument> {
    return this.userService.desactivateUser(id);
  }

  @Mutation(() => UserType)
  activateUser(@Args('id') id: string): Promise<UserDocument> {
    return this.userService.activarUser(id);
  }
}
