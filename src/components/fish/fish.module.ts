import { Module } from "@nestjs/common";
import { FishController } from "./fish.controller";
import { FishTypeController } from "../fishType/fishType.controller";

@Module({
  controllers: [FishController, FishTypeController],
})
export class FishModule {}