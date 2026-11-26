import service from "../../../service.ts";

export const JWT_SECRET: string = service.input().jwtSecret.expose();