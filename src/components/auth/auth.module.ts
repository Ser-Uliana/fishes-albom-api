import { Module } from "@nestjs/common";
import { JwtAuthGuard } from "./auth.controller";


@Module({
    controllers: [JwtAuthGuard]
})
export class JwtAuthGuardModule {}