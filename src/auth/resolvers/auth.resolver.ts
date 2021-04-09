import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthInput } from '../dto/inputs/auth.input';
import { UserTokenType } from '../dto/querys/user-token.type';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  //mutation - post login
  @Mutation(() => UserTokenType)
  async login(@Args('authInput') authInput: AuthInput) {
    return this.authService.signIn(authInput);
  }

  //query hello test
  @Query(() => String)
  hello() {
    return 'Hola mundo';
  }
}
