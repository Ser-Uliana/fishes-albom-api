import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import cors from "cors";
import { AppModule } from "./app.module";
import service from "../service.ts";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] });

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