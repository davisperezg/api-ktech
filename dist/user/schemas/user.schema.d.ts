import { Role } from 'src/role/schemas/role.schema';
import * as mongoose from 'mongoose';
export declare type UserDocument = User & mongoose.Document;
export declare class User {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: Role;
    status: number;
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, {}>, mongoose.Model<any, any>, undefined>;
