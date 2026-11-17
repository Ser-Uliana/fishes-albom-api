
import { prisma } from "../../prisma/prisma";

export const getAllFishTypes = () => {
  return prisma.fishType.findMany();
};

export const getFishTypeById = (id: number) => {
  return prisma.fishType.findUnique({
    where: { id },
  });
};