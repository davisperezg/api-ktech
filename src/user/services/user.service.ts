import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthHelper } from 'src/helpers/auth.helper';
import { Repository } from 'typeorm';
import { UserInput } from '../dto/inputs/user.input';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  //Get all user
  async findAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  //Post a single user
  async createUser(userInput: UserInput): Promise<UserEntity | any> {
    const findEmail = await this.userRepository.findOne({
      username: userInput.username,
    });

    if (findEmail)
      throw new BadRequestException(`Username ${userInput.username} ya existe`);

    const password = await AuthHelper.hashPassword(userInput.password);

    const newUser = this.userRepository.create({
      ...userInput,
      password,
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (e) {
      return console.log('Error en AuthService.signUp', e);
    }
  }
}
