import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthChangePasswordInput } from '../dto/inputs/auth-change-password.input';
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
  login(
    @Args({ name: 'authInput', type: () => AuthInput }) authInput: AuthInput,
  ) {
    return this.authService.signIn(authInput);
  }

  //mutation - post refresh token
  @Mutation(() => UserRefreshTokenType)
  refreshToken(
    @Args({ name: 'authInput', type: () => AuthRefreshTokenInput })
    authInput: AuthRefreshTokenInput,
  ) {
    return this.authService.getTokenWithRefresh(authInput);
  }

  //mutation - post change password
  @Mutation(() => Boolean)
  changePassword(
    @Args({ name: 'authInput', type: () => AuthChangePasswordInput })
    authInput: AuthChangePasswordInput,
  ) {
    return this.authService.changePassword(authInput);
  }
}
