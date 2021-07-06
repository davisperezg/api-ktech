import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/services/user.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserDocument } from 'src/user/schemas/user.schema';
import { roleSA } from 'src/auth/constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, //private readonly userService: UserService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request: UserDocument = GqlExecutionContext.create(
      context,
    ).getContext().req.user;

    if (roles.indexOf(roleSA) > -1 && request.role.name === roleSA) {
      return true;
    }

    throw new UnauthorizedException({
      path: 'forbidden',
      message: ['Recurso Prohibido.'],
    });
  }
}
