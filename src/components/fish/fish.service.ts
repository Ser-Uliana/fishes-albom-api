import { db } from "../../prisma/db";
import type { Fish } from "./fish.type";

export const getAllFish = () => {
  return db.orm.public.Fish.include("fishType").all();
};

export const getFishById = (id: number) => {
  return db.orm.public.Fish.where({ id }).include("fishType").first();
};

export type FishUpdate = Partial<Omit<Fish, "id" | "fishType" | "date">> & {
  date?: string;
};

export const editFish = (id: number, data: FishUpdate) => {
  const { date, ...rest } = data;
  return db.orm.public.Fish.where({ id }).update({
    ...rest,
    ...(date !== undefined && { date: new Date(date) }),
  });
};