

import { prisma } from "../../prisma/prisma";

export const getAllFish = () => {
  return prisma.fish.findMany({
    include: { fishType: true },
  });
};

export const getFishById = (id: number) => {
  return prisma.fish.findUnique({
    where: { id },
    include: { fishType: true },
  });
};