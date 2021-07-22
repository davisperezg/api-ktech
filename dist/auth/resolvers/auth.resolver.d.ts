import { AuthChangePasswordInputToUser, AuthChangePasswordInputToAdmin } from '../dto/inputs/auth-change-password.input';
import { AuthRefreshTokenInput } from '../dto/inputs/auth-refresh-token.input';
import { AuthInput } from '../dto/inputs/auth.input';
import { UserRefreshTokenType } from '../dto/querys/user-refresh-token.type';
import { UserTokenType } from '../dto/querys/user-token.type';
import { AuthService } from '../services/auth.service';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(authInput: AuthInput): Promise<UserTokenType>;
    refreshToken(authInput: AuthRefreshTokenInput): Promise<UserRefreshTokenType>;
    changePasswordToUser(authInput: AuthChangePasswordInputToUser): Promise<boolean>;
    changePasswordToAdmin(authInput: AuthChangePasswordInputToAdmin): Promise<boolean>;
}
