import "reflect-metadata";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import cors from "cors";  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: ["http://localhost:3001", "https://fishes-albom-front.vercel.app", "https://fishes-albom-front-exw865o2k-ser-uliana.vercel.app"],
    }),
  );

  const port = service.port();
  await app.listen(port, "0.0.0.0");
  console.log(`Server running on port ${port}`);
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
