import { MenuDocument } from './../../menu/schemas/menu.schema';
import { MenuService } from './../../menu/services/menu.service';
import { AccessDocument } from './../../access/schemas/access.schema';
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
import { AccessService } from 'src/access/services/access.service';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel('Module') private readonly moduleModel: Model<ModuleDocument>,
    private readonly accessService: AccessService,
    private readonly menuService: MenuService,
  ) {}

  //Post module
  async createModule(moduleInput: CreateModuleInput): Promise<ModuleDocument> {
    const { name, menus, access } = moduleInput;
    let module: ModuleDocument;
    let foundModule: ModuleDocument;

    //find module by name and validate if it exists
    await this.findOneModuleByName(name, 'exist');

    const getIdsMenus = await this.menuService.findIdsByNameMenu(menus);
    const getIdsAccess = await this.accessService.findIdsByNameAccess(access);

    const newModule = new this.moduleModel({
      ...moduleInput,
      menus: getIdsMenus,
      access: getIdsAccess,
    });

    try {
      module = await newModule.save();
    } catch (e) {
      throw new Error(`Error en ModuleService.createModule ${e}`);
    }

    try {
      foundModule = await module
        .populate([{ path: 'menus' }, { path: 'access' }])
        .execPopulate();
    } catch (e) {
      throw new Error(`Error en ModuleService.createModule.populate ${e}`);
    }

    return foundModule;
  }

  //Put module
  async updateModule(moduleInput: UpdateModuleInput): Promise<ModuleDocument> {
    const { id, menus, access } = moduleInput;
    let getIdsAccess: AccessDocument[];
    let getIdsMenus: MenuDocument[];
    let updateModule: ModuleDocument;

    //find module by id and valid if exist
    const findModuleIfExist = await this.findOneModuleById(id);

    if (access) {
      //get Ids access by names
      getIdsAccess = await this.accessService.findIdsByNameAccess(access);
    } else {
      getIdsAccess = await this.accessService.findIdsByNameAccess(
        findModuleIfExist.access,
      );
    }

    if (menus) {
      //get Ids menus by names
      getIdsMenus = await this.menuService.findIdsByNameMenu(menus);
    } else {
      getIdsMenus = await this.menuService.findIdsByNameMenu(
        findModuleIfExist.menus,
      );
    }

    try {
      updateModule = await this.moduleModel
        .findByIdAndUpdate(
          id,
          { ...moduleInput, menus: getIdsMenus, access: getIdsAccess },
          {
            new: true,
          },
        )
        .populate([{ path: 'menus' }, { path: 'access' }]);
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
    let findModules: ModuleDocument[];

    try {
      findModules = await this.moduleModel
        .find()
        .populate([{ path: 'menus' }, { path: 'access' }]);
    } catch (e) {
      throw new Error(`Error en ModuleService.findAllModules ${e}`);
    }

    return findModules;
  }

  //Get one module
  async findOneModuleById(id: string): Promise<ModuleDocument> {
    let module: ModuleDocument;

    try {
      module = await this.moduleModel
        .findById(id)
        .populate([{ path: 'menus' }, { path: 'access' }]);
    } catch (e) {
      throw new Error(`Error en ModuleService.findOneModuleById ${e}`);
    }

    //if does not exist
    if (!module)
      throw new NotFoundException({
        path: 'module',
        message: [`El modulo no se encuentra o no existe`],
      });

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
          throw new BadRequestException({
            path: 'module',
            message: [`El modulo ${name} ya existe`],
          });
        break;

      case 'noexist':
        if (!module)
          throw new NotFoundException({
            path: 'module',
            message: [`El modulo no se encuentra o no existe`],
          });
        return module;
    }
  }

  async findIdsByNameModules(modules: any[]): Promise<ModuleDocument[]> {
    const getNameModule = modules.map((module) => module.name);

    const findModulesByName = await this.findModulesByNames(getNameModule);

    const getIdModules = findModulesByName.map((module) => module._id);

    return getIdModules;
  }

  //Get modules by names
  async findModulesByNames(param: string[]): Promise<ModuleDocument[]> {
    let modules: ModuleDocument[];

    try {
      modules = await this.moduleModel.find({ name: { $in: param } });
    } catch (e) {
      throw new Error(`Error en ModuleService.findModulesByNames ${e}`);
    }

    if (!modules || modules.length === 0)
      throw new NotFoundException({
        path: 'module',
        message: [`El modulo no se encuentra o no existe`],
      });

    return modules;
  }
}
