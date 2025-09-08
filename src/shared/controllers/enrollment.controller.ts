import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
} from '@nestjs/swagger';

import { EnrollmentService } from '../services/enrollment.service';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from '../dto/enrollment.dto';
import { Enrollment } from '../entities/enrollment.entity';

@ApiTags('Ro\'yhatga olish')
@Controller('enrollments')
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService) { }

    @Post()
    @ApiOperation({ summary: 'Talabani kursga yozish' })
    @ApiResponse({ status: 201, description: 'Muvaffaqiyatli yozildi', type: Enrollment })
    @ApiResponse({ status: 400, description: 'Yaroqsiz ma\'lumotlar yoki kursda o\'rin yo\'q' })
    @ApiResponse({ status: 409, description: 'Talaba allaqachon yozilgan' })
    enroll(@Body() createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
        return this.enrollmentService.enroll(createEnrollmentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Barcha ro\'yhatlarni olish' })
    @ApiResponse({ status: 200, description: 'Ro\'yhatlar ro\'yhati', type: [Enrollment] })
    findAll(): Promise<Enrollment[]> {
        return this.enrollmentService.findAll();
    }

    @Get('statistics')
    @ApiOperation({ summary: 'Ro\'yhatlar statistikasi' })
    @ApiResponse({ status: 200, description: 'Statistika ma\'lumotlari' })
    getStatistics() {
        return this.enrollmentService.getStatistics();
    }

    @Get('course/:courseId')
    @ApiOperation({ summary: 'Kurs bo\'yicha ro\'yhatlarni olish' })
    @ApiParam({ name: 'courseId', description: 'Kurs ID', type: 'string' })
    @ApiResponse({ status: 200, description: 'Kurs ro\'yhatlari', type: [Enrollment] })
    findByCourse(@Param('courseId') courseId: string): Promise<Enrollment[]> {
        return this.enrollmentService.findByCourse(courseId);
    }

    @Get('student/:studentId')
    @ApiOperation({ summary: 'Talaba bo\'yicha ro\'yhatlarni olish' })
    @ApiParam({ name: 'studentId', description: 'Talaba ID', type: 'string' })
    @ApiResponse({ status: 200, description: 'Talaba ro\'yhatlari', type: [Enrollment] })
    findByStudent(@Param('studentId') studentId: string): Promise<Enrollment[]> {
        return this.enrollmentService.findByStudent(studentId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Bitta ro\'yhatni olish' })
    @ApiParam({ name: 'id', description: 'Ro\'yhat ID', type: 'string' })
    @ApiResponse({ status: 200, description: 'Ro\'yhat ma\'lumotlari', type: Enrollment })
    @ApiResponse({ status: 404, description: 'Ro\'yhat topilmadi' })
    findOne(@Param('id') id: string): Promise<Enrollment> {
        return this.enrollmentService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Ro\'yhatni yangilash' })
    @ApiParam({ name: 'id', description: 'Ro\'yhat ID', type: 'string' })
    @ApiResponse({ status: 200, description: 'Ro\'yhat muvaffaqiyatli yangilandi', type: Enrollment })
    @ApiResponse({ status: 404, description: 'Ro\'yhat topilmadi' })
    update(
        @Param('id') id: string,
        @Body() updateEnrollmentDto: UpdateEnrollmentDto,
    ): Promise<Enrollment> {
        return this.enrollmentService.update(id, updateEnrollmentDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Ro\'yhatni o\'chirish' })
    @ApiParam({ name: 'id', description: 'Ro\'yhat ID', type: 'string' })
    @ApiResponse({ status: 204, description: 'Ro\'yhat muvaffaqiyatli o\'chirildi' })
    @ApiResponse({ status: 404, description: 'Ro\'yhat topilmadi' })
    remove(@Param('id') id: string): Promise<void> {
        return this.enrollmentService.remove(id);
    }
}
