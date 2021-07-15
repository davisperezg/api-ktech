import { UserDocument } from './../schemas/user.schema';
import { RoleDocument } from './../../role/schemas/role.schema';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthHelper } from '../../lib/helpers/auth.helper';
import { UserInput } from '../dto/inputs/user.input';
import { RoleService } from 'src/role/services/role.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserUpdateInput } from '../dto/inputs/user-update.input';
import { roleSA } from 'src/auth/constants';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    private readonly roleService: RoleService,
  ) {}

  //update all user to status 1 where users is equal null
  async onModuleInit(): Promise<void> {
    try {
      await this.userModel.updateMany({ status: null }, { status: 1 });
    } catch (e) {
      throw new Error(`Error en UserService.onModuleInit ${e}`);
    }
  }

  //Post a single user
  async createUser(
    userInput: UserInput,
    user: UserDocument,
  ): Promise<UserDocument> {
    const { email, role } = userInput;

    if (user.role.name !== roleSA && role.name === roleSA) {
      throw new UnauthorizedException({
        path: 'forbidden',
        message: ['Lo siento, no tiene permiso para hacer esto'],
      });
    }

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
      status: 1,
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
              populate: [
                {
                  path: 'menus',
                },
                { path: 'access' },
              ],
            },
          },
        ])
        .execPopulate();
    } catch (e) {
      throw new Error(`Error en UserService.createUser.list ${e}`);
    }

    return foundUser;
  }

  async activarUser(id: string): Promise<UserDocument> {
    let findUser: UserDocument;
    await this.findOneUserById(id);

    try {
      findUser = await this.userModel.findByIdAndUpdate(
        id,
        { status: 1 },
        { new: true },
      );
    } catch (e) {
      throw new Error(`Error en UserService.activarUser ${e}`);
    }

    return findUser;
  }

  async desactivateUser(id: string): Promise<UserDocument> {
    let findUser: UserDocument;
    const foundUser = await this.findOneUserById(id);

    if (foundUser.role.name === roleSA) {
      throw new UnauthorizedException({
        path: 'forbidden',
        message: ['Recurso prohibido.'],
      });
    }

    try {
      findUser = await this.userModel.findByIdAndUpdate(
        id,
        { status: 2 },
        { new: true },
      );
    } catch (e) {
      throw new Error(`Error en UserService.desactivateUser ${e}`);
    }
    return findUser;
  }

  //Put data user
  async updateUser(
    userInput: UserUpdateInput,
    user: UserDocument,
  ): Promise<UserDocument> {
    const { id, password, confirmPassword, role, email } = userInput;

    if (user.role.name !== roleSA && role.name === roleSA) {
      throw new UnauthorizedException({
        path: 'forbidden',
        message: ['Lo siento, no tiene permiso para hacer esto.'],
      });
    }

    let findRole: RoleDocument;
    let updateUser: UserDocument;

    const findUserById = await this.findOneUserById(id);

    if (
      user.role.name === roleSA &&
      findUserById.role.name === roleSA &&
      role.name !== roleSA
    ) {
      throw new BadRequestException({
        path: 'role',
        message: [
          `Lo siento, pero el rol "${findUserById.role.name}" ya está establecido.`,
        ],
      });
    }

    if (email && email !== findUserById.email) {
      throw new BadRequestException({
        path: 'email',
        message: ['Mala idea, esta opción está deshabilitada.'],
      });
    }

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
              populate: [
                {
                  path: 'menus',
                },
                { path: 'access' },
              ],
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
            populate: [{ path: 'menus' }, { path: 'access' }],
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
            populate: [
              {
                path: 'menus',
              },
              { path: 'access' },
            ],
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
  ): Promise<UserDocument | any> {
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
        if (user)
          throw new BadRequestException({
            path: 'email',
            message: [`El correo ${email} ya existe.`],
          });
        break;

      case 'noexist':
        if (!user)
          throw new BadRequestException({
            path: 'username',
            message: ['El usuario no existe'],
          });
        break;
    }

    return user;
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
