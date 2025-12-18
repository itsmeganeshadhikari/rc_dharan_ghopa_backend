import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { json, urlencoded } from "express";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    })
  );
   app.enableCors({
    origin: ['http://localhost:3000'], // your Next.js URL
    credentials: true,
  });
  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true, limit: "50mb" }));
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(
    `🚀 RC Dharan Ghopa API running at http://localhost:${port}/graphql`
  );
}
bootstrap();
