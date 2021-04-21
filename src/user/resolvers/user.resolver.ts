import { BadRequestException, UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { CtxUser } from '../../lib/decorators/ctx-user.decorators';
import { GqlAuthGuard } from '../../lib/guards/gql-auth.guard';
import { UserUpdateInput } from '../dto/inputs/user-update.input';
import { UserInput } from '../dto/inputs/user.input';
import { UserType } from '../dto/querys/user.type';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Resolver()
//@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //Se formatea a trim() anulando los espacios o tabs ingresados en el input
  // async InputFormated(user: UserInput, id?: string): Promise<UserInput> {
  //   const { name, lastName, email, password, confirmPassword, role } = user;
  //   //varibale para el update
  //   let findUserRegistered: UserEntity;

  //   //id para el update
  //   if (id) {
  //     try {
  //       findUserRegistered = await this.userService.findOneUserById(id);
  //     } catch (e) {
  //       throw new Error(`Error en UserResolver.InputFormated ${e}`);
  //     }

  //     if (!findUserRegistered)
  //       throw new BadRequestException(`Usuario no existe en el resolver`);
  //   }
  //   console.log(role);
  //   return {
  //     name: name ? name.trim() : findUserRegistered.name,
  //     lastName: lastName ? lastName.trim() : findUserRegistered.lastName,
  //     email: email ? email.trim() : findUserRegistered.email,
  //     password,
  //     confirmPassword,
  //     role: role,
  //   };
  // }

  /**mutation register new user
   * @recordar => name and type in
   * @Args({ name: 'input', type: () => UserInput })
   *
   * @param UserInput -> contiene algunas variables que pueden ser nulos
   */
  @Mutation(() => UserType)
  async registerUser(@Args('userInput') userInput: UserInput) {
    // const inputUserFormated = await this.InputFormated({
    //   name: userInput.name,
    //   lastName: userInput.lastName,
    //   email: userInput.email,
    //   password: userInput.password,
    //   confirmPassword: userInput.confirmPassword,
    //   role: userInput.role,
    // });

    return await this.userService.createUser(userInput);
  }

  /** Put user
   * @param UserUpdateInput => contiene variables que pueden ser nulos
   **/
  // @Mutation(() => UserType)
  // async updateUser(
  //   @Args('id') id: string,
  //   @Args('userInput') userInput: UserUpdateInput,
  // ) {
  //   console.log(userInput);
  //   const inputUserFormated = await this.InputFormated(
  //     {
  //       name: userInput.name,
  //       lastName: userInput.lastName,
  //       email: userInput.email,
  //       password: userInput.password,
  //       confirmPassword: userInput.confirmPassword,
  //       role: userInput.role,
  //     },
  //     id,
  //   );

  //   return await this.userService.updateUser(id, inputUserFormated);
  // }

  //Delete user
  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string) {
    return await this.userService.deleteUserById(id);
  }

  //query get users
  @Query(() => [UserType])
  async getUsers(@CtxUser() user: UserEntity): Promise<UserEntity[]> {
    console.log(user);
    return await this.userService.findAllUsers();
  }
}
