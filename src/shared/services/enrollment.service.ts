import { Injectable, NotFoundException, ConflictException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Enrollment } from '../entities/enrollment.entity';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from '../dto/enrollment.dto';
import { CoursesService } from '../../modules/courses/courses.service';
import { StudentsService } from '../../modules/students/students.service';

@Injectable()
export class EnrollmentService {
    constructor(
        @InjectRepository(Enrollment)
        private enrollmentRepository: Repository<Enrollment>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
        private coursesService: CoursesService,
        private studentsService: StudentsService,
    ) { }

    async enroll(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
        const { courseId, studentId } = createEnrollmentDto;

        // Kurs va talaba mavjudligini tekshirish
        const [course, student] = await Promise.all([
            this.coursesService.findOne(courseId),
            this.studentsService.findOne(studentId),
        ]);

        // Talaba allaqachon bu kursga yozilganmi tekshirish
        const existingEnrollment = await this.enrollmentRepository.findOne({
            where: { courseId, studentId },
        });

        if (existingEnrollment) {
            throw new ConflictException('Talaba allaqachon bu kursga yozilgan');
        }

        // Kurs to'la yoki yoq tekshirish
        const enrollmentCount = await this.enrollmentRepository.count({
            where: { courseId, status: 'Faol' },
        });

        if (enrollmentCount >= course.maxStudents) {
            throw new BadRequestException('Kursda o\'rinlar tugadi');
        }

        const enrollment = this.enrollmentRepository.create(createEnrollmentDto);
        const savedEnrollment = await this.enrollmentRepository.save(enrollment);

        // Cache ni tozalash
        await this.clearCache();

        return this.findOne(savedEnrollment.id);
    }

    async findAll(): Promise<Enrollment[]> {
        return this.enrollmentRepository.find({
            relations: ['course', 'student'],
            order: { enrolledAt: 'DESC' },
        });
    }

    async findOne(id: string): Promise<Enrollment> {
        const enrollment = await this.enrollmentRepository.findOne({
            where: { id },
            relations: ['course', 'student'],
        });

        if (!enrollment) {
            throw new NotFoundException(`ID ${id} bo'lgan ro'yhat topilmadi`);
        }

        return enrollment;
    }

    async findByCourse(courseId: string): Promise<Enrollment[]> {
        return this.enrollmentRepository.find({
            where: { courseId },
            relations: ['student'],
            order: { enrolledAt: 'DESC' },
        });
    }

    async findByStudent(studentId: string): Promise<Enrollment[]> {
        return this.enrollmentRepository.find({
            where: { studentId },
            relations: ['course'],
            order: { enrolledAt: 'DESC' },
        });
    }

    async update(id: string, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment> {
        const enrollment = await this.findOne(id);

        Object.assign(enrollment, updateEnrollmentDto);
        const updatedEnrollment = await this.enrollmentRepository.save(enrollment);

        await this.clearCache();

        return this.findOne(updatedEnrollment.id);
    }

    async remove(id: string): Promise<void> {
        const enrollment = await this.findOne(id);
        await this.enrollmentRepository.remove(enrollment);
        await this.clearCache();
    }

    async getStatistics(): Promise<any> {
        const cacheKey = 'enrollment_statistics';
        const cachedStats = await this.cacheManager.get(cacheKey);

        if (cachedStats) {
            return cachedStats;
        }

        const [
            totalEnrollments,
            activeEnrollments,
            completedEnrollments,
            paidEnrollments
        ] = await Promise.all([
            this.enrollmentRepository.count(),
            this.enrollmentRepository.count({ where: { status: 'Faol' } }),
            this.enrollmentRepository.count({ where: { status: 'Tugatgan' } }),
            this.enrollmentRepository.count({ where: { paymentStatus: 'Tolangan' } }),
        ]);

        const stats = {
            totalEnrollments,
            activeEnrollments,
            completedEnrollments,
            droppedEnrollments: totalEnrollments - activeEnrollments - completedEnrollments,
            paidEnrollments,
            unpaidEnrollments: totalEnrollments - paidEnrollments,
        };

        await this.cacheManager.set(cacheKey, stats, 600); // 10 daqiqa
        return stats;
    }

    private async clearCache(): Promise<void> {
        await Promise.all([
            this.cacheManager.del('enrollment_statistics'),
            this.cacheManager.del('courses_all'),
            this.cacheManager.del('students_all'),
        ]);
    }
}
