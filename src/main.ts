import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import service from "../service.ts";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useBodyParser("json", { limit: "5mb" });

  app.enableCors({
    origin: [
      "http://localhost:3001",
      "https://fishes-albom-front.vercel.app",
      /\.vercel\.app$/,
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });

  const port = service.port();
  await app.listen(port, "0.0.0.0");
  console.log(`Server running on port ${port}`);
}

bootstrap().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});