import { UserDocument } from 'src/user/schemas/user.schema';
import { AuthInput } from '../dto/inputs/auth.input';
import { UserTokenType } from '../dto/querys/user-token.type';
import { JwtService } from '@nestjs/jwt';
import { UserRefreshTokenType } from '../dto/querys/user-refresh-token.type';
import { AuthRefreshTokenInput } from '../dto/inputs/auth-refresh-token.input';
import { AuthChangePasswordInputToUser, AuthChangePasswordInputToAdmin } from '../dto/inputs/auth-change-password.input';
import { UserService } from 'src/user/services/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwt;
    constructor(userService: UserService, jwt: JwtService);
    signIn(authInput: AuthInput): Promise<UserTokenType>;
    changePasswordToUser(userPassword: AuthChangePasswordInputToUser): Promise<boolean>;
    changePasswordToAdmin(userPassword: AuthChangePasswordInputToAdmin): Promise<boolean>;
    getTokenWithRefresh(authRefreshTokenInput: AuthRefreshTokenInput): Promise<UserRefreshTokenType>;
    validateUser(id: string): Promise<UserDocument>;
    getMatchPasswordById(id: string, myPassword: string): Promise<boolean>;
    getToken(id: string): string;
}
