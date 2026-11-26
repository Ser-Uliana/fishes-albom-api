import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { addFish, deleteFish, editFish, getAllFish, getFishById } from "./fish.service";
import type { Fish, FishCreate, FishUpdate } from "./fish.type";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

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

  @Post()
  async add(@Body() fish: FishCreate) {
    try {
      return await addFish(fish);
    } catch (e) {
      console.error("POST /fish error:", e);
      throw e;
    }
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async remove(@Param("id", ParseIntPipe) id: number) {
    const fish = await deleteFish(id);
    if (!fish) throw new NotFoundException("Fish not found");
    return fish;
  }
}