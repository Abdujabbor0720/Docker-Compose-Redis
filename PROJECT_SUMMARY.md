# 🎉 Learning Center API - Loyiha tugallandi!

## 📋 Loyiha haqida
Learning Center platformasi - bu kurslar va talabalarni boshqarish uchun yaratilgan to'liq RESTful API.

## 🛠 Texnologiyalar
- **Backend**: TypeScript + NestJS
- **Database**: PostgreSQL 15 (Docker container)
- **Cache**: Redis 7 (Docker container)
- **ORM**: TypeORM
- **API Documentation**: Swagger/OpenAPI
- **Containerization**: Docker Compose
- **Validation**: class-validator
- **Architecture**: Modular (Courses, Students, Enrollment)

## 🚀 Loyiha tuzilishi
```
src/
├── modules/
│   ├── courses/          # Kurslar moduli
│   │   ├── entities/
│   │   ├── dto/
│   │   ├── courses.controller.ts
│   │   ├── courses.service.ts
│   │   └── courses.module.ts
│   ├── students/         # Talabalar moduli
│   │   ├── entities/
│   │   ├── dto/
│   │   ├── students.controller.ts
│   │   ├── students.service.ts
│   │   └── students.module.ts
│   └── enrollment/       # Ro'yhatga olish moduli
├── config/
│   └── database.config.ts
├── app.module.ts
└── main.ts
```

## 🔧 Xususiyatlar
- ✅ CRUD operatsiyalar (Courses, Students)
- ✅ Pagination (sahifalash)
- ✅ Redis cache (tezkor statistika)
- ✅ Input validation
- ✅ Swagger dokumentatsiya
- ✅ Error handling
- ✅ TypeORM entities
- ✅ Docker Compose setup
- ✅ Health check endpoint

## 📡 API Endpoints

### Kurslar (Courses)
- `GET /api/courses` - Barcha kurslar (pagination bilan)
- `POST /api/courses` - Yangi kurs yaratish
- `GET /api/courses/:id` - Kursni ID bo'yicha olish
- `PATCH /api/courses/:id` - Kursni yangilash
- `DELETE /api/courses/:id` - Kursni o'chirish
- `GET /api/courses/statistics` - Kurslar statistikasi (Redis cache)

### Talabalar (Students)
- `GET /api/students` - Barcha talabalar (pagination bilan)
- `POST /api/students` - Yangi talaba qo'shish
- `GET /api/students/:id` - Talabani ID bo'yicha olish
- `PATCH /api/students/:id` - Talaba ma'lumotlarini yangilash
- `DELETE /api/students/:id` - Talabani o'chirish
- `GET /api/students/statistics` - Talabalar statistikasi (Redis cache)
- `GET /api/students/search` - Talabalarni qidirish

### Boshqa
- `GET /api/health` - Health check

## 🐳 Docker Services
- **PostgreSQL**: Port 5437
- **Redis**: Port 6380
- **NestJS API**: Port 3003

## 📚 Swagger Documentation
API dokumentatsiyasi: http://localhost:3003/api/docs

## 🔄 Redis Cache
- Statistika ma'lumotlari 5 daqiqa cache'da saqlanadi
- Cache interceptor barcha controller'larda faollashtirilgan
- Pagination natijalar ham cache'lanadi

## 🗄 Database Schema
- **courses** table: id, title, description, level, price, duration, isActive, createdAt, updatedAt
- **students** table: id, firstName, lastName, email, phone, gender, birthDate, isActive, createdAt, updatedAt
- **enrollments** table: id, studentId, courseId, enrolledAt, completedAt

## 🚀 Ishga tushirish
```bash
# Docker services ishga tushirish
docker-compose up -d

# Dependencies o'rnatish
npm install

# Development mode
npm run start:dev

# Production build
npm run build
npm run start:prod
```

## 🧪 Testing
```bash
# API test qilish
node test-api.js

# Health check
curl http://localhost:3003/api/health
```

## 📦 Environment Variables
- `DATABASE_HOST=localhost`
- `DATABASE_PORT=5437`
- `DATABASE_NAME=learning_center`
- `DATABASE_USER=postgres`
- `DATABASE_PASSWORD=postgres123`
- `REDIS_HOST=localhost`
- `REDIS_PORT=6380`
- `PORT=3003`
- `NODE_ENV=development`

## 🎯 Keyingi bosqichlar
- [ ] JWT Authentication qo'shish
- [ ] Role-based access control
- [ ] Email notifications
- [ ] File upload (profile pictures)
- [ ] Advanced search va filtering
- [ ] Rate limiting
- [ ] Monitoring va logging

## 📄 API Response Example
```json
{
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "JavaScript Asoslari",
      "description": "Web dasturlash uchun JavaScript",
      "level": "BEGINNER",
      "price": 299000,
      "duration": 40,
      "isActive": true,
      "createdAt": "2025-09-08T12:00:00Z",
      "updatedAt": "2025-09-08T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

**🎉 Loyiha muvaffaqiyatli yaratildi va ishga tayyor!**
