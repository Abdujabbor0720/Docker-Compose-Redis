# Learning Center API

O'quv markaz platformasi - NestJS, TypeScript, PostgreSQL, Redis va Docker Compose bilan yaratilgan.

## 🚀 Texnologiyalar

- **Backend**: NestJS + TypeScript
- **Ma'lumotlar bazasi**: PostgreSQL + TypeORM
- **Cache**: Redis
- **API Hujjatlash**: Swagger/OpenAPI
- **Konteynerizatsiya**: Docker Compose

## 📋 Xususiyatlar

### Kurslar moduli
- ✅ Kurs yaratish, o'qish, yangilash va o'chirish (CRUD)
- ✅ Kurslarni kategoriya, daraja bo'yicha filtrlash
- ✅ Redis cache bilan tez ma'lumot olish
- ✅ Kurslar statistikasi

### Talabalar moduli
- ✅ Talabalarni ro'yhatdan o'tkazish
- ✅ To'liq profil ma'lumotlari
- ✅ Email bo'yicha qidirish
- ✅ Talabalar statistikasi

### Ro'yhatga olish tizimi
- ✅ Talabalarni kurslarga yozish
- ✅ To'lov holati boshqaruvi
- ✅ Kurs sig'imi nazorati
- ✅ Ro'yhatlar statistikasi

## 🛠 O'rnatish va ishga tushirish

### 1. Loyihani klonlash
```bash
git clone <repository-url>
cd learning-center
```

### 2. Dependencies o'rnatish
```bash
npm install
```

### 3. Docker Compose bilan ishga tushirish
```bash
# Barcha servislarni ishga tushirish
docker-compose up -d

# Faqat ma'lumotlar bazasi va Redis
docker-compose up -d postgres redis
```

### 4. Development rejimida ishga tushirish
```bash
# Environment faylini sozlash
cp .env.example .env

# NestJS ilovasini ishga tushirish
npm run start:dev
```

## 📚 API Endpoints

### Asosiy
- `GET /` - Asosiy sahifa
- `GET /health` - Ilova holati

### Kurslar
- `GET /api/courses` - Barcha kurslar
- `GET /api/courses/:id` - Bitta kurs
- `POST /api/courses` - Yangi kurs yaratish
- `PATCH /api/courses/:id` - Kursni yangilash
- `DELETE /api/courses/:id` - Kursni o'chirish
- `GET /api/courses/statistics` - Kurslar statistikasi

### Talabalar
- `GET /api/students` - Barcha talabalar
- `GET /api/students/:id` - Bitta talaba
- `POST /api/students` - Yangi talaba ro'yhatdan o'tkazish
- `PATCH /api/students/:id` - Talaba ma'lumotlarini yangilash
- `DELETE /api/students/:id` - Talabani o'chirish
- `GET /api/students/search?email=example@email.com` - Email bo'yicha qidirish
- `GET /api/students/statistics` - Talabalar statistikasi

### Ro'yhatga olish
- `GET /api/enrollments` - Barcha ro'yhatlar
- `GET /api/enrollments/:id` - Bitta ro'yhat
- `POST /api/enrollments` - Talabani kursga yozish
- `PATCH /api/enrollments/:id` - Ro'yhatni yangilash
- `DELETE /api/enrollments/:id` - Ro'yhatni o'chirish
- `GET /api/enrollments/course/:courseId` - Kurs bo'yicha ro'yhatlar
- `GET /api/enrollments/student/:studentId` - Talaba bo'yicha ro'yhatlar
- `GET /api/enrollments/statistics` - Ro'yhatlar statistikasi

## 📖 API Hujjatlash

Swagger UI: http://localhost:3000/api/docs

## 🗄 Ma'lumotlar bazasi

### Environment o'zgaruvchilari
```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=learning_center
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres123
```

### Migration
```bash
# Migration yaratish
npm run migration:create src/migrations/CreateTables

# Migration ishga tushirish
npm run migration:run

# Migration qaytarish
npm run migration:revert
```

## 🚀 Redis Cache

Redis cache quyidagi ma'lumotlarni saqlaydi:
- Kurslar ro'yhati (5 daqiqa)
- Talabalar ro'yhati (5 daqiqa)
- Statistika ma'lumotlari (10 daqiqa)

## 🐳 Docker

### Servislar
- **app**: NestJS ilovasi (port: 3000)
- **postgres**: PostgreSQL (port: 5432)
- **redis**: Redis cache (port: 6379)

### Foydalanish
```bash
# Barcha servislarni ishga tushirish
docker-compose up

# Background da ishga tushirish
docker-compose up -d

# To'xtatish
docker-compose down

# Volume bilan birga o'chirish
docker-compose down -v
```

## 🧪 Testing

```bash
# Unit testlar
npm run test

# E2E testlar
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📁 Loyiha tuzilishi

```
src/
├── config/
│   └── database.config.ts      # Ma'lumotlar bazasi konfiguratsiyasi
├── modules/
│   ├── courses/                # Kurslar moduli
│   │   ├── dto/
│   │   ├── entities/
│   │   ├── courses.controller.ts
│   │   ├── courses.service.ts
│   │   └── courses.module.ts
│   └── students/               # Talabalar moduli
│       ├── dto/
│       ├── entities/
│       ├── students.controller.ts
│       ├── students.service.ts
│       └── students.module.ts
├── shared/                     # Umumiy modullar
│   ├── entities/
│   ├── dto/
│   ├── services/
│   ├── controllers/
│   └── modules/
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

## 🔧 Muhim commandlar

```bash
# Ishlab chiqish rejimi
npm run start:dev

# Production rejimi
npm run start:prod

# Build
npm run build

# Linting
npm run lint

# Format
npm run format
```

## 🎯 Keyingi qadamlar

- [ ] JWT Authentication qo'shish
- [ ] File upload (kurs rasmlari)
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced reporting
- [ ] Mobile API optimization

## 🤝 Hissa qo'shish

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. Commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request oching

## 📝 Litsenziya

MIT License - [LICENSE](LICENSE) faylini ko'ring.

## 🆘 Yordam

Muammo yoki savol bo'lsa, [Issues](issues) bo'limida savol bering.

---

**Learning Center API** - O'zbek tilida yaratilgan zamonaviy o'quv markaz platformasi! 🎓
