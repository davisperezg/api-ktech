import { CreateMenuInput } from './../dto/inputs/create-menu.input';
import { MenuDocument } from './../schemas/menu.schema';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateMenuInput } from '../dto/inputs/update-menu.input';

@Injectable()
export class MenuService implements OnModuleInit {
  constructor(
    @InjectModel('Menu') private readonly menuModel: Model<MenuDocument>,
  ) {}

  async onModuleInit(): Promise<MenuDocument[] | number> {
    let countMenus: number;
    let valuesMenus: MenuDocument[];

    try {
      countMenus = await this.menuModel.estimatedDocumentCount();
    } catch (e) {
      throw new Error(`Error en MenuService.onModuleInit.Count ${e}`);
    }

    if (countMenus > 0) return;

    try {
      valuesMenus = await Promise.all([
        new this.menuModel({ name: 'Roles', link: 'roles' }).save(),
        new this.menuModel({ name: 'Usuarios', link: 'usuarios' }).save(),
        new this.menuModel({ name: 'Modulos', link: 'modulos' }).save(),
      ]);
    } catch (e) {
      throw new Error(`Error en MenuService.onModuleInit.All ${e}`);
    }

    return valuesMenus;
  }

  //Post a single menu
  async createMenu(menuInput: CreateMenuInput): Promise<MenuDocument> {
    const { name } = menuInput;
    //find menu by name and validate if it exists
    await this.findOneMenuByName(name, 'exist');

    //const getIdModules = await this.findIdsByNameModules(modules);

    const newMenu = new this.menuModel(menuInput);

    let saveMenu: MenuDocument;

    try {
      saveMenu = await newMenu.save();
    } catch (e) {
      throw new Error(`Error en RoleService.createRole ${e}`);
    }

    return saveMenu;
  }

  //Update menu
  async updateMenu(userInput: UpdateMenuInput): Promise<MenuDocument> {
    await this.findOneMenuById(userInput.id);

    let updateMenu: MenuDocument;

    try {
      updateMenu = await this.menuModel.findByIdAndUpdate(
        userInput.id,
        userInput,
        { new: true },
      );
    } catch (e) {
      throw new Error(`Error en MenuService.updateMenu ${e}`);
    }

    return updateMenu;
  }

  //Get all menu
  async findAllMenu(): Promise<MenuDocument[]> {
    let findMenus: MenuDocument[];

    try {
      findMenus = await this.menuModel.find();
    } catch (e) {
      throw new Error(`Error en MenuService.findAllMenu ${e}`);
    }

    return findMenus;
  }

  //Get one menu by param
  async findOneMenuByName(name: string, param: string): Promise<MenuDocument> {
    let menu: MenuDocument;

    try {
      menu = await this.menuModel.findOne({ name });
    } catch (e) {
      throw new Error(`Error en MenuService.findOneMenuByName ${e}`);
    }

    switch (param) {
      case 'exist':
        if (menu)
          throw new BadRequestException({
            path: 'menu',
            message: [`El menu ${name} ya existe`],
          });
        break;

      case 'noexist':
        if (!menu)
          throw new NotFoundException({
            path: 'menu',
            message: [`El menu no se encuentra o no existe`],
          });
        return menu;
    }
  }

  async findIdsByNameMenu(menus: any[]): Promise<MenuDocument[]> {
    const getNameMenu = menus.map((menu) => menu.name);

    const findMenuByName = await this.findMenuByNames(getNameMenu);

    const getIdMenus = findMenuByName.map((menu) => menu._id);

    return getIdMenus;
  }

  //Get menus by names
  async findMenuByNames(param: string[]): Promise<MenuDocument[]> {
    let menus: MenuDocument[];

    try {
      menus = await this.menuModel.find({ name: { $in: param } });
    } catch (e) {
      throw new Error(`Error en MenuService.findMenuByNames ${e}`);
    }

    if (!menus || menus.length === 0)
      throw new NotFoundException({
        path: 'menu',
        message: [`El menu no se encuentra o no existe`],
      });

    return menus;
  }

  //Get one menu
  async findOneMenuById(id: string): Promise<MenuDocument> {
    let menu: MenuDocument;

    try {
      menu = await this.menuModel.findById(id);
    } catch (e) {
      throw new Error(`Error en MenuService.findOneMenuById ${e}`);
    }

    //if does not exist
    if (!menu)
      throw new BadRequestException({
        path: 'menu',
        message: [`El menu no se encuentra o no existe`],
      });

    return menu;
  }
}
