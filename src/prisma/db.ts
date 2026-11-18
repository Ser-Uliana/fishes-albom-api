import "temporal-polyfill/global";
import service from "../../service.ts";

export const db = service.load().database.client;