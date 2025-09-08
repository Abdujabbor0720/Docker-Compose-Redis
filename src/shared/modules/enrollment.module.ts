import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnrollmentService } from '../services/enrollment.service';
import { EnrollmentController } from '../controllers/enrollment.controller';
import { Enrollment } from '../entities/enrollment.entity';
import { CoursesModule } from '../../modules/courses/courses.module';
import { StudentsModule } from '../../modules/students/students.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Enrollment]),
        CoursesModule,
        StudentsModule,
    ],
    controllers: [EnrollmentController],
    providers: [EnrollmentService],
    exports: [EnrollmentService],
})
export class EnrollmentModule { }
