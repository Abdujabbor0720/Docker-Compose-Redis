# Node.js rasmidan foydalanish
FROM node:18-alpine

# Ish katalogini belgilash
WORKDIR /usr/src/app

# Package fayllarini nusxalash
COPY package*.json ./

# Dependencies o'rnatish
RUN npm ci --only=production

# Ilova kodini nusxalash
COPY . .

# TypeScript kompilyatsiya qilish
RUN npm run build

# Port ochish
EXPOSE 3000

# Ilovani ishga tushirish
CMD ["npm", "run", "start:prod"]
