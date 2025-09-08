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
    UseInterceptors,
    ParseUUIDPipe,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
    ApiBearerAuth,
} from '@nestjs/swagger';

import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@ApiTags('📚 Kurslar')
@Controller('courses')
@UseInterceptors(CacheInterceptor)
// @ApiBearerAuth() // Keyinchalik autentifikatsiya qo'shilganda
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Post()
    @ApiOperation({ summary: 'Yangi kurs yaratish' })
    @ApiResponse({ status: 201, description: 'Kurs muvaffaqiyatli yaratildi', type: Course })
    @ApiResponse({ status: 400, description: 'Yaroqsiz ma\'lumotlar' })
    create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    @ApiOperation({ summary: 'Barcha kurslarni olish' })
    @ApiResponse({ status: 200, description: 'Kurslar ro\'yhati', type: [Course] })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Sahifa raqami (default: 1)' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Sahifadagi elementlar soni (default: 10)' })
    findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<any> {
        return this.coursesService.findAll(page, limit);
    }

    @Get('statistics')
    @ApiOperation({ summary: 'Kurslar statistikasi' })
    @ApiResponse({ status: 200, description: 'Statistika ma\'lumotlari' })
    getStatistics() {
        return this.coursesService.getStatistics();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Bitta kursni olish' })
    @ApiParam({ name: 'id', description: 'Kurs ID', type: 'string' })
    @ApiResponse({ status: 200, description: 'Kurs ma\'lumotlari', type: Course })
    @ApiResponse({ status: 404, description: 'Kurs topilmadi' })
    findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Course> {
        return this.coursesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Kursni yangilash' })
    @ApiParam({ name: 'id', description: 'Kurs ID', type: 'string' })
    @ApiResponse({ status: 200, description: 'Kurs muvaffaqiyatli yangilandi', type: Course })
    @ApiResponse({ status: 404, description: 'Kurs topilmadi' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCourseDto: UpdateCourseDto,
    ): Promise<Course> {
        return this.coursesService.update(id, updateCourseDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Kursni o\'chirish' })
    @ApiParam({ name: 'id', description: 'Kurs ID', type: 'string' })
    @ApiResponse({ status: 204, description: 'Kurs muvaffaqiyatli o\'chirildi' })
    @ApiResponse({ status: 404, description: 'Kurs topilmadi' })
    remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return this.coursesService.remove(id);
    }
}
