import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { UsersService } from '../../modules/users/users.service';
import { JwtStrategy } from '../../modules/auth/jwt.strategy';

@Injectable()
export class verifyAdmin implements CanActivate {
  //constructor(private readonly jwtStrategy: JwtStrategy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {

    const token = request.headers.authorization.slice(7);

    const isAdmin = jwtDecode(token)['isAdmin'];
    if (!isAdmin) {
      throw new ForbiddenException('You are not allowed to do that');
    }
    return true;
  }
}