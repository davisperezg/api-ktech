import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserInput } from 'src/user/dto/inputs/user.input';
import { UserType } from 'src/user/dto/querys/user.type';
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
    const findUser = await this.userRepository.findOne({
      username: authInput.username,
    });

    if (!findUser) throw new NotFoundException(`Usuario no existe`);

    const isMatch = await AuthHelper.comparePassword(
      authInput.password,
      findUser.password,
    );

    if (!isMatch) throw new Error(`Contraseña invalida`);

    return { token: this.signToken(findUser.id) };
  }

  signToken(id: string): string {
    const payload: JwtType = { userId: id };
    return this.jwt.sign(payload);
  }

  async findUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ id });
  }
}
