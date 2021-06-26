import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserDocument } from 'src/user/schemas/user.schema';
import { AuthInput } from '../dto/inputs/auth.input';
import { UserTokenType } from '../dto/querys/user-token.type';
import { AuthHelper } from 'src/lib/helpers/auth.helper';
import { uid, suid } from 'rand-token';
import { JwtService } from '@nestjs/jwt';
import { JwtType } from '../dto/querys/jwt.type';
import { UserRefreshTokenType } from '../dto/querys/user-refresh-token.type';
import { AuthRefreshTokenInput } from '../dto/inputs/auth-refresh-token.input';
import {
  AuthChangePasswordInputToUser,
  AuthChangePasswordInputToAdmin,
} from '../dto/inputs/auth-change-password.input';
import { UserService } from 'src/user/services/user.service';

const refreshTokens = {};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  //login user
  async signIn(authInput: AuthInput): Promise<UserTokenType> {
    const { email, password } = authInput;
    const refresh_token = uid(256);

    //find user by email
    const findUser = await this.userService.findOneUserByEmail(
      email,
      'noexist',
    );

    //verify password with password hashed in db
    const isMatch = await AuthHelper.comparePassword(
      password,
      findUser.password,
    );

    //if does not exist
    if (!isMatch)
      throw new BadRequestException({
        path: 'password',
        message: 'Contraseña inválida',
      });

    //email in refresh token
    refreshTokens[refresh_token] = email;

    //return {access_token and refresh_token}
    return { access_token: this.getToken(findUser._id), refresh_token };
  }

  //Change password to USER
  async changePasswordToUser(
    userPassword: AuthChangePasswordInputToUser,
  ): Promise<boolean> {
    let result = false;
    let isMatch: boolean;
    const {
      id,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = userPassword;

    try {
      //get true or false password
      isMatch = await this.getMatchPasswordById(id, currentPassword);
    } catch (e) {
      throw new Error(`Error en AuthService.changePassword ${e}`);
    }

    //if password is incorrect
    if (!isMatch) return result;

    try {
      //hash new password
      const password = await AuthHelper.hashPassword(newPassword);

      //hash confirm new password
      const confirmPassword = await AuthHelper.hashPassword(confirmNewPassword);

      //update password of user by id
      await this.userService.findOneUserByIdAndUpdate(id, {
        password,
        confirmPassword,
      });

      //if password is true => password changed
      result = true;
    } catch (e) {
      throw new Error(`Error en AuthService.changePasswordToUser ${e}`);
    }

    return result;
  }

  //Change password to ADMIN
  async changePasswordToAdmin(
    userPassword: AuthChangePasswordInputToAdmin,
  ): Promise<boolean> {
    let result: boolean;

    const { id, newPassword, confirmNewPassword } = userPassword;

    try {
      //hash new password
      const password = await AuthHelper.hashPassword(newPassword);

      //hash confirm new password
      const confirmPassword = await AuthHelper.hashPassword(confirmNewPassword);

      //update password of user by id
      await this.userService.findOneUserByIdAndUpdate(id, {
        password,
        confirmPassword,
      });

      result = true;
    } catch (e) {
      throw new Error(`Error en AuthService.changePasswordToAdmin ${e}`);
    }

    return result;
  }

  //method to validate token with refresh-token v0.0.1
  async getTokenWithRefresh(
    authRefreshTokenInput: AuthRefreshTokenInput,
  ): Promise<UserRefreshTokenType> {
    const email = authRefreshTokenInput.email;
    const refreshToken = authRefreshTokenInput.refresh_token;

    //verify if exist refresh token and email in refresh token, is correct  ?
    if (
      refreshToken in refreshTokens &&
      refreshTokens[refreshToken] === email
    ) {
      //find user by email
      const findUser = await this.userService.findOneUserByEmail(
        email,
        'noexist',
      );

      //return { access_token }
      return { access_token: this.getToken(findUser._id) };
    } else {
      throw new UnauthorizedException();
    }
  }

  //validate user searching by id to jwt.strategies.ts
  async validateUser(id: string): Promise<UserDocument> {
    //find user by Id
    return await this.userService.findOneUserById(id);
  }

  //get true or false in password
  async getMatchPasswordById(id: string, myPassword: string): Promise<boolean> {
    let isMatch: boolean;
    //find user by Id
    const findUser = await this.userService.findOneUserById(id);

    try {
      //isMatch = true => password changed successfully
      //isMatch = false => current password is incorrect
      isMatch = await AuthHelper.comparePassword(myPassword, findUser.password);
    } catch (e) {
      throw new Error(
        `Error en AuthService.getMatchPasswordById.comparePassword ${e}`,
      );
    }

    return isMatch;
  }

  //method to get token in login
  getToken(id: string): string {
    const payload: JwtType = { userId: id };
    return this.jwt.sign(payload);
  }
}
