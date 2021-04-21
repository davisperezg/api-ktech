import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleInput } from '../dto/inputs/role.input';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  //Post a single role
  async createRole(roleInput: RoleInput): Promise<RoleEntity> {
    const { name } = roleInput;

    const findRole = await this.roleRepository.findOne({ name });

    if (findRole) throw new BadRequestException(`El Rol ${name} ya existe`);

    const newRole = this.roleRepository.create(roleInput);

    try {
      return await this.roleRepository.save(newRole);
    } catch (e) {
      throw new Error(`Error en RoleService.createRole ${e}`);
    }
  }

  //Put one role
  async updateRole(id: string, roleInput: RoleInput): Promise<RoleEntity> {
    let role: RoleEntity;

    try {
      role = await this.roleRepository.findOne(id);
    } catch (e) {
      throw new BadRequestException(
        `Error en RoleService.updateRole.UserfindOne ${e}`,
      );
    }

    if (!role) throw new BadRequestException(`El rol no existe en el servicio`);

    try {
      this.roleRepository.merge(role, roleInput);
      return await this.roleRepository.save(role);
    } catch (e) {
      throw new Error(`Error en RoleService.updateRole ${e}`);
    }
  }

  //Delete one role by id
  async deleteRoleById(id: string): Promise<boolean> {
    let result = false;

    try {
      const findRole = await this.roleRepository.findOne(id);

      if (!findRole) return (result = false);

      await this.roleRepository.delete(id);

      result = true;
    } catch (e) {
      throw new Error(
        `${result}. No se pudo eliminar. Error en RoleService.deleteRoleById ${e}`,
      );
    }

    return result;
  }

  //Get all roles
  async findAllRoles(): Promise<RoleEntity[]> {
    try {
      return await this.roleRepository.find();
    } catch (e) {
      throw new Error(`Error en RoleService.findAllRoles ${e}`);
    }
  }

  //Get one role by id
  async findOneRoleById(id: string): Promise<RoleEntity> {
    try {
      return await this.roleRepository.findOne(id);
    } catch (e) {
      throw new Error(`Error en RoleService.findOneRoleById ${e}`);
    }
  }

  //Get one role by param
  async findOneRoleByName(name: string): Promise<RoleEntity> {
    try {
      return await this.roleRepository.findOne({ name });
    } catch (e) {
      throw new Error(`Error en RoleService.findOneRoleByName ${e}`);
    }
  }
}
