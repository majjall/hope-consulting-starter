/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ClassSerializerInterceptor, ConsoleLogger, INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService, PrismaClientExceptionFilter } from "nestjs-prisma";
import helmet from 'helmet';
import * as csurf from 'csurf';
import { AppModule } from "./app.module";
import { CorsConfig, NestConfig, SwaggerConfig } from "./core/config";


export const setupSwaggerOpenApi = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const swaggerOptions = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Token' },
      'access-token',
    )
    // .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup(swaggerConfig.path, app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: console,
    // bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  app.setGlobalPrefix(nestConfig.apiPath);

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // automatically transform payloads to be objects typed according to their DTO classes
    whitelist: true, // automatically remove non-whitelisted properties
    forbidNonWhitelisted: true,
    // exceptionFactory: (errors: ValidationError[]) => {
    //   return new ValidationException(errors)
    // }
  }));
  // app.useGlobalFilters(new ValidationFilter());

  // Prisma - Prisma Client Exception Filter for unhandled exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // Prisma - enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);


  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Protect app from some well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(helmet());

  // CSRF Protection
  app.use(csurf());




  // Swagger Open Api
  if (swaggerConfig.enabled) {
    setupSwaggerOpenApi(app);
  }

  // Cors
  if (corsConfig.enabled || nestConfig.isDevelopment) {
    app.enableCors();
    // app.enableCors({
    //   origin: (req, callback) => {
    //     const { hostname } = url.parse(req || '');
    //     callback(null, allowedHosts.includes(hostname));
    //   },
    // });
  }

  await app.listen(nestConfig.port);

  // Logger.log(`🚀 Application Server is running on: ${await app.getUrl()}...`);
  // 🚀 Graphql Subscriptions ready at: ${subscriptionsUrl}
  Logger.log(`
    🚀 REST Server ready at: http://localhost:${nestConfig.port}/${nestConfig.apiPath}
    ⭐️ Swagger REST API docs available at: http://localhost:${nestConfig.port}/${swaggerConfig.path}
    🚀 Graphql Server ready at: http://localhost:${nestConfig.port}/graphql
  `, "Application Boostrap");
}

bootstrap();


