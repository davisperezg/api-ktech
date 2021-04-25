import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModuleDocument } from '../schemas/module.schema';
import { Model } from 'mongoose';
import { CreateModuleInput } from '../dto/inputs/create-module.input';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateModuleInput } from '../dto/inputs/update-module.input';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel('Module') private readonly moduleModel: Model<ModuleDocument>,
  ) {}

  //Post module
  async createModule(moduleInput: CreateModuleInput): Promise<ModuleDocument> {
    const { name } = moduleInput;
    let module: ModuleDocument;

    //find module by name and validate if it exists
    await this.findOneModuleByName(name, 'exist');

    try {
      module = new this.moduleModel(moduleInput);
      return await module.save();
    } catch (e) {
      throw new Error(`Error en ModuleService.createModule ${e}`);
    }
  }

  //Put module
  async updateModule(moduleInput: UpdateModuleInput): Promise<ModuleDocument> {
    const { id } = moduleInput;

    //find module by id and valid if exist
    await this.findOneModuleById(id);

    let updateModule: ModuleDocument;

    try {
      updateModule = await this.moduleModel.findByIdAndUpdate(id, moduleInput, {
        new: true,
      });
    } catch (e) {
      throw new Error(`Error en ModuleService.updateModule ${e}`);
    }

    return updateModule;
  }

  //Delete module
  async deleteModule(id: string): Promise<boolean> {
    await this.findOneModuleById(id);

    try {
      //if exists module, delete module
      await this.moduleModel.findByIdAndDelete(id);
      return true;
    } catch (e) {
      throw new Error(`Error en ModuleService.deleteModule ${e}`);
    }
  }

  //Get all modules
  async findAllModules(): Promise<ModuleDocument[]> {
    try {
      const findModules = await this.moduleModel.find();
      return findModules;
    } catch (e) {
      throw new Error(`Error en ModuleService.findAllModules ${e}`);
    }
  }

  //Get one module
  async findOneModuleById(id: string): Promise<ModuleDocument> {
    let module: ModuleDocument;

    try {
      module = await this.moduleModel.findById(id);
    } catch (e) {
      throw new Error(`Error en ModuleService.findOneModuleById ${e}`);
    }

    //if does not exist
    if (!module)
      throw new NotFoundException(`El modulo no se encuentra o no existe`);

    return module;
  }

  //Get one module by param
  async findOneModuleByName(
    name: string,
    param: string,
  ): Promise<ModuleDocument> {
    let module: ModuleDocument;

    try {
      module = await this.moduleModel.findOne({ name });
    } catch (e) {
      throw new Error(`Error en ModuleService.findOneRoleByName ${e}`);
    }

    switch (param) {
      case 'exist':
        if (module)
          throw new BadRequestException(`El Modulo ${name} ya existe`);
        break;

      case 'noexist':
        if (!module)
          throw new NotFoundException(`El modulo no se encuentra o no existe`);
        return module;
    }
  }

  async findModulesByNames(param: string[]): Promise<ModuleDocument[]> {
    let modules: ModuleDocument[];

    try {
      modules = await this.moduleModel.find({ name: { $in: param } });
    } catch (e) {
      throw new Error(`Error en ModuleService.findModulesByNames ${e}`);
    }

    if (!modules)
      throw new NotFoundException(`El modulo no se encuentra o no existe`);

    return modules;
  }
}
