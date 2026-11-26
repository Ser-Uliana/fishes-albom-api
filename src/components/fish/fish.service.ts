import { db } from "../../prisma/db";
import type { Fish, FishCreate } from "./fish.type";

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
  const { id: _id, fishType: _fishType, date, ...rest } = data as any;
  return db.orm.public.Fish.where({ id }).update({
    ...rest,
    ...(date ? { date: new Date(date) } : {}),
  });
};

export const addFish = (fish: FishCreate) => {
  return db.orm.public.Fish.create({
    name: fish.name,
    image: fish.image,
    idType: fish.idType,
    description: fish.description ?? "",
    isCaught: false,
    date: fish.date ? new Date(fish.date) : new Date(),
  });
};