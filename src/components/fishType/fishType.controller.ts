import { Controller, Get, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { getAllFishTypes, getFishTypeById } from "./fishType.service";

@Controller("fish-types")
export class FishTypeController {
  @Get()
  findAll() {
    return getAllFishTypes();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const type = await getFishTypeById(id);
    if (!type) throw new NotFoundException("Fish type not found");
    return type;
  }
}