import { CreateMenuInput } from './../dto/inputs/create-menu.input';
import { MenuDocument } from './../schemas/menu.schema';
import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { UpdateMenuInput } from '../dto/inputs/update-menu.input';
export declare class MenuService implements OnModuleInit {
    private readonly menuModel;
    constructor(menuModel: Model<MenuDocument>);
    onModuleInit(): Promise<MenuDocument[] | number>;
    createMenu(menuInput: CreateMenuInput): Promise<MenuDocument>;
    updateMenu(userInput: UpdateMenuInput): Promise<MenuDocument>;
    findAllMenu(): Promise<MenuDocument[]>;
    findOneMenuByName(name: string, param: string): Promise<MenuDocument>;
    findIdsByNameMenu(menus: any[]): Promise<MenuDocument[]>;
    findMenuByNames(param: string[]): Promise<MenuDocument[]>;
    findOneMenuById(id: string): Promise<MenuDocument>;
}
