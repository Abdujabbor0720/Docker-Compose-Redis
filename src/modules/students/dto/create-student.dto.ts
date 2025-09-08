import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class CreateStudentDto {
    @ApiProperty({ description: 'Talaba ismi', example: 'Dilshod' })
    @IsString()
    firstName: string;

    @ApiProperty({ description: 'Talaba familiyasi', example: 'Karimov' })
    @IsString()
    lastName: string;

    @ApiProperty({ description: 'Email manzil', example: 'dilshod@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Telefon raqam', example: '+998901234567', required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ description: 'Tugulgan sana', example: '1995-05-15', required: false })
    @IsOptional()
    @IsDateString()
    birthDate?: string;

    @ApiProperty({ description: 'Manzil', example: 'Toshkent, Mirobod tumani', required: false })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ description: 'Jinsi', example: 'Erkak', required: false })
    @IsOptional()
    @IsEnum(['Erkak', 'Ayol'])
    gender?: string;

    @ApiProperty({ description: 'Talaba aktiv yoki yoq', required: false })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
