import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Learning Center API ga xush kelibsiz! 🎓';
    }

    getHealth(): object {
        return {
            status: 'OK',
            message: 'Learning Center API ishlayapti',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
        };
    }
}
