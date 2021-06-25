import { MenuDocument } from './../../menu/schemas/menu.schema';
import { MenuService } from './../../menu/services/menu.service';
import { AccessDocument } from './../../access/schemas/access.schema';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ModuleDocument } from '../schemas/module.schema';
import { Model } from 'mongoose';
import { CreateModuleInput } from '../dto/inputs/create-module.input';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateModuleInput } from '../dto/inputs/update-module.input';
import { AccessService } from 'src/access/services/access.service';
import { RoleDocument } from 'src/role/schemas/role.schema';
import { UserDocument } from 'src/user/schemas/user.schema';
import { AuthHelper } from 'src/lib/helpers/auth.helper';

@Injectable()
export class ModuleService implements OnApplicationBootstrap {
  constructor(
    @InjectModel('Module') private readonly moduleModel: Model<ModuleDocument>,
    @InjectModel('Role') private readonly roleModel: Model<RoleDocument>,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly accessService: AccessService,
    private readonly menuService: MenuService,
  ) {}

  async onApplicationBootstrap(): Promise<ModuleDocument[] | number> {
    let countModule: number;
    let valuesModule: ModuleDocument[];
    let findRole: RoleDocument;

    try {
      countModule = await this.moduleModel.estimatedDocumentCount();
    } catch (e) {
      throw new Error(
        `Error en ModuleService.onApplicationBootstrap.Count ${e}`,
      );
    }

    if (countModule > 0) return;

    const dataModules = [
      {
        name: 'Administración de modulos',
      },
    ];

    const dataAccess = [
      {
        name: 'Crear',
      },
      {
        name: 'Editar',
      },
      {
        name: 'Eliminar',
      },
      {
        name: 'Ver',
      },
    ];

    const dataMenus = [
      { name: 'Roles' },
      { name: 'Usuarios' },
      { name: 'Modulos' },
    ];

    const dataRol = {
      name: 'SuperAdmin',
      description: 'El SuperAdmin administra RPUM',
      modules: dataModules,
    };

    try {
      const getIdsMenus = await this.menuService.findIdsByNameMenu(dataMenus);
      const getIdsAccess = await this.accessService.findIdsByNameAccess(
        dataAccess,
      );

      valuesModule = await Promise.all([
        new this.moduleModel({
          name: 'Administración de modulos',
          access: getIdsAccess,
          menus: getIdsMenus,
        }).save(),
      ]);

      //find modules by ids
      const getIdModules = await this.findIdsByNameModules(dataModules);

      //adding data in role
      const newRole = new this.roleModel({
        ...dataRol,
        modules: getIdModules,
      });

      try {
        //new role
        await newRole.save();
      } catch (e) {
        throw new Error(
          `Error en ModuleService.onApplicationBootstrap.SaveRol ${e}`,
        );
      }

      try {
        findRole = await this.roleModel.findOne({ name: dataRol.name });
      } catch (e) {
        throw new Error(
          `Error en ModuleService.onApplicationBootstrap.findOneRole ${e}`,
        );
      }

      //change password pls
      const password = await AuthHelper.hashPassword('D@peor2021');
      const confirmPassword = await AuthHelper.hashPassword('D@peor2021');

      //adding data in user
      const newUser = new this.userModel({
        name: 'Keiner',
        lastName: 'Perez Guzman',
        email: 'davisperezg@gmail.com',
        password,
        confirmPassword,
        role: findRole._id,
      });

      try {
        //new User
        await newUser.save();
      } catch (e) {
        throw new Error(
          `Error en ModuleService.onApplicationBootstrap.SaveUser ${e}`,
        );
      }
    } catch (e) {
      throw new Error(
        `Error en ModuleService.onApplicationBootstrap.SaveModule ${e}`,
      );
    }

    return valuesModule;
  }

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
