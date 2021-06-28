import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import {
  AuthChangePasswordInputToUser,
  AuthChangePasswordInputToAdmin,
} from '../dto/inputs/auth-change-password.input';
import { AuthRefreshTokenInput } from '../dto/inputs/auth-refresh-token.input';
import { AuthInput } from '../dto/inputs/auth.input';
import { UserRefreshTokenType } from '../dto/querys/user-refresh-token.type';
import { UserTokenType } from '../dto/querys/user-token.type';
import { AuthService } from '../services/auth.service';
import { GqlAuthGuard } from 'src/lib/guards/gql-auth.guard';

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
  @UseGuards(GqlAuthGuard)
  changePasswordToUser(
    @Args({ name: 'authInput', type: () => AuthChangePasswordInputToUser })
    authInput: AuthChangePasswordInputToUser,
  ) {
    return this.authService.changePasswordToUser(authInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  changePasswordToAdmin(
    @Args({ name: 'authInput', type: () => AuthChangePasswordInputToAdmin })
    authInput: AuthChangePasswordInputToAdmin,
  ) {
    return this.authService.changePasswordToAdmin(authInput);
  }
}
