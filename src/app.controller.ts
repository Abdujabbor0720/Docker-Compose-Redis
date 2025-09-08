import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @ApiOperation({ summary: 'Ilovaning asosiy sahifasi' })
    @ApiResponse({ status: 200, description: 'Muvaffaqiyatli javob' })
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('health')
    @ApiOperation({ summary: 'Ilova holatini tekshirish' })
    @ApiResponse({ status: 200, description: 'Ilova ishlayapti' })
    getHealth(): object {
        return this.appService.getHealth();
    }
}
