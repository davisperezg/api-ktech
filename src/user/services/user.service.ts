import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthHelper } from '../../lib/helpers/auth.helper';
import { Repository } from 'typeorm';
import { UserInput } from '../dto/inputs/user.input';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  //Get all user
  async findAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  //Post a single user
  async createUser(userInput: UserInput): Promise<UserEntity> {
    const { email } = userInput;

    const findEmail = await this.userRepository.findOne({
      email,
    });

    if (findEmail)
      throw new BadRequestException(`El Correo ${email} ya existe`);

    const password = await AuthHelper.hashPassword(userInput.password);

    const newUser = this.userRepository.create({
      ...userInput,
      password,
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (e) {
      throw new Error(`Error en UserService.createUser ${e}`);
    }
  }
}
