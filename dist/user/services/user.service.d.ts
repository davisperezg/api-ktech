import { UserDocument } from './../schemas/user.schema';
import { OnModuleInit } from '@nestjs/common';
import { UserInput } from '../dto/inputs/user.input';
import { RoleService } from 'src/role/services/role.service';
import { Model } from 'mongoose';
import { UserUpdateInput } from '../dto/inputs/user-update.input';
export declare class UserService implements OnModuleInit {
    private readonly userModel;
    private readonly roleService;
    constructor(userModel: Model<UserDocument>, roleService: RoleService);
    onModuleInit(): Promise<void>;
    createUser(userInput: UserInput, user: UserDocument): Promise<UserDocument>;
    activarUser(id: string): Promise<UserDocument>;
    desactivateUser(id: string): Promise<UserDocument>;
    updateUser(userInput: UserUpdateInput, user: UserDocument): Promise<UserDocument>;
    deleteUserById(id: string): Promise<boolean>;
    findAllUsers(): Promise<UserDocument[]>;
    findOneUserById(id: string): Promise<UserDocument>;
    findOneUserByEmail(email: string, param: string): Promise<UserDocument | any>;
    findOneUserByIdAndUpdate(id: string, model: any): Promise<void>;
}
