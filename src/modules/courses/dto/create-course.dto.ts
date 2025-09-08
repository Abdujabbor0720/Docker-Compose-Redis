import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class CreateCourseDto {
    @ApiProperty({ description: 'Kurs nomi', example: 'JavaScript Asoslari' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Kurs tavsifi', example: 'JavaScript dasturlash tilini organing', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Instruktor ismi', example: 'Ali Valiyev' })
    @IsString()
    instructor: string;

    @ApiProperty({ description: 'Kurs davomiyligi (soatda)', example: 40 })
    @IsNumber()
    @Min(1)
    @Max(1000)
    duration: number;

    @ApiProperty({ description: 'Kurs narxi (UZS)', example: 500000 })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ description: 'Kurs kategoriyasi', example: 'Dasturlash' })
    @IsString()
    category: string;

    @ApiProperty({ description: 'Kurs darajasi', example: 'Boshlangich' })
    @IsEnum(['Boshlangich', 'Orta', 'Yuqori'])
    level: string;

    @ApiProperty({ description: 'Maksimal talabalar soni', example: 25, required: false })
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    maxStudents?: number;

    @ApiProperty({ description: 'Kurs aktiv yoki yoq', required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
