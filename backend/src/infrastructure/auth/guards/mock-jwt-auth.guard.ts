/* eslint-disable prettier/prettier */
import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class MockJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true; // permite pasar el guard
  }
}
