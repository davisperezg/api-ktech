import { RoleDocument } from './../../role/schemas/role.schema';
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

    const newUser = new this.userModel({
      ...userInput,
      role: findRole._id,
      password,
      confirmPassword,
    });

    let userSaved: UserDocument;
    let foundUser: UserDocument;

    try {
      userSaved = await newUser.save();
    } catch (e) {
      throw new Error(`Error en UserService.createUser ${e}`);
    }

    try {
      //list user with role
      foundUser = await userSaved
        .populate([
          {
            path: 'role',
            populate: {
              path: 'modules',
              populate: {
                path: 'menus',
              },
            },
          },
        ])
        .execPopulate();
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

    let findRole: RoleDocument;

    const findUserById = await this.findOneUserById(id);

    //must not contain a password or confirm password
    if (password || confirmPassword)
      throw new BadRequestException(`Ingrese su contraseña correctamente`);

    if (role) {
      //find role by name
      findRole = await this.roleService.findOneRoleByName(role.name, 'noexist');
    } else {
      findRole = await this.roleService.findOneRoleByName(
        findUserById.role.name,
        'noexist',
      );
    }

    let updateUser: UserDocument;

    try {
      updateUser = await this.userModel
        .findByIdAndUpdate(
          id,
          { ...userInput, role: findRole._id },
          {
            new: true,
          },
        )
        .populate([
          {
            path: 'role',
            populate: {
              path: 'modules',
              populate: {
                path: 'menus',
              },
            },
          },
        ]);
    } catch (e) {
      throw new Error(`Error en UserService.updateUser ${e}`);
    }

    return updateUser;
  }

  //Delete one user by id
  async deleteUserById(id: string): Promise<boolean> {
    await this.findOneUserById(id);

    try {
      //if exists user, delete user
      await this.userModel.findByIdAndDelete(id);
      return true;
    } catch (e) {
      throw new Error(`Error en UserService.deleteUserById ${e}`);
    }
  }

  //Get all user
  async findAllUsers(): Promise<UserDocument[]> {
    let findUsers: UserDocument[];

    try {
      findUsers = await this.userModel.find().populate([
        {
          path: 'role',
          populate: {
            path: 'modules',
            populate: { path: 'menus' },
          },
        },
      ]);
    } catch (e) {
      throw new Error(`Error en UserService.findAllUsers ${e}`);
    }

    return findUsers;
  }

  //Get one user by id
  async findOneUserById(id: string): Promise<UserDocument> {
    let user: UserDocument;

    try {
      user = await this.userModel.findById(id).populate([
        {
          path: 'role',
          populate: {
            path: 'modules',
            populate: {
              path: 'menus',
            },
          },
        },
      ]);
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
      user = await this.userModel.findOne({
        email,
      });
    } catch (e) {
      throw new Error(`Error en UserService.findOneUserByEmail ${e}`);
    }

    switch (param) {
      case 'exist':
        if (user) throw new BadRequestException(`El Correo ${email} ya existe`);
        break;

      case 'noexist':
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
