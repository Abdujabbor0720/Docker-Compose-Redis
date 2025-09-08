import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateEnrollmentDto {
    @ApiProperty({ description: 'Kurs ID' })
    @IsUUID()
    courseId: string;

    @ApiProperty({ description: 'Talaba ID' })
    @IsUUID()
    studentId: string;

    @ApiProperty({ description: 'Tulov holati', example: 'Tolangan', required: false })
    @IsOptional()
    @IsEnum(['Tolangan', 'Qisman', 'Tolanmagan'])
    paymentStatus?: string;

    @ApiProperty({ description: 'Tolangan summa', example: 500000, required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    paidAmount?: number;
}

export class UpdateEnrollmentDto {
    @ApiProperty({ description: 'Holat', example: 'Faol', required: false })
    @IsOptional()
    @IsEnum(['Faol', 'Tugatgan', 'Tark etgan', 'Taalga olingan'])
    status?: string;

    @ApiProperty({ description: 'Tulov holati', example: 'Tolangan', required: false })
    @IsOptional()
    @IsEnum(['Tolangan', 'Qisman', 'Tolanmagan'])
    paymentStatus?: string;

    @ApiProperty({ description: 'Tolangan summa', example: 500000, required: false })
    @IsOptional()
    @IsNumber()
    @Min(0)
    paidAmount?: number;
}
