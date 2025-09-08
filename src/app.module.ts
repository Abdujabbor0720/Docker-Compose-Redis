import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { DatabaseConfig } from './config/database.config';
import { CoursesModule } from './modules/courses/courses.module';
import { StudentsModule } from './modules/students/students.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        // Konfiguratsiya moduli
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // Ma'lumotlar bazasi konfiguratsiyasi
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfig,
        }),

        // Redis cache konfiguratsiyasi
        CacheModule.register({
            isGlobal: true,
            ttl: 300, // 5 daqiqa cache vaqti
        }),

        // Loyiha modullari
        CoursesModule,
        StudentsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
