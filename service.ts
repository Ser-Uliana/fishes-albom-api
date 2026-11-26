import node from "@prisma/composer/node";
import { compute } from "@prisma/composer-prisma-cloud";
import { postgres } from "@prisma/composer-prisma-cloud/orm";
import { appContract } from "./src/prisma/composer.ts";
import { type } from "arktype";
import { secretString } from "@prisma/composer/arktype";

export default compute({
  name: "app",
  deps: { database: postgres(appContract) },
  input: type({ jwtSecret: secretString() }),
  build: node({ module: import.meta.url, entry: "./dist/server.mjs" }),
});