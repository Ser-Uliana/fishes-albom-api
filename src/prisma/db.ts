import "dotenv/config";

import postgres from "@prisma/orm-postgres/runtime";
import { contractFromJson } from "@prisma/orm-postgres/static";

import "temporal-polyfill/global";

import type { Contract } from "./contract.d.ts";
import contractJson from "./contract.json" with { type: "json" };

export const contract = contractFromJson<Contract>(contractJson);

console.log("DATABASE_URL:", process.env.DATABASE_URL);
export const db = postgres({
  contract,
  url: process.env.DATABASE_URL!,
});
