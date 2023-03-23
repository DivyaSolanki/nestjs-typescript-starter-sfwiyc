import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization;
    return Boolean(token);
  }
}
