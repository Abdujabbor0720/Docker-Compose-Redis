import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; @Entity('courses')
export class Course {
    @ApiProperty({ description: 'Kursning noyob identifikatori' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Kurs nomi', example: 'JavaScript Asoslari' })
    @Column({ type: 'varchar', length: 200 })
    title: string;

    @ApiProperty({ description: 'Kurs tavsifi', example: 'JavaScript dasturlash tilini organing' })
    @Column({ type: 'text', nullable: true })
    description: string;

    @ApiProperty({ description: 'Instruktor ismi', example: 'Ali Valiyev' })
    @Column({ type: 'varchar', length: 100 })
    instructor: string;

    @ApiProperty({ description: 'Kurs davomiyligi (soatda)', example: 40 })
    @Column({ type: 'int' })
    duration: number;

    @ApiProperty({ description: 'Kurs narxi (UZS)', example: 500000 })
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @ApiProperty({ description: 'Kurs kategoriyasi', example: 'Dasturlash' })
    @Column({ type: 'varchar', length: 100 })
    category: string;

    @ApiProperty({ description: 'Kurs darajasi', example: 'Boshlangich' })
    @Column({ type: 'enum', enum: ['Boshlangich', 'Orta', 'Yuqori'], default: 'Boshlangich' })
    level: string;

    @ApiProperty({ description: 'Kurs aktiv yoki yoq' })
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @ApiProperty({ description: 'Maksimal talabalar soni', example: 25 })
    @Column({ type: 'int', default: 30 })
    maxStudents: number;

    @ApiProperty({ description: 'Yaratilgan vaqt' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Yangilangan vaqt' })
    @UpdateDateColumn()
    updatedAt: Date;
}