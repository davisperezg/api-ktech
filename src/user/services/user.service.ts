import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthHelper } from '../../lib/helpers/auth.helper';
import { Repository } from 'typeorm';
import { UserInput } from '../dto/inputs/user.input';
import { UserEntity } from '../entities/user.entity';
import { UserUpdateInput } from '../dto/inputs/user-update.input';
import { RoleService } from 'src/role/services/role.service';
import { RoleEntity } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly roleService: RoleService,
  ) {}

  //Post a single user
  async createUser(userInput: UserInput): Promise<UserEntity> {
    const { email, role } = userInput;
    console.log('entra a servicio', userInput);
    const findEmail = await this.userRepository.findOne({
      email,
    });

    if (findEmail)
      throw new BadRequestException(`El Correo ${email} ya existe`);

    const password = await AuthHelper.hashPassword(userInput.password);
    const confirmPassword = await AuthHelper.hashPassword(
      userInput.confirmPassword,
    );
    const findRole = await this.roleService.findOneRoleByName('Administrador');
    console.log('findRole', findRole);
    console.log('Obteniedo ID del rol', findRole.id);
    if (!findRole)
      throw new BadRequestException(`El rol no se encuentra o no existe`);

    const newUser = this.userRepository.create({
      ...userInput,
      role: findRole.id,
      password,
      confirmPassword,
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (e) {
      throw new Error(`Error en UserService.createUser ${e}`);
    }
  }

  //Put data user
  // async updateUser(id: string, userInput: UserInput): Promise<UserEntity> {
  //   let user: UserEntity;
  //   console.log(userInput);
  //   try {
  //     user = await this.userRepository.findOne(id);
  //   } catch (e) {
  //     throw new Error(`Error en UserService.updateUser.UserfindOne ${e}`);
  //   }

  //   if (!user)
  //     throw new BadRequestException(`El usuario no existe en el servicio`);

  //   try {
  //     const { password, confirmPassword } = userInput;

  //     if (password && confirmPassword) {
  //       const passwordHashed = await AuthHelper.hashPassword(password);
  //       const confirmPasswordHashed = await AuthHelper.hashPassword(
  //         confirmPassword,
  //       );
  //       userInput.password = passwordHashed;
  //       userInput.confirmPassword = confirmPasswordHashed;
  //     } else {
  //       userInput.password = user.password;
  //       userInput.confirmPassword = user.confirmPassword;
  //     }

  //     this.userRepository.merge(user, userInput);
  //     return await this.userRepository.save(user);
  //   } catch (e) {
  //     throw new Error(`Error en UserService.updateUser ${e}`);
  //   }
  // }

  //Delete one user by id
  async deleteUserById(id: string): Promise<boolean> {
    let result = false;

    try {
      const findUser = await this.userRepository.findOne(id);

      if (!findUser) return (result = false);

      await this.userRepository.delete(id);

      result = true;
    } catch (e) {
      throw new Error(
        `${result}. No se pudo eliminar. Error en UserService.deleteUserById ${e}`,
      );
    }

    return result;
  }

  //Get all user
  async findAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      throw new Error(`Error en UserService.findAllUsers ${e}`);
    }
  }

  //Get one user by id
  async findOneUserById(id: string): Promise<UserEntity> {
    try {
      return await this.userRepository.findOne(id);
    } catch (e) {
      throw new Error(`Error en UserService.findOneUserById ${e}`);
    }
  }
}
