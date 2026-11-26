export type Fish = {
  id: number;
  idType: number;
  name: string;
  description: string;
  image: string | null;
  isCaught: boolean;
  bait: string;
  place: string;
  date: string;
  comments: string;
  weight: number | null;
  fishType: { id: number; name: string };
};

export type  FishUpdate ={
  idType: number;
  name: string;
  description: string;
  image: string | null;
  isCaught: boolean;
  bait: string;
  place: string;
  date: string;
  comments: string;
  weight: number | null;
  fishType: { id: number; name: string };
};

export type FishCreate = Pick<Fish, "name" | "image" | "idType"> &
  Partial<Omit<Fish, "id" | "fishType" | "name" | "image" | "idType">>;