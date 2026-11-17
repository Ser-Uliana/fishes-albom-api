import { db } from "../../prisma/db";

export const getAllFishTypes = () => {
  return db.orm.public.FishType.all();
};

export const getFishTypeById = (id: number) => {
  return db.orm.public.FishType.where({ id }).first();
};