import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const header: string | undefined = req.headers.authorization;

    if (!header?.startsWith("Bearer "))
      throw new UnauthorizedException();

    try {
      const payload = jwt.verify(
        header.slice(7),
        process.env.JWT_SECRET!,
      ) as any;

      if (payload.step === "2fa") throw new UnauthorizedException();

      req.user = payload; 
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}