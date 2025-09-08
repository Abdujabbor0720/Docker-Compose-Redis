import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../modules/courses/entities/course.entity';
import { Student } from '../../modules/students/entities/student.entity';

@Entity('enrollments')
export class Enrollment {
    @ApiProperty({ description: 'Royhattning noyob identifikatori' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Kurs ID' })
    @Column({ type: 'uuid' })
    courseId: string;

    @ApiProperty({ description: 'Talaba ID' })
    @Column({ type: 'uuid' })
    studentId: string;

    @ApiProperty({ description: 'Royhatdan otish vaqti' })
    @CreateDateColumn()
    enrolledAt: Date;

    @ApiProperty({ description: 'Holat', example: 'Faol' })
    @Column({
        type: 'enum',
        enum: ['Faol', 'Tugatgan', 'Tark etgan', 'Taalga olingan'],
        default: 'Faol',
    })
    status: string;

    @ApiProperty({ description: 'Tulov holati', example: 'Tolangan' })
    @Column({
        type: 'enum',
        enum: ['Tolangan', 'Qisman', 'Tolanmagan'],
        default: 'Tolanmagan',
    })
    paymentStatus: string;

    @ApiProperty({ description: 'Tolangan summa', example: 500000 })
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    paidAmount: number;

    @ApiProperty({ description: 'Oxirgi faollik vaqti' })
    @UpdateDateColumn()
    lastActivity: Date;

    // Kurs bilan aloqa
    @ManyToOne(() => Course, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'courseId' })
    course: Course;

    // Talaba bilan aloqa
    @ManyToOne(() => Student, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'studentId' })
    student: Student;
}
