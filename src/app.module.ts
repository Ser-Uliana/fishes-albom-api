import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaService } from "./prisma.service";
import { FishModule } from "./components/fish/fish.module";



@Module({
  imports: [FishModule],
  controllers: [
    AppController,
  ],
  providers: [
    PrismaService,
  ],
})
export class AppModule {}
