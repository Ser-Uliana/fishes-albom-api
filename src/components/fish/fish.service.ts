import { db } from "../../prisma/db";

export const getAllFish = () => {
  return db.orm.public.Fish.include("fishType").all();
};

export const getFishById = (id: number) => {
  return db.orm.public.Fish.where({ id }).include("fishType").first();
};