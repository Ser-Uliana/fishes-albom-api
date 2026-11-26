// jwt-auth.guard.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

const SECRET: string =
  process.env.JWT_SECRET ??
  (() => {
    throw new Error("JWT_SECRET is not set");
  })();

export type AuthUser = { id: number; role: string };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const header: string | undefined = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) throw new UnauthorizedException();

    let payload: jwt.JwtPayload;
    try {
      payload = jwt.verify(header.slice(7), SECRET, {
        algorithms: ["HS256"],
      }) as jwt.JwtPayload;
    } catch {
      throw new UnauthorizedException();
    }

    if (payload.typ !== "access") throw new UnauthorizedException();

    const user: AuthUser = { id: Number(payload.sub), role: payload.role };
    req.user = user;
    return true;
  }
}