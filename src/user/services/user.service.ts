import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from '../dto/user.dto';
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
  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDTO);
    return await this.userRepository.save(newUser);
  }
}
