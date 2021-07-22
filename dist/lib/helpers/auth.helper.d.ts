export declare class AuthHelper {
    static comparePassword(password: string, passwordHashed: string): Promise<boolean>;
    static hashPassword(password: string): Promise<string>;
}
