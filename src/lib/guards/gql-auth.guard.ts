import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

let message = '';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      switch (info.message) {
        case 'jwt expired':
          message = 'La sessión ha expirado. Vuelve a loguearte.';
          break;

        case 'invalid signature':
          message = 'Modificado. El token es invalido.';
          break;

        case 'jwt malformed':
          message = 'Modificado. El token no tiene el formato correcto.';
          break;
      }

      throw new UnauthorizedException({
        path: 'forbidden',
        message: [`${message}`],
      });
    }

    return user;
  }
}
