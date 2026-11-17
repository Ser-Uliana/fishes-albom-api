import { Controller, Get, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { getAllFish, getFishById } from "./fish.service";

@Controller("fish")
export class FishController {
  @Get()
  findAll() {
    return getAllFish();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const fish = await getFishById(id);
    if (!fish) throw new NotFoundException("Fish not found");
    return fish;
  }
}