import * as mongoose from 'mongoose';
export declare type MenuDocument = Menu & mongoose.Document;
export declare class Menu {
    name: string;
    link: string;
}
export declare const MenuSchema: mongoose.Schema<mongoose.Document<Menu, {}>, mongoose.Model<any, any>, undefined>;
