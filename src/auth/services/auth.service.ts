import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { ObjectID, Repository } from 'typeorm';
import { AuthInput } from '../dto/inputs/auth.input';
import { UserTokenType } from '../dto/querys/user-token.type';
import { AuthHelper } from 'src/lib/helpers/auth.helper';
import { uid, suid } from 'rand-token';
import { JwtService } from '@nestjs/jwt';
import { JwtType } from '../dto/querys/jwt.type';
import { UserRefreshTokenType } from '../dto/querys/user-refresh-token.type';
import { AuthRefreshTokenInput } from '../dto/inputs/auth-refresh-token.input';
import { constants } from 'node:http2';

const refreshTokens = {};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwt: JwtService,
  ) {}

  //login user
  async signIn(authInput: AuthInput): Promise<UserTokenType> {
    const { username, password } = authInput;
    const refresh_token = uid(256);

    const findUser = await this.userRepository.findOne({
      username,
    });

    if (!findUser) throw new NotFoundException(`Usuario no existe`);

    const isMatch = await AuthHelper.comparePassword(
      password,
      findUser.password,
    );

    if (!isMatch) throw new Error(`Contraseña invalida`);

    refreshTokens[refresh_token] = username;
    return { access_token: this.getToken(findUser.id), refresh_token };
  }

  //method to get token in login
  getToken(id: ObjectID): string {
    const payload: JwtType = { userId: id };
    return this.jwt.sign(payload);
  }

  //method to validate token with refresh-token
  async getTokenWithRefresh(
    authRefreshTokenInput: AuthRefreshTokenInput,
  ): Promise<UserRefreshTokenType> {
    const username = authRefreshTokenInput.username;
    const refreshToken = authRefreshTokenInput.refresh_token;

    if (
      refreshToken in refreshTokens &&
      refreshTokens[refreshToken] === username
    ) {
      const findUser = await this.userRepository.findOne({
        username,
      });

      return { access_token: this.getToken(findUser.id) };
    } else {
      throw new UnauthorizedException();
    }
  }

  //validate user searching by id to jwt.strategies.ts
  async validateUser(id: ObjectID): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }
}
