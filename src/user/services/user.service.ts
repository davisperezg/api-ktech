import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthHelper } from '../../lib/helpers/auth.helper';
import { UserInput } from '../dto/inputs/user.input';
import { RoleService } from 'src/role/services/role.service';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { UserUpdateInput } from '../dto/inputs/user-update.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    private readonly roleService: RoleService,
  ) {}

  //Post a single user
  async createUser(userInput: UserInput): Promise<UserDocument> {
    const { email } = userInput;

    //find email by user
    await this.findOneUserByEmail(email, 'exist');

    //hash password
    const password = await AuthHelper.hashPassword(userInput.password);

    //hash confirm password
    const confirmPassword = await AuthHelper.hashPassword(
      userInput.confirmPassword,
    );

    //find role by name and validate if it exists
    const findRole: any = await this.roleService.findOneRoleByName(
      userInput.role.name,
      'noexist',
    );

    //create user object
    const newUser = new this.userModel({
      ...userInput,
      role: findRole._id,
      password,
      confirmPassword,
    });

    let userSaved: UserDocument;
    let foundUser: UserDocument;

    try {
      //save user
      userSaved = await newUser.save();
    } catch (e) {
      throw new Error(`Error en UserService.createUser ${e}`);
    }

    try {
      //list user with role
      foundUser = await userSaved.populate([{ path: 'role' }]).execPopulate();
    } catch (e) {
      throw new Error(`Error en UserService.createUser.list ${e}`);
    }

    return foundUser;
  }

  //Put data user
  async updateUser(
    id: string,
    userInput: UserUpdateInput,
  ): Promise<UserDocument> {
    const { password, confirmPassword, role } = userInput;
    const { name } = role;

    //find user by Id
    await this.findOneUserById(id);

    //must not contain a password or confirm password
    if (password || confirmPassword)
      throw new BadRequestException(`Ingrese su contraseña correctamente`);

    //find role by name
    const findRole = await this.roleService.findOneRoleByName(name, 'noexist');

    try {
      //return user updated
      return await this.userModel
        .findByIdAndUpdate(
          id,
          { ...userInput, role: findRole._id },
          {
            new: true,
          },
        )
        .populate([{ path: 'role' }]);
    } catch (e) {
      throw new Error(`Error en UserService.updateUser ${e}`);
    }
  }

  //Delete one user by id
  async deleteUserById(id: string): Promise<boolean> {
    //find user by Id
    await this.findOneUserById(id);

    try {
      //if exists user, delete user
      await this.userModel.findByIdAndDelete(id);
      //return is true
      return true;
    } catch (e) {
      throw new Error(`Error en UserService.deleteUserById ${e}`);
    }
  }

  //Get all user
  async findAllUsers(): Promise<UserDocument[]> {
    try {
      return await this.userModel.find().populate([{ path: 'role' }]);
    } catch (e) {
      throw new Error(`Error en UserService.findAllUsers ${e}`);
    }
  }

  //Get one user by id
  async findOneUserById(id: string): Promise<UserDocument> {
    let user: UserDocument;

    try {
      //find user by Id
      user = await this.userModel.findById(id).populate([{ path: 'role' }]);
    } catch (e) {
      throw new Error(`Error en UserService.findOneUserById ${e}`);
    }

    //if does not exist
    if (!user)
      throw new NotFoundException(`El usuario no se encuentra o no existe`);

    return user;
  }

  //Get one user by email
  async findOneUserByEmail(
    email: string,
    param: string,
  ): Promise<UserDocument> {
    let user: UserDocument;

    try {
      //find email by user
      user = await this.userModel.findOne({
        email,
      });
    } catch (e) {
      throw new Error(`Error en UserService.findOneUserByEmail ${e}`);
    }

    switch (param) {
      case 'exist':
        //if exists email by user
        if (user) throw new BadRequestException(`El Correo ${email} ya existe`);
        break;

      case 'noexist':
        //if does not user
        if (!user) throw new NotFoundException(`El usuario no existe`);
        return user;
    }
  }

  //Get user and update password
  async findOneUserByIdAndUpdate(id: string, model: any) {
    try {
      await this.userModel.findByIdAndUpdate(id, model, { new: true });
    } catch (e) {
      throw new Error(`Error en UserService.findOneUserByIdAndUpdate`);
    }
  }
}
