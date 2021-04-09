import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { ObjectID, Repository } from 'typeorm';
import { AuthInput } from '../dto/inputs/auth.input';
import { UserTokenType } from '../dto/querys/user-token.type';
import { AuthHelper } from 'src/helpers/auth.helper';

import { JwtService } from '@nestjs/jwt';
import { JwtType } from '../dto/querys/jwt.type';

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

    const findUser = await this.userRepository.findOne({
      username,
    });

    if (!findUser) throw new NotFoundException(`Usuario no existe`);

    const isMatch = await AuthHelper.comparePassword(
      password,
      findUser.password,
    );

    if (!isMatch) throw new Error(`Contraseña invalida`);

    return { token: this.getToken(findUser.id) };
  }

  //method to get token in login
  getToken(id: ObjectID): string {
    const payload: JwtType = { userId: id };
    return this.jwt.sign(payload);
  }

  //validate user searching by id to jwt.strategies.ts
  async validateUser(id: ObjectID): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }
}
