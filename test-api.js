const axios = require('axios');

async function testAPI() {
    const baseURL = 'http://localhost:3003/api';

    try {
        console.log('🔍 Learning Center API ni test qilish...\n');

        // Health check
        console.log('1. Health check...');
        const health = await axios.get(`${baseURL}/health`);
        console.log('✅ Health check:', health.data);

        // Courses ro'yxati
        console.log('\n2. Kurslar ro\'yxati...');
        const courses = await axios.get(`${baseURL}/courses`);
        console.log('✅ Kurslar:', courses.data);

        // Students ro'yxati
        console.log('\n3. Talabalar ro\'yxati...');
        const students = await axios.get(`${baseURL}/students`);
        console.log('✅ Talabalar:', students.data);

        // Yangi kurs yaratish
        console.log('\n4. Yangi kurs yaratish...');
        const courseData = {
            title: 'JavaScript Asoslari',
            description: 'Web dasturlash uchun JavaScript tilini o\'rganish',
            level: 'BEGINNER',
            duration: 40,
            price: 299000
        };

        const newCourse = await axios.post(`${baseURL}/courses`, courseData);
        console.log('✅ Yangi kurs yaratildi:', newCourse.data);

        // Yangi talaba qo'shish
        console.log('\n5. Yangi talaba qo\'shish...');
        const studentData = {
            firstName: 'Abdulla',
            lastName: 'Karimov',
            email: 'abdulla@gmail.com',
            phone: '+998901234567',
            gender: 'MALE',
            birthDate: '1995-05-15'
        };

        const newStudent = await axios.post(`${baseURL}/students`, studentData);
        console.log('✅ Yangi talaba qo\'shildi:', newStudent.data);

        // Statistika olish (Redis cache test)
        console.log('\n6. Statistika olish (Redis cache test)...');
        const courseStats = await axios.get(`${baseURL}/courses/statistics`);
        console.log('✅ Kurslar statistikasi:', courseStats.data);

        const studentStats = await axios.get(`${baseURL}/students/statistics`);
        console.log('✅ Talabalar statistikasi:', studentStats.data);

        console.log('\n🎉 Barcha testlar muvaffaqiyatli o\'tdi!');
        console.log('📚 Swagger docs: http://localhost:3003/api/docs');

    } catch (error) {
        console.error('❌ Xatolik:', error.response?.data || error.message);

        if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 API ishlamayapti. Quyidagi komandani bajaring:');
            console.log('cd "/home/abdujabbor/Desktop/Docker Compose + Redis"');
            console.log('PORT=3003 npm run start:dev');
        }
    }
}

// Redis cache test
async function testRedisCache() {
    console.log('\n🔄 Redis cache tezligini test qilish...');

    try {
        const start1 = Date.now();
        await axios.get('http://localhost:3003/api/courses/statistics');
        const time1 = Date.now() - start1;

        const start2 = Date.now();
        await axios.get('http://localhost:3003/api/courses/statistics');
        const time2 = Date.now() - start2;

        console.log(`⏱️  Birinchi so'rov (DB): ${time1}ms`);
        console.log(`⚡ Ikkinchi so'rov (Cache): ${time2}ms`);
        console.log(`🚀 Cache ${Math.round(time1 / time2)}x tezroq!`);

    } catch (error) {
        console.error('❌ Cache test xatolik:', error.message);
    }
}

// Main function
async function main() {
    await testAPI();
    await testRedisCache();
}

main();
