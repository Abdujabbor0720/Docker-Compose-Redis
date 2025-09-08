import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private coursesRepository: Repository<Course>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) { }

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const course = this.coursesRepository.create(createCourseDto);
        const savedCourse = await this.coursesRepository.save(course);

        // Cache ni tozalash
        await this.cacheManager.del('courses_all');

        return savedCourse;
    }

    async findAll(page: number = 1, limit: number = 10): Promise<any> {
        const cacheKey = `courses_page_${page}_limit_${limit}`;

        // Cache dan tekshirish
        const cachedResult = await this.cacheManager.get(cacheKey);
        if (cachedResult) {
            return cachedResult;
        }

        const skip = (page - 1) * limit;

        const [courses, total] = await this.coursesRepository.findAndCount({
            where: { isActive: true },
            relations: ['enrollments'],
            order: { createdAt: 'DESC' },
            skip,
            take: limit,
        });

        const result = {
            data: courses,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };

        // Cache ga saqlash
        await this.cacheManager.set(cacheKey, result, 300); // 5 daqiqa

        return result;
    }

    async findOne(id: string): Promise<Course> {
        // Avval cache dan tekshirish
        const cachedCourse = await this.cacheManager.get<Course>(`course_${id}`);
        if (cachedCourse) {
            return cachedCourse;
        }

        const course = await this.coursesRepository.findOne({
            where: { id },
            relations: ['enrollments', 'enrollments.student'],
        });

        if (!course) {
            throw new NotFoundException(`ID ${id} bo'lgan kurs topilmadi`);
        }

        // Cache ga saqlash
        await this.cacheManager.set(`course_${id}`, course, 300);

        return course;
    }

    async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const course = await this.findOne(id);

        Object.assign(course, updateCourseDto);
        const updatedCourse = await this.coursesRepository.save(course);

        // Cache ni tozalash
        await this.cacheManager.del(`course_${id}`);
        await this.cacheManager.del('courses_all');

        return updatedCourse;
    }

    async remove(id: string): Promise<void> {
        const course = await this.findOne(id);

        // Soft delete - faqat isActive ni false qilish
        course.isActive = false;
        await this.coursesRepository.save(course);

        // Cache ni tozalash
        await this.cacheManager.del(`course_${id}`);
        await this.cacheManager.del('courses_all');
    }

    async getStatistics(): Promise<any> {
        const cacheKey = 'courses_statistics';
        const cachedStats = await this.cacheManager.get(cacheKey);

        if (cachedStats) {
            return cachedStats;
        }

        const [totalCourses, activeCourses] = await Promise.all([
            this.coursesRepository.count(),
            this.coursesRepository.count({ where: { isActive: true } }),
        ]);

        const stats = {
            totalCourses,
            activeCourses,
            inactiveCourses: totalCourses - activeCourses,
        };

        await this.cacheManager.set(cacheKey, stats, 600); // 10 daqiqa
        return stats;
    }
}
