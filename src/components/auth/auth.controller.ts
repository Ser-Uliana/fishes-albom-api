// auth.controller.ts
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";

import {
  login,
  register,
  setup2FA,
  enable2FA,
  verify2FA,
} from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import type { AuthUser } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  @Post("register")
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  register(@Body() body: { email: string; password: string }) {
    return register(body.email, body.password);
  }

  @Post("login")
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  login(@Body() body: { email: string; password: string }) {
    return login(body.email, body.password);
  }

  @Post("2fa/verify")
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  verify(@Body() body: { tempToken: string; code: string }) {
    return verify2FA(body.tempToken, body.code);
  }

  @UseGuards(JwtAuthGuard)
  @Post("2fa/setup")
  setup(@Req() req: { user: AuthUser }) {
    return setup2FA(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("2fa/enable")
  enable(@Req() req: { user: AuthUser }, @Body() body: { code: string }) {
    return enable2FA(req.user.id, body.code);
  }
}
