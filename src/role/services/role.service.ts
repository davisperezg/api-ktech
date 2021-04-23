import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleInput } from '../dto/inputs/role.input';
import { RoleDocument } from '../schemas/role.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RoleUpdateInput } from '../dto/inputs/role-update.input';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel('Role')
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  //Post a single role
  async createRole(roleInput: RoleInput): Promise<RoleDocument> {
    const { name } = roleInput;
    //find role by name and validate if it exists
    await this.findOneRoleByName(name, 'exist');

    //create one object by role
    const newRole = new this.roleModel(roleInput);

    try {
      //save role
      return await newRole.save();
    } catch (e) {
      throw new Error(`Error en RoleService.createRole ${e}`);
    }
  }

  //Put one role
  async updateRole(
    id: string,
    roleInput: RoleUpdateInput,
  ): Promise<RoleDocument> {
    //find role by Id
    await this.findOneRoleById(id);

    try {
      //find user by id and update
      return await this.roleModel.findByIdAndUpdate(id, roleInput, {
        new: true,
      });
    } catch (e) {
      throw new Error(`Error en RoleService.updateRole ${e}`);
    }
  }

  //Delete one role by id
  async deleteRoleById(id: string): Promise<boolean> {
    //find role by Id
    await this.findOneRoleById(id);

    try {
      //if exists role, delete role
      await this.roleModel.findByIdAndDelete(id);
      //return is true
      return true;
    } catch (e) {
      throw new Error(`Error en RoleService.deleteRoleById ${e}`);
    }
  }

  //Get all roles
  async findAllRoles(): Promise<RoleDocument[]> {
    try {
      return await this.roleModel.find();
    } catch (e) {
      throw new Error(`Error en RoleService.findAllRoles ${e}`);
    }
  }

  //Get one role by id
  async findOneRoleById(id: string): Promise<RoleDocument> {
    let role: RoleDocument;

    try {
      //find role by Id
      role = await this.roleModel.findById(id);
    } catch (e) {
      throw new Error(`Error en RoleService.findOneRoleById ${e}`);
    }

    //if does not exist
    if (!role)
      throw new NotFoundException(`El rol no se encuentra o no existe`);

    return role;
  }

  //Get one role by param
  async findOneRoleByName(name: string, param: string): Promise<RoleDocument> {
    let role: RoleDocument;

    try {
      //find role by name
      role = await this.roleModel.findOne({ name });
    } catch (e) {
      throw new Error(`Error en RoleService.findOneRoleByName ${e}`);
    }

    switch (param) {
      case 'exist':
        if (role) throw new BadRequestException(`El Rol ${name} ya existe`);
        break;

      case 'noexist':
        if (!role)
          throw new NotFoundException(`El rol no se encuentra o no existe`);
        return role;
    }
  }
}
