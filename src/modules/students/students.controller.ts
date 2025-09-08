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
    Query,
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
    ApiBearerAuth,
} from '@nestjs/swagger';

import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@ApiTags('Talabalar')
@Controller('students')
// @ApiBearerAuth() // Keyinchalik autentifikatsiya qo'shilganda
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Post()
    @ApiOperation({ summary: 'Yangi talaba ro\'yhatdan o\'tkazish' })
    @ApiResponse({ status: 201, description: 'Talaba muvaffaqiyatli ro\'yhatdan o\'tdi', type: Student })
    @ApiResponse({ status: 400, description: 'Yaroqsiz ma\'lumotlar' })
    @ApiResponse({ status: 409, description: 'Email manzil allaqachon mavjud' })
    create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
        return this.studentsService.create(createStudentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Barcha talabalarni olish' })
    @ApiResponse({ status: 200, description: 'Talabalar ro\'yhati', type: [Student] })
    findAll(): Promise<Student[]> {
        return this.studentsService.findAll();
    }

    @Get('statistics')
    @ApiOperation({ summary: 'Talabalar statistikasi' })
    @ApiResponse({ status: 200, description: 'Statistika ma\'lumotlari' })
    getStatistics() {
        return this.studentsService.getStatistics();
    }

    @Get('search')
    @ApiOperation({ summary: 'Email bo\'yicha talaba qidirish' })
    @ApiQuery({ name: 'email', description: 'Talaba email manzili', type: 'string' })
    @ApiResponse({ status: 200, description: 'Talaba topildi', type: Student })
    @ApiResponse({ status: 404, description: 'Talaba topilmadi' })
    findByEmail(@Query('email') email: string): Promise<Student | null> {
        return this.studentsService.findByEmail(email);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Bitta talabani olish' })
    @ApiParam({ name: 'id', description: 'Talaba ID', type: 'string' })
    @ApiResponse({ status: 200, description: 'Talaba ma\'lumotlari', type: Student })
    @ApiResponse({ status: 404, description: 'Talaba topilmadi' })
    findOne(@Param('id') id: string): Promise<Student> {
        return this.studentsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Talaba ma\'lumotlarini yangilash' })
    @ApiParam({ name: 'id', description: 'Talaba ID', type: 'string' })
    @ApiResponse({ status: 200, description: 'Talaba muvaffaqiyatli yangilandi', type: Student })
    @ApiResponse({ status: 404, description: 'Talaba topilmadi' })
    @ApiResponse({ status: 409, description: 'Email manzil allaqachon mavjud' })
    update(
        @Param('id') id: string,
        @Body() updateStudentDto: UpdateStudentDto,
    ): Promise<Student> {
        return this.studentsService.update(id, updateStudentDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Talabani o\'chirish' })
    @ApiParam({ name: 'id', description: 'Talaba ID', type: 'string' })
    @ApiResponse({ status: 204, description: 'Talaba muvaffaqiyatli o\'chirildi' })
    @ApiResponse({ status: 404, description: 'Talaba topilmadi' })
    remove(@Param('id') id: string): Promise<void> {
        return this.studentsService.remove(id);
    }
}
