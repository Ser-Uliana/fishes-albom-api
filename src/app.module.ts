import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaService } from "./prisma.service";
import { FishModule } from "./components/fish/fish.module";
import { AuthModule } from "./components/auth/auth.module";



@Module({
  imports: [FishModule, AuthModule],
  controllers: [
    AppController,
  ],
  providers: [
    PrismaService,
  ],
})
export class AppModule {}
