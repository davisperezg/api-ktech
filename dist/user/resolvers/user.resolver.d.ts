import { UserUpdateInput } from '../dto/inputs/user-update.input';
import { UserInput } from '../dto/inputs/user.input';
import { UserDocument } from '../schemas/user.schema';
import { UserService } from '../services/user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(userInput: UserInput, user: UserDocument): Promise<UserDocument>;
    updateUser(userInput: UserUpdateInput, user: UserDocument): Promise<UserDocument>;
    deleteUser(id: string): Promise<boolean>;
    getUsers(): Promise<UserDocument[]>;
    getUser(id: string): Promise<UserDocument>;
    me(user: UserDocument): Promise<UserDocument>;
    desactivateUser(id: string): Promise<UserDocument>;
    activateUser(id: string): Promise<UserDocument>;
}
