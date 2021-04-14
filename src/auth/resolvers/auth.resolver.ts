import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthRefreshTokenInput } from '../dto/inputs/auth-refresh-token.input';
import { AuthInput } from '../dto/inputs/auth.input';
import { UserRefreshTokenType } from '../dto/querys/user-refresh-token.type';
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

  //mutation - post refresh token
  @Mutation(() => UserRefreshTokenType)
  async refreshToken(
    @Args('authRefreshTokenInput') authRefreshTokenInput: AuthRefreshTokenInput,
  ) {
    return this.authService.getTokenWithRefresh(authRefreshTokenInput);
  }

  //query hello test
  @Query(() => String)
  hello() {
    return 'Hola mundo';
  }
}
