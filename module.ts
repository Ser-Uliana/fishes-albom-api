import { module } from "@prisma/composer";
import { postgres } from "@prisma/composer-prisma-cloud/orm";

import { appContract } from "./src/prisma/composer.ts";
import app from "./service.ts";
import { envSecret } from "@prisma/composer-prisma-cloud";

export default module("fishes-album-api", ({ provision }) => {
  const database = provision(
    postgres({
      name: "database",
      contract: appContract,
      config: "./prisma.config.ts",
    }),
    { id: "database" },
  );

provision(app, {
  deps: { database },
  input: { jwtSecret: envSecret("JWT_SECRET") },
});
});
