import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Put } from "@nestjs/common";
import { editFish, getAllFish, getFishById } from "./fish.service";
import type { Fish, FishUpdate } from "./fish.type";

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

  @Put(":id")
  async changeOne(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: FishUpdate,
  ) {
    try {
      const fish = await editFish(id, data);
      if (!fish) throw new NotFoundException("Fish not found");
      return fish;
    } catch (e) {
      console.error("PUT /fish error:", e);
      throw e;
    }
  }
}