import { Injectable, NotFoundException, ConflictException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private studentsRepository: Repository<Student>,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache,
    ) { }

    async create(createStudentDto: CreateStudentDto): Promise<Student> {
        // Email manzil tekshiruvi
        const existingStudent = await this.studentsRepository.findOne({
            where: { email: createStudentDto.email },
        });

        if (existingStudent) {
            throw new ConflictException('Bu email manzil allaqachon ro\'yhatdan o\'tgan');
        }

        const student = this.studentsRepository.create(createStudentDto);
        const savedStudent = await this.studentsRepository.save(student);

        // Cache ni tozalash
        await this.cacheManager.del('students_all');

        return savedStudent;
    }

    async findAll(): Promise<Student[]> {
        // Avval cache dan tekshirish
        const cachedStudents = await this.cacheManager.get<Student[]>('students_all');
        if (cachedStudents) {
            return cachedStudents;
        }

        // Ma'lumotlar bazasidan olish
        const students = await this.studentsRepository.find({
            where: { isActive: true },
            relations: ['enrollments', 'enrollments.course'],
            order: { createdAt: 'DESC' },
        });

        // Cache ga saqlash
        await this.cacheManager.set('students_all', students, 300); // 5 daqiqa

        return students;
    }

    async findOne(id: string): Promise<Student> {
        // Avval cache dan tekshirish
        const cachedStudent = await this.cacheManager.get<Student>(`student_${id}`);
        if (cachedStudent) {
            return cachedStudent;
        }

        const student = await this.studentsRepository.findOne({
            where: { id },
            relations: ['enrollments', 'enrollments.course'],
        });

        if (!student) {
            throw new NotFoundException(`ID ${id} bo'lgan talaba topilmadi`);
        }

        // Cache ga saqlash
        await this.cacheManager.set(`student_${id}`, student, 300);

        return student;
    }

    async findByEmail(email: string): Promise<Student | null> {
        return this.studentsRepository.findOne({
            where: { email },
            relations: ['enrollments', 'enrollments.course'],
        });
    }

    async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
        const student = await this.findOne(id);

        // Agar email o'zgartirilsa, mavjudligini tekshirish
        if (updateStudentDto.email && updateStudentDto.email !== student.email) {
            const existingStudent = await this.studentsRepository.findOne({
                where: { email: updateStudentDto.email },
            });

            if (existingStudent) {
                throw new ConflictException('Bu email manzil allaqachon ro\'yhatdan o\'tgan');
            }
        }

        Object.assign(student, updateStudentDto);
        const updatedStudent = await this.studentsRepository.save(student);

        // Cache ni tozalash
        await this.cacheManager.del(`student_${id}`);
        await this.cacheManager.del('students_all');

        return updatedStudent;
    }

    async remove(id: string): Promise<void> {
        const student = await this.findOne(id);

        // Soft delete - faqat isActive ni false qilish
        student.isActive = false;
        await this.studentsRepository.save(student);

        // Cache ni tozalash
        await this.cacheManager.del(`student_${id}`);
        await this.cacheManager.del('students_all');
    }

    async getStatistics(): Promise<any> {
        const cacheKey = 'students_statistics';
        const cachedStats = await this.cacheManager.get(cacheKey);

        if (cachedStats) {
            return cachedStats;
        }

        const [totalStudents, activeStudents, maleStudents, femaleStudents] = await Promise.all([
            this.studentsRepository.count(),
            this.studentsRepository.count({ where: { isActive: true } }),
            this.studentsRepository.count({ where: { gender: 'Erkak', isActive: true } }),
            this.studentsRepository.count({ where: { gender: 'Ayol', isActive: true } }),
        ]);

        const stats = {
            totalStudents,
            activeStudents,
            inactiveStudents: totalStudents - activeStudents,
            maleStudents,
            femaleStudents,
        };

        await this.cacheManager.set(cacheKey, stats, 600); // 10 daqiqa
        return stats;
    }
}
