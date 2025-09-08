import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// Entities import
import { Course } from '../modules/courses/entities/course.entity';
import { Student } from '../modules/students/entities/student.entity';
import { Enrollment } from '../shared/entities/enrollment.entity';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get('DATABASE_HOST'),
            port: +this.configService.get('DATABASE_PORT'),
            username: this.configService.get('DATABASE_USER'),
            password: this.configService.get('DATABASE_PASSWORD'),
            database: this.configService.get('DATABASE_NAME'),
            entities: [Course, Student],
            migrations: ['dist/migrations/*.js'],
            synchronize: this.configService.get('NODE_ENV') === 'development',
            logging: this.configService.get('NODE_ENV') === 'development',
            ssl: this.configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
        };
    }
}

// TypeORM CLI uchun konfiguratsiya
export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres123',
    database: process.env.DATABASE_NAME || 'learning_center',
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
});
