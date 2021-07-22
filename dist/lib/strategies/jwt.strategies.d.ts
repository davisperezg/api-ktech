import { Strategy } from 'passport-jwt';
import { JwtType } from 'src/auth/dto/querys/jwt.type';
import { AuthService } from 'src/auth/services/auth.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: JwtType): Promise<import("../../user/schemas/user.schema").UserDocument>;
}
export {};
