import { Access } from './../../access/schemas/access.schema';
import * as mongoose from 'mongoose';
import { Menu } from 'src/menu/schemas/menu.schema';
export declare type ModuleDocument = Module & mongoose.Document;
export declare class Module {
    name: string;
    description: string;
    access?: Access[];
    menus: Menu[];
}
export declare const ModuleSchema: mongoose.Schema<mongoose.Document<Module, {}>, mongoose.Model<any, any>, undefined>;
