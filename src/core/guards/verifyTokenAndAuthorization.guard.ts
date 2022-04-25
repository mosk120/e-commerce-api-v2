import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable()
export class verifyTokenAndAuthorizationGuard implements CanActivate {

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {

    const token = request.headers.authorization.slice(7);

    const userId = jwtDecode(token)['id'];

    const paramUserId: number = parseInt(request.params.userId);

    if (!(userId === paramUserId)) {
      throw new ForbiddenException('You are not allowed to do that');
    }
    return true;
  }
}