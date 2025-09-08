-- Learning Center ma'lumotlar bazasi yaratish
CREATE DATABASE learning_center;

-- Foydalanuvchi huquqlarini berish
GRANT ALL PRIVILEGES ON DATABASE learning_center TO postgres;

-- UUID kengaytmasini yoqish
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Database'ga ulanish
\c learning_center;

-- Kurslar jadvalini yaratish
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    instructor VARCHAR(100) NOT NULL,
    duration INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    level VARCHAR(20) DEFAULT 'Boshlangich' CHECK (level IN ('Boshlangich', 'Orta', 'Yuqori')),
    is_active BOOLEAN DEFAULT true,
    max_students INTEGER DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Talabalar jadvalini yaratish
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    birth_date DATE,
    address TEXT,
    gender VARCHAR(10) CHECK (gender IN ('Erkak', 'Ayol')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ro'yhatga olish jadvalini yaratish
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Faol' CHECK (status IN ('Faol', 'Tugatgan', 'Tark etgan', 'Taalga olingan')),
    payment_status VARCHAR(20) DEFAULT 'Tolanmagan' CHECK (payment_status IN ('Tolangan', 'Qisman', 'Tolanmagan')),
    paid_amount DECIMAL(10, 2) DEFAULT 0,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(course_id, student_id)
);

-- Indekslar yaratish
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(is_active);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_active ON students(is_active);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);

-- Trigger funksiyasi (updated_at ni avtomatik yangilash uchun)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggerlar yaratish
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_enrollments_last_activity BEFORE UPDATE ON enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Namunaviy ma'lumotlar qo'shish
INSERT INTO courses (title, description, instructor, duration, price, category, level, max_students) VALUES
('JavaScript Asoslari', 'JavaScript dasturlash tilining asoslarini organish', 'Ali Valiyev', 40, 500000, 'Dasturlash', 'Boshlangich', 25),
('React.js Kursi', 'React.js framework bilan web-ilovalar yaratish', 'Zarina Karimova', 60, 750000, 'Frontend', 'Orta', 20),
('Node.js Backend', 'Node.js bilan backend development', 'Bobur Toshev', 80, 900000, 'Backend', 'Orta', 18),
('Python Asoslari', 'Python dasturlash tili asoslari', 'Nilufar Rakhimova', 50, 600000, 'Dasturlash', 'Boshlangich', 30),
('SQL Ma\'lumotlar bazasi', 'SQL va ma\'lumotlar bazasi boshqaruvi', 'Sherzod Umarov', 35, 400000, 'Ma\'lumotlar bazasi', 'Boshlangich', 22);

INSERT INTO students (first_name, last_name, email, phone, gender) VALUES
('Dilshod', 'Karimov', 'dilshod@example.com', '+998901234567', 'Erkak'),
('Malika', 'Tosheva', 'malika@example.com', '+998907654321', 'Ayol'),
('Jasur', 'Rakhimov', 'jasur@example.com', '+998909876543', 'Erkak'),
('Nozima', 'Umarova', 'nozima@example.com', '+998903456789', 'Ayol'),
('Bekzod', 'Yusupov', 'bekzod@example.com', '+998905432167', 'Erkak');

COMMIT;
