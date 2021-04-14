import * as bcrypt from 'bcrypt';

export class AuthHelper {
  static comparePassword(
    password: string,
    passwordHashed: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHashed);
  }

  static hashPassword(password: string): Promise<string> {
    const saltOrRounds = 12;
    return bcrypt.hash(password, saltOrRounds);
  }
}
