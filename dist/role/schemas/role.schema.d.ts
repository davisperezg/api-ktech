import * as mongoose from 'mongoose';
import { Module } from 'src/modules/schemas/module.schema';
export declare type RoleDocument = Role & mongoose.Document;
export declare class Role {
    name: string;
    description: string;
    modules: Module[];
}
export declare const RoleSchema: mongoose.Schema<mongoose.Document<Role, {}>, mongoose.Model<any, any>, undefined>;
