import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Global validation pipe
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    // CORS ni yoqish
    app.enableCors({
        origin: true,
        credentials: true,
    });

    // Global prefix
    app.setGlobalPrefix('api');

    // Swagger konfiguratsiyasi
    const config = new DocumentBuilder()
        .setTitle('Learning Center API')
        .setDescription('Learning center platform API documentation')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    const port = process.env.PORT || 3003;
    await app.listen(port);

    console.log(`🚀 Learning Center API ishga tushdi: http://localhost:${port}`);
    console.log(`📚 Swagger dokumentatsiya: http://localhost:${port}/api/docs`);
}

bootstrap();
