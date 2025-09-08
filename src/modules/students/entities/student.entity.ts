import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger'; @Entity('students')
export class Student {
    @ApiProperty({ description: 'Talabaning noyob identifikatori' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Talaba ismi', example: 'Dilshod' })
    @Column({ type: 'varchar', length: 50 })
    firstName: string;

    @ApiProperty({ description: 'Talaba familiyasi', example: 'Karimov' })
    @Column({ type: 'varchar', length: 50 })
    lastName: string;

    @ApiProperty({ description: 'Email manzil', example: 'dilshod@example.com' })
    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @ApiProperty({ description: 'Telefon raqam', example: '+998901234567' })
    @Column({ type: 'varchar', length: 15, nullable: true })
    phone: string;

    @ApiProperty({ description: 'Tugulgan sana', example: '1995-05-15' })
    @Column({ type: 'date', nullable: true })
    birthDate: Date;

    @ApiProperty({ description: 'Manzil', example: 'Toshkent, Mirobod tumani' })
    @Column({ type: 'text', nullable: true })
    address: string;

    @ApiProperty({ description: 'Jinsi', example: 'Erkak' })
    @Column({ type: 'enum', enum: ['Erkak', 'Ayol'], nullable: true })
    gender: string;

    @ApiProperty({ description: 'Talaba aktiv yoki yoq' })
    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @ApiProperty({ description: 'Royhattan otgan vaqt' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'Yangilangan vaqt' })
    @UpdateDateColumn()
    updatedAt: Date;

    // Virtual property - to'liq ism
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}